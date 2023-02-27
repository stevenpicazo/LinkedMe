import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkLoadComments } from '../../../store/comments'
import CreateComment from '../../Comments/CreateComment'
import UpdateComment from '../../Comments/UpdateComment'
import PostOptions from './PostOptions'
import './UserPostCard.css'

const UserPostCard = ({ post }) => {
    const dispatch = useDispatch()
    const comments = useSelector(state => state.comments.allComments)
    const postComments = Object.values(comments).filter(comment => comment.post_id === post.id);
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
    



    useEffect(() => {
        dispatch(thunkLoadComments(post.id))
    }, [dispatch, post.id])

    return (
        <div className="feed-container">
            <div className="user-post">
                <div className="post-header">
                    <div className='profile-image-info-container'>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png" alt="Profile Image" className="profile-image"></img>
                        <div className="post-info">
                            <h3 className="user-name">User Name</h3>
                            <span className="post-date">{dateString}</span>
                        </div>
                    </div>
                    <PostOptions post={post} />
                </div>
                <div className="post-body">
                    <div>{post.post}</div>
                </div>
                <div className="post-image">
                </div>
                <CreateComment post={post} showComments={showComments} setShowComments={setShowComments} />
                <div
                    className='comments-tab'
                    onClick={() => setShowComments(!showComments)}
                >Comments
                </div>
                {postComments.map((comment) => (
                    <UpdateComment comment={comment} showComments={showComments} setShowComments={setShowComments} post={post} />
                ))}
            </div>
        </div>
    )
}

export default UserPostCard;
