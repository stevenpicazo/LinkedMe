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
    all_users = [user.to_dict() for user in users]
    return all_users


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
