
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
    const [showComments, setShowComments] = useState(false);

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
                <CreateComment post={post} showComments={showComments} setShowComments={setShowComments} />
                <div
                    className='comments-tab'
                    onClick={() => setShowComments(!showComments)}
                >Comments
                </div>
                {postComments.map((comment) => (

                    <UpdateComment comment={comment} showComments={showComments} setShowComments={setShowComments} post={post}/>

                    // <div>
                    //     {showComments && (
                    //         <div className='comments-content' key={comment.id}>{comment.comment}</div>
                    //     )}
                    // </div>
                ))}
            </div>
        </div>
    )
}

export default UserPostCard;
