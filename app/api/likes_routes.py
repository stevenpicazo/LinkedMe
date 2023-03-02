from flask import Blueprint, request
from app.models import db, Like, Post, User
from flask_login import login_required, login_user, current_user
from app.forms import CommentForm
from datetime import datetime

comment_routes = Blueprint('comments', __name__)


##! GET ALL COMMENTS BY POST ID
@comment_routes.route('/<int:post_id>')
@login_required
def get_comments(post_id):
    '''
    Query's for all comments of a post by post id.
    '''
    all_comments = Post.query.get(post_id).comments
    comments = [comment.to_dict() for comment in all_comments]
    
    return comments, 200
