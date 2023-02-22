from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired, Length
from app.models import User


class CommentForm(FlaskForm):
    comment = TextAreaField(
        'comment', validators=[DataRequired(), 
        Length(min=1, max=255, message='Comments are limited to 255 characters')])
