from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .user import user_convos

class Conversation(db.Model):
    __tablename__ = 'conversations'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        

    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    
    ##! Relationships
    messages = db.relationship('Message', back_populates='conversation')
    users = db.relationship('User', secondary=user_convos, back_populates='conversations', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'timestamp': self.timestamp,
            'user_id': self.user_id,
            'user': self.user.to_dict(exclude=['password']),
            'messages': [message.to_dict() for message in self.messages],
        }