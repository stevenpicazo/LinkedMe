from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='ironman', email='tony@aa.io', password='password', first_name='Tony', last_name='Stark', 
        background_picture='https://www.urdesignmag.com/wp-content/uploads/2022/01/AdobeStock_471604511-2.jpg',
        education="Massachusetts Institute of Technology", 
        education_picture='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/1200px-MIT_logo.svg.png',
        education_date='Sep 1988 - May 1992', 
        location = 'New York, New York, United States', 
        about="As the CEO and founder of Stark Industries, I've always been driven to push the boundaries of technology and innovation. From the Iron Man suit to advanced weaponry and beyond, my team and I have made it our mission to ensure that people all over the world are safe and secure. But it's not all about business for me - I'm also a passionate philanthropist. After a life-changing event, I decided to dedicate my wealth and resources to making the world a better place. The Stark Relief Foundation was born, and it's been a source of pride and fulfillment for me ever since. As a member of The Avengers, I've been able to take my skills to a whole new level. With Iron Man by my side, I've been able to protect our planet from all kinds of threats and keep innocent people out of harm's way.",
        occupation='Founder of Stark Industries', 
        profile_picture='https://www.google.com/search?sca_esv=573847129&sxsrf=AM9HkKl94xbWCFeSZuwu46lUH8JIeoGplA:1697488656058&q=tony+stark&tbm=isch&source=lnms&sa=X&sqi=2&ved=2ahUKEwjZ6eqCtvuBAxUoKkQIHc3KCUQQ0pQJegQIDRAB&biw=1707&bih=1166&dpr=1.1#imgrc=aiaPaIm1jHThjM')
    dwight = User(
        username='Dwight', email='dwight@aa.io', password='password', first_name='Dwight', last_name='Schrute', 
        background_picture='https://img.nbc.com/sites/nbcunbc/files/scet/photos/22/8831/1195_mose.jpg',
        education='Penn State', 
        education_date='Sep 1988 - May 1992', 
        location = 'Scranton, Pennsylvania, United States',
        education_picture='https://m.media-amazon.com/images/I/51B3GNEDEoL.jpg',
        about="I am a beet farmer, owner of Schrute Farms, and assistant to the regional manager at Dunder Mifflin Scranton. I have a passion for martial arts and survivalism, and I'm known for my intense work ethic and love for beets.",
        occupation='Assistant to the Regional Manager, Dunder Mifflin Scranton', 
        profile_picture= 'https://www.cheatsheet.com/wp-content/uploads/2020/08/Rainn-Wilson.jpg')
    hermione = User(
        username='hermione', email='hermione@aa.io', password='password', first_name='Hermione', last_name='Granger', 
        background_picture='https://s32508.pcdn.co/wp-content/uploads/2020/05/portrait-wall.jpg',
        education='Hogwarts', 
        education_date='Sep 1991 - May 1997', 
        location='London, United Kingdom',
        education_picture='https://blog.logomyway.com/wp-content/uploads/2021/09/hogwarts-logo-transparent.jpg',
        about="I am Hermione Granger, a proud Gryffindor and the brightest witch of my age. With a passion for learning and a love for magic, I am always seeking new knowledge and pushing myself to new limits. As a former member of Dumbledore's Army and now Minister for Magic, I strive to create a better world for all. Join me in the fight against injustice and inequality.",
        occupation='Minister for Magic, Ministry of Magic', 
        profile_picture='https://wallpaper.dog/large/984217.jpg')
    moseby = User(
        username='mosby', email='mosby@aa.io', password='password', first_name='Marion', last_name='Moseby', 
        background_picture='https://pbs.twimg.com/media/DXyNXsKVMAA2Flp.jpg',
        education='University of Hotelery Studies', 
        education_date='Aug 1990 - May 1994', 
        location = 'Boston, Massachusetts, United States',
        education_picture='https://scontent-lax3-1.xx.fbcdn.net/v/t39.30808-6/292185194_536997981298940_1349256381808204061_n.png?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=r4gbVPW3BoIAX89mGbN&_nc_ht=scontent-lax3-1.xx&oh=00_AfABLUddvd8f1cw9AgXFnoSl50560RuoKVvfs0jea38jPA&oe=64058736',
        about="Hello, I'm Marion Moseby, cruise director/manager. Ensuring luxury and enjoyment on S.S. Tipton. Years of hospitality experience and passion for customer service. Committed to excellence. Enjoys family time and chess.",
        occupation="S.S.Tipton's Cruise Director/Manager", 
        profile_picture='https://static0.thethingsimages.com/wordpress/wp-content/uploads/2021/08/Mr-Moseby-Suite-Life.jpg')
    michael = User(
        username='michael_scott', email='michael@dundermifflin.com', password='password', first_name='Michael', last_name='Scott',
        background_picture='https://virtual-bg.com/wp-content/uploads/2020/06/the-office-2-background-for-teams-or-zoom.jpg',
        education='Scranton University',
        education_picture='https://media.licdn.com/dms/image/C4D0BAQFUA7rh2OKPZA/company-logo_200_200/0/1583999449853?e=2147483647&v=beta&t=lXWMaw91PxVhor787Bl-PddKGMuFRlEvmVjKfZSE_WM',
        education_date='Sep 1984 - May 1988',
        location='Scranton, Pennsylvania, United States',
        about="I am Michael Scott, the World's Best Boss and Regional Manager of Dunder Mifflin Scranton. I pride myself on my people skills and my ability to make the workplace fun. I'm also the founder of the Michael Scott Paper Company and a talented improv performer.",
        occupation='Regional Manager, Dunder Mifflin Scranton',
        profile_picture='https://i.pinimg.com/736x/1b/34/39/1b3439272614867efae272ed60b08697.jpg')
    jim = User(
        username='jim_halpert', email='jim@dundermifflin.com', password='password', first_name='Jim', last_name='Halpert',
        background_picture='https://preview.redd.it/wljuxo8duh391.png?auto=webp&s=a25f5f3ad4fd93f81f91815dd2a6721a7f89ccf1',
        education='Penn State',
        education_picture='https://brand.psu.edu/images/backgrounds/athletic-positive.png',
        education_date='Sep 2001 - May 2005',
        location='Scranton, Pennsylvania, United States',
        about="I'm Jim Halpert, a salesman and former Assistant Regional Manager at Dunder Mifflin Scranton. I'm known for my love of pranks, especially on my deskmate, Dwight. I'm married to the love of my life, Pam, and together we have two children.",
        occupation='Salesman, Dunder Mifflin Scranton',
        profile_picture='https://roost.nbcuni.com/bin/viewasset.html/content/dam/Peacock/Landing-Pages/2-0-design/the-office/cast-the-office-jim-halpert.jpg/_jcr_content/renditions/original.JPEG')
    pam = User(
        username='pam_beesly', email='pam@dundermifflin.com', password='password', first_name='Pam', last_name='Beesly',
        background_picture='https://wallpaperaccess.com/full/218437.jpg',
        education='Marywood University',
        education_picture='https://upload.wikimedia.org/wikipedia/en/4/40/Marywood_University_seal.png',
        education_date='Sep 2000 - May 2004',
        location='Scranton, Pennsylvania, United States',
        about="I am Pam Beesly, a former receptionist and now Office Administrator at Dunder Mifflin Scranton. I'm a wife, a mother, and an artist. I love to paint and I'm passionate about graphic design. I'm married to Jim Halpert, and together we have two children.",
        occupation='Office Administrator, Dunder Mifflin Scranton',
        profile_picture='https://i2-prod.mirror.co.uk/incoming/article26891414.ece/ALTERNATES/n615/2_The-Office.jpg')
    kelly = User(
        username='kelly_kapoor', email='kelly@dundermifflin.com', password='password', first_name='Kelly', last_name='Kapoor',
        background_picture='https://wallpaperaccess.com/full/432596.jpg',
        education='',
        education_picture='',
        education_date='',
        location='Scranton, Pennsylvania, United States',
        about="Hi, I'm Kelly Kapoor, the Customer Service Representative at Dunder Mifflin Scranton. I'm known for my love of pop culture, fashion, and drama. I enjoy chatting with my coworkers and staying up-to-date with the latest gossip.",
        occupation='Customer Service Representative, Dunder Mifflin Scranton',
        profile_picture='https://roost.nbcuni.com/bin/viewasset.html/content/dam/Peacock/Landing-Pages/2-0-design/the-office/cast-the-office-kelly-kapoor.jpg/_jcr_content/renditions/original.JPEG')
    ryan = User(
        username='ryan_howard', email='ryan@dundermifflin.com', password='password', first_name='Ryan', last_name='Howard',
        background_picture='https://wallpapercave.com/wp/wp1821728.jpg',
        education='Scranton University',
        education_picture='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/University_of_Scranton_seal.svg/1200px-University_of_Scranton_seal.svg.png',
        education_date='Sep 2000 - May 2004',
        location='Scranton, Pennsylvania, United States',
        about="I'm Ryan Howard, a former temp, salesman, and Vice President of Regional Sales at Dunder Mifflin. I have a background in business and have developed a number of entrepreneurial ventures. I'm also known for my on-again, off-again relationship with Kelly Kapoor.",
        occupation='Salesman, Dunder Mifflin Scranton',
        profile_picture='https://theofficeanalytics.files.wordpress.com/2017/11/ryan-2.jpg')
    andy = User(
        username='andy', email='andy@aa.io', password='password', first_name='Andy', last_name='Bernard',
        background_picture='https://business.cornell.edu/wp-content/uploads/sites/2/2020/11/LinkedInBanner-Cornell2.jpg',
        education='Cornell University',
        education_picture='https://upload.wikimedia.org/wikipedia/commons/4/42/Cornell_University_Logo.png',
        education_date='Sep 1995 - May 1999',
        location='Scranton, Pennsylvania, United States',
        about="I'm Andy Bernard, a proud Cornell alumnus, and a former Regional Director in charge of sales at Dunder Mifflin Scranton. I love to sing and play the banjo, and I'm passionate about motivating people and leading teams to success. Now working as a motivational speaker and team building expert, I'm excited to help organizations improve their performance and reach their full potential.",
        occupation='Motivational Speaker & Team Building Expert',
        profile_picture='https://www.looper.com/img/gallery/the-office-the-real-reason-andy-was-promoted-over-dwight/intro-1586377261.jpg'
    )
    kevin = User(
        username='kevin', email='kevin@aa.io', password='password', first_name='Kevin', last_name='Malone',
        background_picture='https://external-preview.redd.it/WCfpinl1mdgMQ1eWRWhWzcYRBojfF-G1R4p0csZ1QxU.jpg?auto=webp&s=745d70cb07ba6ff1c54077886b46b2263cdd7b0f',
        education='Penn Foster College',
        education_picture='https://www.pennfoster.edu/-/media/project/pennfoster/front-matter/logos/penn-foster-college.png?rev=31f6b9a728324460af20a436a3731f4b',
        education_date='Sep 1989 - May 1993',
        location='Scranton, Pennsylvania, United States',
        about="I'm Kevin Malone, former accountant at Dunder Mifflin Scranton. I have a strong background in accounting and finance, and I'm passionate about numbers and problem-solving. In my free time, I enjoy playing drums and making my famous chili. Currently, I'm the proud owner of 'Malone's Cones,' a successful ice cream parlor in Scranton.",
        occupation='Owner, Malone\'s Cones',
        profile_picture='https://fr.web.img3.acsta.net/medias/nmedia/18/35/65/42/18795939.jpg'
    )
    
    creed = User(
        username='creed', email='creed@aa.io', password='password', first_name='Creed', last_name='Bratton',
        # background_picture='',
        education='Scranton University',
        education_picture='https://yt3.googleusercontent.com/ytc/AL5GRJWHPe1gE-rawFak3qtxuXkjJZB3IyxpIKSzAW_Bbw=s900-c-k-c0x00ffffff-no-rj',
        education_date='Sep 1976 - May 1980',
        location='Scranton, Pennsylvania, United States',
        about="I'm Creed Bratton, former Quality Assurance Manager at Dunder Mifflin Scranton. I have a mysterious background, but my experiences have allowed me to develop keen attention to detail and a unique perspective on problem-solving. In my free time, I enjoy playing the guitar, writing music, and exploring the great outdoors.",
        occupation='Freelance Quality Assurance Consultant',
        profile_picture='https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2020%2F01%2Fthe-office-2000.jpg'
    )

  
    db.session.add(demo)
    db.session.add(dwight)
    db.session.add(hermione)
    db.session.add(moseby)
    db.session.add(michael)
    db.session.add(jim)
    db.session.add(pam)
    db.session.add(kelly)
    db.session.add(ryan)
    db.session.add(andy)
    db.session.add(kevin)
    db.session.add(creed)
    db.session.commit()
    
    # Helper function to create follow relationships
    def add_follow_relationships(user, users_to_follow):
        for user_to_follow in users_to_follow:
            user.follow(user_to_follow)

    # List of all users
    all_users = [demo, dwight, hermione, moseby, michael, jim, pam, kelly, ryan, andy, kevin, creed]

    # Add follow relationships for each user
    for user in all_users:
        other_users = [u for u in all_users if u != user]
        add_follow_relationships(user, other_users)

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