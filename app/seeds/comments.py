from app.models import db, Comment, environment, SCHEMA
from datetime import datetime

def seed_comments():

    comments = [
        Comment(comment="This is a comment on post 1 by user 1", user_id=1, post_id=2),
        Comment(comment="Another comment on post 1 by user 1", user_id=2, post_id=1),
    ]

    db.session.add_all(comments)
    db.session.commit()
    
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")
        
    db.session.commit()