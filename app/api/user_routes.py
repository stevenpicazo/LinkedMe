from flask import Blueprint, jsonify, request
from flask_login import login_required, login_user, current_user
from app.models import User, db
from app.forms import SignUpForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_profile(id):
    """
    Query for a user by id and edits user info.
    """
    user = User.query.get(id)
    if not user:
        return {'errors': 'Page not found'}
    
    if user.id != current_user.id:
        return {'errors': 'Unauthorized.'}, 401
    
    form = SignUpForm(obj=user)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(user)
        db.session.commit()
        return user.to_dict()
    
    return {'errors': form.errors}, 401


@user_routes.route('/<int:id>/follow', methods=['POST'])
@login_required
def follow(id):
    """
    Follow and unfollow a user by id
    """
    
    user = User.query.get(current_user.get_id())
    targetUser = User.query.get(id)
    if user == targetUser:
        return {'error': ["You can't follow yourself!"]}, 404
    if not targetUser:
        return {'error': ['User Not Found']}, 404

    if not user.is_following(targetUser):
        user.follow(targetUser)
    else:
        user.unfollow(targetUser)
    db.session.commit()
    return user.to_dict()
    


# @user_routes.route('/<int:id>/follow', methods=['POST'])
# @login_required
# def follow(id):
#     """
#     Follow a user by id
#     """
#     user_to_follow = User.query.get(id)
#     if not user_to_follow:
#         return {'errors': 'User not found'}, 404

#     if current_user.id == user_to_follow.id:
#         return {'errors': 'You cannot follow yourself'}, 400

#     current_user.follow(user_to_follow)
#     db.session.commit()
#     return jsonify(current_user.to_dict())

# @user_routes.route('/<int:id>/unfollow', methods=['DELETE'])
# @login_required
# def unfollow(id):
#     """
#     Unfollow a user by id
#     """
#     user_to_unfollow = User.query.get(id)
#     if not user_to_unfollow:
#         return {'errors': 'User not found'}, 404

#     if current_user.id == user_to_unfollow.id:
#         return {'errors': 'You cannot unfollow yourself'}, 400

#     current_user.unfollow(user_to_unfollow)
#     db.session.commit()
#     return jsonify(current_user.to_dict())