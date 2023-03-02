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



@like_routes.route('/<int:post_id>', methods=['DELETE'])
@login_required
def unlike_post(post_id):
    post = Post.query.get(post_id)
    if not post:
        return jsonify({'errors': ["Post not found"]}), 404

    like = Like.query.filter_by(post_id=post_id, user_id=current_user.id).first()
    if not like:
        return jsonify({'errors': ["Like not found"]}), 404

    db.session.delete(like)
    db.session.commit()

    return jsonify({'message': 'Post unliked successfully'}), 200