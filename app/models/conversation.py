from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Conversation(db.Model):
    __tablename__ = 'conversations'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    
    ##! Relationships
    users = db.relationship('User', back_populates='conversations')
    messages = db.relationship('Message', back_populates='conversation')

    def to_dict(self):
        return {
            'id': self.id,
            'timestamp': self.timestamp,
            'user_id': self.user_id,
            'user': self.user.to_dict(exclude=['password']),
            'messages': [message.to_dict() for message in self.messages],
        }