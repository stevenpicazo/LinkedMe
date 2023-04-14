from app.models import db, Comment, environment, SCHEMA
from datetime import datetime

def seed_comments():

    comments = [
        Comment(comment="Teach me magic. I am not a muggle, I promise.", user_id=2, post_id=5),
        Comment(comment="Congrats!!", user_id=3, post_id=4),
        Comment(comment="Impressive. but are you an organ donor?", user_id=2, post_id=4),
    ]
    
    for comment in comments:
        existing_comment = Comment.query.filter_by(
            comment=comment.comment, user_id=comment.user_id, post_id=comment.post_id).first()
        if existing_comment:
            db.session.delete(existing_comment)
        elif comment not in comments:  
            comments.append(comment)

    db.session.add_all(comments)
    db.session.commit()
    
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")
        
    db.session.commit()