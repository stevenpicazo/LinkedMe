from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

connections = db.Table(
    'connections',
    db.Model.metadata, 
    db.Column("user_id",  db.ForeignKey(add_prefix_for_prod("users.id"))),
    db.Column("connection_id",  db.ForeignKey(add_prefix_for_prod("users.id")))
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name  = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    occupation = db.Column(db.String(80), nullable=False)
    profile_picture = db.Column(db.String(255), nullable=False)
    background_picture = db.Column(db.String(255), nullable=True)
    education = db.Column(db.String(80), nullable=True)
    education_picture = db.Column(db.String(255), nullable=True)
    education_date = db.Column(db.String(150), nullable=True)
    about = db.Column(db.String(510), nullable=True)
    location = db.Column(db.String(80), nullable=True)

    ##! Relationships
    posts = db.relationship('Post', back_populates='user', cascade="all, delete-orphan")
    comments = db.relationship('Comment', back_populates='user', cascade="all, delete-orphan")
    likes = db.relationship('Like', back_populates='user', cascade="all, delete-orphan")
    connected = db.relationship(
        'User', secondary=connections, 
        primaryjoin=(connections.c.user_id == id),
        secondaryjoin=(connections.c.connection_id == id), 
        backref=db.backref('connections', lazy='dynamic'), lazy='dynamic'
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def follow(self, user):
        if not self.is_following(user):
            self.connected.append(user)

    def unfollow(self, user):
        if self.is_following(user):
            self.connected.remove(user)

    def is_following(self, user):
        return self.connected.filter(
            connections.c.connection_id == user.id).count() > 0
    
    def get_followers(self):
        return self.connections.filter(connections.c.connection_id == self.id).all()

    def get_following(self):
        return self.connected.all()



    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'occupation': self.occupation,
            'profile_picture': self.profile_picture,
            'background_picture': self.background_picture,
            'education': self.education,
            'education_picture': self.education_picture,
            'education_date': self.education_date,
            'about': self.about,
            'location': self.location
        }


