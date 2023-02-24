import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkLoadComments } from '../../../store/comments'
import PostOptions from './PostOptions'
import './UserPostCard.css'


const UserPostCard = ({ post }) => {

    const dispatch = useDispatch()
    const comments = useSelector(state => state.comments)
    const postComments = Object.values(comments).filter(comment => comment.post_id === post.id);

    useEffect(() => {
        dispatch(thunkLoadComments(post.id))
    }, [dispatch, post.id])

    return (
        <div className="feed-container">

            <div className="user-post">
                <div className="post-header">
                    <div className='profile-image-info-container'>
                        <img src="" alt="Profile Image" className="profile-image"></img>
                        <div className="post-info">
                            <h3 className="user-name">User Name</h3>
                            <span className="post-date">Post Date</span>
                        </div>
                    </div>
                    <PostOptions post={post} />
                </div>
                <div className="post-body">
                    <div>{post.post}</div>
                </div>
                <div className="post-image">
                </div>
                {Object.values(postComments).map((comment) => (
                    <div key={comment.id}>{comment.comment}</div>
                ))}
            </div>
        </div>
    )
}

export default UserPostCard;