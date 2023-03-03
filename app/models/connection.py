# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from datetime import datetime

# class Connection(db.Model):
#     __tablename__ = 'connections'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}
        
#     id = db.Column(db.Integer, primary_key=True)
#     connection_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("user.id")), nullable=False)
#     connection_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("user.id")), nullable=False)
    
    
#     def to_dict(self):
#         return {
#             'id': self.id,
#             'connection_id': self.user_id,
#             'connection_id': self.connection_id
#     }