from flask import Blueprint, request
from app.models import Comment, Post, User
from flask_login import login_required, login_user, current_user
from app.forms import comment_form
from datetime import datetime

comment_routes = Blueprint('comments', __name__)

# @comment_routes.route('/')
# @login_required
# def get_comments(post_id, user_id):
#     '''
#     Query's for all comments of a post by post id.
#     '''
#     postById = Post.query.get(post_id)
#     userById = User.query.get(user_id)
    
#     if current_user and postById == userById :
#         all_comments = Comment.query.all()