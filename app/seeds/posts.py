from app.models import db, Post, User, environment, SCHEMA
from datetime import datetime

def seed_posts():
        
    posts = [
        Post(post="test postttttt 1", user_id=1, 
             image="https://imageio.forbes.com/blogs-images/danidiplacido/files/2016/06/Game-of-Thrones-Battle-of-the-Bastards-Wildlings.jpg?format=jpg&width=960", 
            ),
        Post(post="TESTING POST 2!!!!", user_id=2),
    ]

    db.session.add_all(posts)
    db.session.commit()
    
    
def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")
        
    db.session.commit()