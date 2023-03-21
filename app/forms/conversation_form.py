from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, FieldList, IntegerField
from wtforms.validators import DataRequired, Length
from app.models import User


class ConversationForm(FlaskForm):
    user_ids = FieldList(IntegerField('User ID', validators=[DataRequired()]), min_entries=1)
