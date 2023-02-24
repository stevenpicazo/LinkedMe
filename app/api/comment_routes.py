from flask import Blueprint, request
from app.models import db, Comment, Post, User
from flask_login import login_required, login_user, current_user
from app.forms import CommentForm
from datetime import datetime

comment_routes = Blueprint('comments', __name__)


##! GET ALL COMMENTS BY POST ID
@comment_routes.route('/<int:post_id>')
@login_required
def get_comments(post_id):
    '''
    Query's for all comments of a post by post id.
    '''
    all_comments = Comment.query.filter(Comment.post_id == post_id).all()        
    comments = [comment.to_dict() for comment in all_comments]
    
    return comments, 200

##! CREATE A COMMENT
@comment_routes.route('/<int:post_id>', methods = ['POST'])
@login_required
def create_comment (post_id):
    '''
    Query's comment by comment id and allows users to
    update their comments on a post
    '''

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment = Comment(
            comment = form.data['comment'],
            post_id = post_id,
            user_id = current_user.id
        )
        
        db.session.add(new_comment)
        db.session.commit()
        return  new_comment.to_dict(), 201
    
    return {'errors': form.errors}, 401
    
##! UPDATE A COMMENT 
@comment_routes.route('/<int:comment_id>', methods = ['PUT'])
@login_required
def update_comment (comment_id):
    '''
    Query's post by post id and allows users to 
    update their comments on a post
    '''
    comment = Comment.query.get(comment_id)
    
    if not comment:
        return {'errors': ["Comment not found"]}, 404
    
    if comment.user_id != current_user.id:
        return {"errors": ["You are not authorized to edit this comment."]}, 403

    if comment.user_id == current_user.id:
        form=CommentForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit:
            comment.comment = form.data['comment']
            db.session.commit()
            
            return comment.to_dict(), 200
    
        return {'errors': form.errors}, 401
    
    
            
##! DELETE A COMMENT
@comment_routes.route('/<int:comment_id>', methods = ['DELETE'])
@login_required
def delete_comment (comment_id):
    '''
    Query's comment by comment id and allows users to
    delete their comments on a post
    '''
    
    comment = Comment.query.get(comment_id)
    
    if not comment:
        return {'errors': ["Comment not found"]}, 404
    
    if comment.user_id != current_user.id:
        return {"errors": ["You are not authorized to edit this comment."]}, 403

    if comment.user_id == current_user.id:
        db.session.delete(comment)
        db.session.commit()
        return {'message':' Comment deleted'}, 200
