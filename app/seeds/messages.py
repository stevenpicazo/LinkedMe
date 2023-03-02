# from app.models import db, Message, environment, SCHEMA
# from datetime import datetime

# def seed_messages():

#     messages = [
#         Message(content="Hogwarts has called upon you.", user_id=3),
#     ]

#     db.session.add_all(messages)
#     db.session.commit()
    
# def undo_messages():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute("DELETE FROM messages")
        
#     db.session.commit()