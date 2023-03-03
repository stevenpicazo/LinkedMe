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

    for like in likes:
        existing_like = Like.query.filter_by(
            user_id=like.user_id, post_id=like.post_id).first()
        if existing_like:
            db.session.delete(existing_like)

    db.session.add_all(likes)
    db.session.commit()
    
def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM likes")
        
    db.session.commit()