from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='kingjames', email='lebron@aa.io', password='password', first_name='Lebron', last_name='Jame', 
        occupation='Consulting & Validation Associate', profile_picture='https://cdn.vox-cdn.com/thumbor/jZ8sKeNf5uGO3nN2nzrnNr5yNQQ=/0x40:960x680/1200x800/filters:focal(0x40:960x680)/cdn.vox-cdn.com/uploads/chorus_image/image/10416343/lebronnn.0.jpg')
    dwight = User(
        username='Dwight', email='dwight@aa.io', password='password', first_name='Dwight', last_name='Schrute', 
        occupation='Assistant to the Regional Manager, Dunder Mifflin Scranton', profile_picture= 'https://www.cheatsheet.com/wp-content/uploads/2020/08/Rainn-Wilson.jpg')

    hermione = User(
        username='hermione', email='hermione@aa.io', password='password', first_name='Hermione', last_name='Granger', 
        occupation='Minister for Magic, Ministry of Magic', profile_picture='https://wallpaper.dog/large/984217.jpg')
    moseby = User(
        username='mosby', email='mosby@aa.io', password='password', first_name='Moseby', last_name='Moseby', 
        occupation="S.S.Tipton's Cruise Director/Manager", profile_picture='https://static0.thethingsimages.com/wordpress/wp-content/uploads/2021/08/Mr-Moseby-Suite-Life.jpg')


    db.session.add(demo)
    db.session.add(dwight)
    db.session.add(hermione)
    db.session.add(moseby)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()