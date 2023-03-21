from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

followers = db.Table(
    'followers',
    db.Model.metadata, 
    db.Column("follower_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key = True),
    db.Column("followed_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key = True),
    db.Column("date_added", db.DateTime, default=datetime.utcnow),
    schema=SCHEMA if environment == "production" else None
)

user_convos=db.Table(
    "user_convos",
    db.Model.metadata,
    db.Column('users', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('conversations', db.Integer, db.ForeignKey(add_prefix_for_prod('conversations.id')), primary_key=True)
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
    occupation = db.Column(db.String(100), nullable=False)
    profile_picture = db.Column(db.String(1000), nullable=False)
    background_picture = db.Column(db.String(1000), nullable=True)
    education = db.Column(db.String(150), nullable=True)
    education_picture = db.Column(db.String(1000), nullable=True)
    education_date = db.Column(db.String(150), nullable=True)
    about = db.Column(db.String(1000), nullable=True)
    location = db.Column(db.String(200), nullable=True)
    date_added = db.Column(db.DateTime, default=datetime.utcnow)

    ##! Relationships
    posts = db.relationship('Post', back_populates='user', cascade="all, delete-orphan")
    comments = db.relationship('Comment', back_populates='user', cascade="all, delete-orphan")
    likes = db.relationship('Like', back_populates='user', cascade="all, delete-orphan")
    messages = db.relationship("Message", back_populates="user", cascade="all, delete-orphan")
    conversations = db.relationship("Conversation", back_populates="users", secondary=user_convos)


    followed = db.relationship(
        'User', secondary=followers,
        primaryjoin=(followers.c.follower_id == id),
        secondaryjoin=(followers.c.followed_id == id),
        backref=db.backref('followers', lazy='dynamic'), lazy='dynamic'
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
                self.followed.append(user)

    def unfollow(self, user):
            if self.is_following(user):
                self.followed.remove(user)

    def is_following(self, user):
            return self.followed.filter(followers.c.followed_id == user.id).count() > 0


    def to_dict_followers(self):
        return {
            'id': self.id,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'occupation': self.occupation,
            'profile_picture': self.profile_picture,
            'background_picture': self.background_picture,
            'education': self.education,
            'education_picture': self.education_picture,
            'education_date': self.education_date,
            'about': self.about,
            'location': self.location,
            'date_added': self.date_added.strftime('%Y-%m-%d %H:%M:%S')
        }

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
            'location': self.location,
            'followers': [follower.to_dict_followers() for follower in self.followers],
            'following': [following.to_dict_followers() for following in self.followed]
        }


