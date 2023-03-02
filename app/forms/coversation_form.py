from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length, URL

class ConversationForm(FlaskForm):
    user_id = StringField('user_id', validators=[DataRequired(), Length(max=255)])
    receiver_id = StringField('receiver_id', validators=[DataRequired(), Length(max=255)])
    content = TextAreaField('content', validators=[DataRequired(), Length(max=1000)])
