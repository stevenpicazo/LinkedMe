from flask import Blueprint, request, jsonify
from app.models import db, Like, Post, User
from flask_login import login_required, login_user, current_user
from app.forms import CommentForm
from datetime import datetime

like_routes = Blueprint('likes', __name__)


##! GET ALL LIKES BY POST ID
@like_routes.route('/<int:post_id>')
@login_required
def get_likes(post_id):
    '''
    Query's for all likes of a post by post id.
    '''
    post = Post.query.get(post_id)
    
    likes = [like.to_dict() for like in post.likes]
    
    return likes, 200


##! LIKE A POST (CREATE)
@like_routes.route('/<int:post_id>', methods= ['POST'])
@login_required
def like_post(post_id):
    '''
    Query's for post by post id and allow users 
    to like a post.
    '''

    post = Post.query.get(post_id)
    if not post:
        return {'errors': ["Post not found"]}, 404

    like = Like(
        post=post,
        user_id=current_user.id
    )

    db.session.add(like)
    db.session.commit()
    
    return jsonify({'message': 'Post liked successfully'}), 200



@like_routes.route('/<int:like_id>', methods=['DELETE'])
@login_required
def unlike_post(like_id):
    like = Like.query.get(like_id)
    if not like:
        return {'errors': ["Like not found"]}, 404
    
    if like.user_id != current_user.id:
        return {"errors": ["You are not authorized to edit this like."]}, 403

    if like.user_id == current_user.id:
        db.session.delete(like)
        db.session.commit()
        return {'message':' Like deleted successfully'}, 200
