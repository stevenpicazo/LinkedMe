from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='kingjames', email='lebron@aa.io', password='password', first_name='Lebron', last_name='James', background_picture='https://pbs.twimg.com/profile_banners/23083404/1529843462/1500x500',
        education='St. Vincent-St. Mary High School', education_picture='https://upload.wikimedia.org/wikipedia/en/thumb/b/be/St._Vincent-St._Mary_High_School_logo.png/220px-St._Vincent-St._Mary_High_School_logo.png',
        education_date='Sep 1999 - May 2003', location = 'Los Angeles, California, United States', 
        about='I am a professional basketball player, four-time NBA champion, four-time NBA Finals MVP, and two-time Olympic gold medalist. I am committed to using my platform to make a difference in the world and empower the next generation of leaders.',
        occupation='Consulting & Validation Associate', profile_picture='https://cdn.vox-cdn.com/thumbor/jZ8sKeNf5uGO3nN2nzrnNr5yNQQ=/0x40:960x680/1200x800/filters:focal(0x40:960x680)/cdn.vox-cdn.com/uploads/chorus_image/image/10416343/lebronnn.0.jpg')
    dwight = User(
        username='Dwight', email='dwight@aa.io', password='password', first_name='Dwight', last_name='Schrute', background_picture='https://c4.wallpaperflare.com/wallpaper/558/404/29/dwight-schrute-the-office-quote-typography-wallpaper-preview.jpg',
        education='Penn State', education_date='Sep 1988 - May 1992', location = 'Scranton, Pennsylvania, United States',
        education_picture='https://m.media-amazon.com/images/I/51B3GNEDEoL.jpg',
        about="I am a beet farmer, owner of Schrute Farms, and assistant to the regional manager at Dunder Mifflin Scranton. I have a passion for martial arts and survivalism, and I'm known for my intense work ethic and love for beets.",
        occupation='Assistant to the Regional Manager, Dunder Mifflin Scranton', profile_picture= 'https://www.cheatsheet.com/wp-content/uploads/2020/08/Rainn-Wilson.jpg')
    hermione = User(
        username='hermione', email='hermione@aa.io', password='password', first_name='Hermione', last_name='Granger', background_picture='https://s32508.pcdn.co/wp-content/uploads/2020/05/portrait-wall.jpg',
        education='Hogwarts', education_date='Sep 1991 - May 1997', location='London, United Kingdom',
        education_picture='https://blog.logomyway.com/wp-content/uploads/2021/09/hogwarts-logo-transparent.jpg',
        about="I am Hermione Granger, a proud Gryffindor and the brightest witch of my age. With a passion for learning and a love for magic, I am always seeking new knowledge and pushing myself to new limits. As a former member of Dumbledore's Army and now Minister for Magic, I strive to create a better world for all. Join me in the fight against injustice and inequality.",
        occupation='Minister for Magic, Ministry of Magic', profile_picture='https://wallpaper.dog/large/984217.jpg')
    moseby = User(
        username='mosby', email='mosby@aa.io', password='password', first_name='Moseby', last_name='Moseby', background_picture='https://pbs.twimg.com/media/DXyNXsKVMAA2Flp.jpg',
        education='University of Hotelery Studies', education_date='Aug 1990 - May 1994', location = 'Boston, Massachusetts, United States',
        education_picture='https://scontent-lax3-1.xx.fbcdn.net/v/t39.30808-6/292185194_536997981298940_1349256381808204061_n.png?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=r4gbVPW3BoIAX89mGbN&_nc_ht=scontent-lax3-1.xx&oh=00_AfABLUddvd8f1cw9AgXFnoSl50560RuoKVvfs0jea38jPA&oe=64058736',
        about="Hello, I'm Marion Moseby, cruise director/manager. Ensuring luxury and enjoyment on S.S. Tipton. Years of hospitality experience and passion for customer service. Committed to excellence. Enjoys family time and chess.",
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