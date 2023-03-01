import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkLoadComments } from '../../../store/comments'
import CreateComment from '../../Comments/CreateComment'
import UpdateComment from '../../Comments/UpdateComment'
import PostOptions from './PostOptions'
import logo from './global.png'
import './UserPostCard.css'
import { thunkLoadPosts } from '../../../store/posts'

const UserPostCard = ({ post }) => {
    const dispatch = useDispatch()
    const comments = useSelector(state => state.comments.allComments)
    const user = useSelector(state => state.session.user)

    const postComments = Object.values(post.comments)

    const [showComments, setShowComments] = useState(false)
    const postDate = new Date(Date.parse(post.created_at))
    const now = new Date()
    let dateString

    const diffInMs = now - postDate

    if (diffInMs < 60 * 1000) { // less than 1 minute ago
        dateString = 'Just now'
    } else if (diffInMs < 60 * 60 * 1000 && diffInMs >= 60 * 1000) { // less than 1 hour ago, more than 1 minute ago
        const diffInMin = Math.round(diffInMs / (60 * 1000))
        dateString = `${diffInMin}m`
    } else if (diffInMs < 24 * 60 * 60 * 1000 && diffInMs >= 60 * 60 * 1000) { // less than 1 day ago, more than 1 hour ago
        const diffInHrs = Math.round(diffInMs / (60 * 60 * 1000))
        dateString = `${diffInHrs}h`
    } else {
        const diffInDays = Math.round(diffInMs / (24 * 60 * 60 * 1000))
        dateString = `${diffInDays}d`
    }


    return (
        <div className="feed-container">
            <div className="user-post">
                <div className="post-header">
                    <div className='profile-image-info-container'>
                        <img src={post.user.profile_picture} alt="Profile Image" className="profile-image"></img>
                        <div className="post-info">
                            <span className="user-name">{post.user.first_name}</span>
                            <span className="postcard-user-occupation">{post.user.occupation}</span>
                            <div className='date-global-container'>
                                <span className="post-date">{dateString} •  </span>
                                <img className='global-img' src={logo}></img>

                            </div>
                        </div>
                    </div>
                    <PostOptions post={post} />
                </div>
                <div className="post-body">
                    <div className='user-posts'>{post.post}</div>
                    {post.image ? <img className='post-image' src={post.image}></img> : null}
                </div>
                <div className='comments-tab' onClick={() => setShowComments(!showComments)}>
                    {postComments.length === 1 ? '1 comment' : `${postComments.length} comments`}
                </div>
                <div className='post-card-border'></div>
                <CreateComment post={post} showComments={showComments} setShowComments={setShowComments} />
                {postComments.reverse().map((comment) => (
                    <UpdateComment key={comment.id} comment={comment} showComments={showComments} setShowComments={setShowComments} post={post} />
                ))}
            </div>
        </div>
    )
}

export default UserPostCard;
