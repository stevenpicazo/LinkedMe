from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text(), nullable=False)
    image = db.Column(db.String(), nullable=True)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    conversation_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('conversations.id')),nullable=False)
    
    ##! Relationships
    user = db.relationship("User", back_populates="messages")
    conversation = db.relationship("Conversation", back_populates="messages")

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'image': self.image,
            'timestamp': self.timestamp,
            'user': self.user.to_dict(),
            'coversation': self.conversation.to_dict(),
            'sender_id': self.sender_id,
            'conversation_id': self.conversation.to_dict()
        }
        