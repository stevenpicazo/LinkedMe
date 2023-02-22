from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length, URL

class PostForm(FlaskForm):
    post = TextAreaField(
        'post', validators=[DataRequired(), 
        Length(min=1, max=3000, message='Posts are limited to 3000 characters')])

    image = StringField('image', validators=[URL(message='Please provide a valid image url')])
