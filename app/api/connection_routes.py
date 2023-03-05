from flask import Blueprint, jsonify
from app.models import db, User
from flask_login import login_required, login_user, current_user

connection_routes = Blueprint('connections', __name__)

@connection_routes.route('/<int:user_id>', methods=['POST'])
@login_required
def get_connection(user_id):
    """
    Query's for users by id and connects or disconnects 
    the currently logged in user with another user.
    """
    current_user_id = current_user.get_id()
    if not current_user_id:
        return {'errors': 'Unauthorized'}, 401
    user = User.query.get(user_id)
    if not user:
        return {'errors': 'User not found.'}, 404
    if user_id == current_user_id:
        return {'errors': 'Unable to add yourself as a connection'}, 404
    if current_user.is_following(user):
        current_user.unfollow(user)
    else:
        current_user.follow(user)
    db.session.commit()
    return user.to_dict()
