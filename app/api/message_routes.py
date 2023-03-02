from flask import Blueprint, request
from app.models import db, Message, User
from flask_login import login_required, login_user, current_user
from app.forms import PostForm
from datetime import datetime

message_routes = Blueprint('messages', __name__)

##! GET ALL MESSAGES
@message_routes.route('/')
@login_required
def get_posts():
    '''
    Query's for all Messages of the logged in user.
    '''

