from flask import Blueprint, jsonify
from app.models import db, User
from flask_login import login_required, login_user, current_user

connection_routes = Blueprint('connections', __name__)

@connection_routes.route('/<int:user_id>')
@login_required
def user_connections(user_id):
    user = User.query.get(user_id)
    followers = user.get_followers()
    following = user.get_following()
    return jsonify({
        'followers': [follower.to_dict() for follower in followers],
        'following': [followed.to_dict() for followed in following],
    })

@connection_routes.route('/<int:user_id>', methods=['POST'])
@login_required
def get_connection(user_id):
    '''
    Query's for user and connects with user
    '''

    user = User.query.get(user_id)
    
    if not user:
        return {'errors': 'User not found.'}, 404
    
    if user.id == current_user.id:
        return {'errors': 'Unable to add yourself as a connection'}, 404

    current_user.follow(user)
    db.session.commit()
    return {'message': 'Connected with user successfully!'}


@connection_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def remove_connection(id):
    '''
    Query for connection by id and
    removes that connection
    '''

    user = User.query.get(id)
    
    if not user:
        return {'errors': 'User not found.'}, 404
    
    current_user.unfollow(user)
    db.session.commit()
    return {'message': 'No longer connected with user.'}

    