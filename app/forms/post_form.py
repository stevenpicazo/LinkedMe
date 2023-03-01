from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length, URL

class PostForm(FlaskForm):
    post = TextAreaField(
        'post', validators=[DataRequired('The post field is required'), 
        Length(min=1, max=1000, message='Posts are limited to 1000 characters')])
    image = StringField('image')
