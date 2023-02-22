from flask import Blueprint, request
from app.models import Post
from flask_login import login_required, login_user, current_user
from app.forms import post_form
from datetime import datetime

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def get_posts():
    '''
    Query for all posts and return in a list of dictionaries
    '''
    
    all_posts = Post.query()