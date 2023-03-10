from flask_wtf import FlaskForm
from wtforms import StringField
from flask_login import login_required, login_user, current_user
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user and user.id != current_user.id:
        raise ValidationError('Email address is already in use.')

def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user and user.id != current_user.id:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, Length(max=255, message='Last Name is limited to 255 characters')])
    password = StringField('password', validators=[DataRequired(), Length(max=255, message='Password is limited to 255 characters')])
    first_name = StringField('first_name', validators=[DataRequired(), Length(max=50, message='First name is limited to 50 characters')])
    last_name = StringField('last_name', validators=[DataRequired(), Length(max=50, message='Last name is limited to 50 characters')])
    occupation= StringField('occupation', validators=[DataRequired(), Length(max=80, message='Occupation is limited to 50 characters')])
    profile_picture= StringField('profile_picture')
    background_picture = StringField('background_picture')
    education = StringField('education')
    education_picture = StringField('education_picture')
    education_date = StringField('education_date')
    about = StringField('about')
    location = StringField('location')

