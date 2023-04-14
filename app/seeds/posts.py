from app.models import db, Post, User, environment, SCHEMA
from datetime import datetime

def seed_posts():
        
    posts = [
        Post(post="I am Iron Man.", user_id=1),
        Post(post="I am Assistant Regional Manager, not Assistant TO the Regional Manager", image='https://i.etsystatic.com/11012691/r/il/2196f0/1651575248/il_570xN.1651575248_6yy4.jpg', user_id=2),
        Post(post="Identity theft is a crime Jim.", image='http://cdn.shopify.com/s/files/1/0279/1610/7811/products/image_c5e0e461-15de-4394-b767-fc0adf65cb4b_1200x1200.png?v=1593213959', user_id=2),
        Post(post="Excited to announce I am the new Minister of Magic.", image='https://media4.giphy.com/media/3o7abIileRivlGr8Nq/giphy.gif?cid=6c09b952e9f2822227476dfbcd80d39162084266bf091c5e&rid=giphy.gif&ct=g', user_id=3),
        Post(post="Mr. Tipton expects excellence, and so do I.", user_id=4),
        Post(post="Developed human kinds first ever time machine using quantum physics.", image='https://i.pinimg.com/originals/ab/90/ab/ab90abcd440f5b696f173c708123150d.jpg', user_id=1),
    ]

    db.session.add_all(posts)
    db.session.commit()
    
    
def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")
        
    db.session.commit()