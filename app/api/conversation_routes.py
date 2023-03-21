from flask import Blueprint, request
from app.models import db, Conversation, User, Message
from flask_login import login_required, login_user, current_user
from app.forms import ConversationForm
from datetime import datetime

conversation_routes = Blueprint('conversations', __name__)

@conversation_routes.route('/')
@login_required
def get_convos():
    '''
    Gets all conversations of the current user
    '''
    all_conversations = current_user.conversations
    convos = [convos.to_dict() for convos in all_conversations]
    return convos, 200

@conversation_routes.route('/<int:conversation_id>')
@login_required
def get_messages(conversation_id):
    '''
    Gets conversations by id
    '''
    conversation = Conversation.query.get(conversation_id)
    if not conversation or current_user not in conversation.users:
        return {"error": "Conversation not found"}, 404
    return conversation.to_dict()

@conversation_routes.route('/', methods=['POST'])
@login_required
def create_conversation():
    '''
    Handles the creation of a new conversation between users. 
    It validates the submitted data, checks if the specified users
    exist, creates a conversation including the current user and other users, 
    and saves it in the database.
    '''
    form = ConversationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user_ids = form.data['user_ids']
        users = User.query.filter(User.id.in_(user_ids)).all()
        if len(users) != len(user_ids):
            return {"error": "One or more users not found"}, 404

        conversation = Conversation(users=[current_user] + users)
        db.session.add(conversation)
        db.session.commit()
        return conversation.to_dict(), 201

    return {'errors': form.errors}, 401

@conversation_routes.route('/<int:conversation_id>', methods=['DELETE'])
@login_required
def delete_conversation(conversation_id):
    '''
    Deletes conversations by id
    '''
    conversation = Conversation.query.get(conversation_id)
    if not conversation or current_user not in conversation.users:
        return {"error": "Conversation not found"}, 404

    db.session.delete(conversation)
    db.session.commit()
    return {"message": "Conversation deleted"}, 200