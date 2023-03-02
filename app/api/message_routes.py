from flask import Blueprint, request
from app.models import db, Comment, Post, User
from flask_login import login_required, login_user, current_user
from app.forms import CommentForm
from datetime import datetime

message_routes = Blueprint('messages', __name__)


@message_routes.route('/message')
@login_required
def get_posts():
    pass