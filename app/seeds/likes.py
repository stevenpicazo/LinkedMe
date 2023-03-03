from app.models import db, Like, environment, SCHEMA
from datetime import datetime

def seed_likes():

    likes = [
        Like(user_id=1, post_id=2),
        Like(user_id=1, post_id=3,),
        Like(user_id=1, post_id=4),

        Like(user_id=2, post_id=1),
        Like(user_id=2, post_id=3,),
        Like(user_id=2, post_id=4),
        
        Like(user_id=3, post_id=1),
        Like(user_id=3, post_id=2,),
        Like(user_id=3, post_id=4),
        
        Like(user_id=4, post_id=1),
        Like(user_id=4, post_id=2,),
        Like(user_id=4, post_id=3),
    ]

    db.session.add_all(likes)
    db.session.commit()
    
def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM likes")
        
    db.session.commit()