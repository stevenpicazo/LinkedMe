from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length, URL

class MessageForm(FlaskForm):
    content = TextAreaField(
        'content',validators=[DataRequired(message="Message cannot be empty."),
            Length(max=1000, message="Messages are limited to 1000 characters.")])
    image = StringField('image')
