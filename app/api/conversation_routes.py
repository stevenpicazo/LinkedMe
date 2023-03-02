from flask import Blueprint, request
from app.models import db, Conversation
from flask_login import login_required, login_user, current_user
from app.forms import CommentForm
from datetime import datetime

conversation_routes = Blueprint('conversations', __name__)

##! GET ALL CONVERSATIONS

@conversation_routes.route('/<int:id>')
@login_required
def get_comments(post_id):
    '''
    Query's for all conversations related to that user.
    '''
    
    all_convos = Conversation.query.all()
    conversations = [convo.to_dict() for convo in all_convos]
    
    return conversations, 200