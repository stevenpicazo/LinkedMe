from flask import Blueprint, request
from app.models import db, Post, User
from flask_login import login_required, login_user, current_user
from app.forms import PostForm
from datetime import datetime

post_routes = Blueprint('posts', __name__)

##! GET ALL POSTS
@post_routes.route('/')
@login_required
def get_posts():
    '''
    Query's for all posts of the logged in user.
    As well as querying for all comments related to
    the posts
    '''
    if current_user:
        all_posts = Post.query.all()
        posts = [post.to_dict() for post in all_posts]
        
        return posts, 200

##! CREATE A POST
@post_routes.route('/', methods = ['POST'])
@login_required
def create_post():
    '''
    Creates post for logged in user
    '''
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_post = Post(
            post = form.data['post'],
            image = form.data['image'],
            user_id = current_user.id,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        
        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict(), 201

    return {'errors': form.errors}, 401
            
##! UPDATE A POST
@post_routes.route('/<int:post_id>', methods=['PUT'])
@login_required
def update_post(post_id):
    postById = Post.query.get(post_id)

    if not postById:
        return {'errors': 'Post not found.'}, 404

    if postById.user_id != current_user.id:
        return {'errors': 'Unauthorized.'}, 401

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        postById.post = form.data['post']
        postById.image = form.data['image']
        postById.updated_at = datetime.now()
        db.session.commit()

        return postById.to_dict(), 200

    return {'errors': form.errors}, 401

    

##! DELETE A SPOT
@post_routes.route('/<int:post_id>', methods=['DELETE'])
@login_required
def delete_post(post_id):
    '''
    Deletes post for logged in user by post id
    '''
    post = Post.query.get(post_id)
    
    if not post:
        return {'errors': 'Post not found.'}, 404

    if post.user_id != current_user.id:
        return {'errors': 'You are unauthorized to delete this post.'}, 401
    
    if post.user_id == current_user.id:
        db.session.delete(post)
        db.session.commit()
        return {'message': post_id}, 200

     
     