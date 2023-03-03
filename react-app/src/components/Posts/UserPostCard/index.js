import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkLoadComments } from '../../../store/comments'
import CreateComment from '../../Comments/CreateComment'
import UpdateComment from '../../Comments/UpdateComment'
import PostOptions from './PostOptions'
import logo from './global.png'
import like from './like.png'
import './UserPostCard.css'
import { thunkLoadPosts } from '../../../store/posts'
import { useHistory } from 'react-router-dom'
import CreateOrDeleteLike from '../../Likes/CreateOrDeleteLike'

const UserPostCard = ({ post }) => {
    const history = useHistory()
    const postComments = Object.values(post.comments)
    const [showComments, setShowComments] = useState(false)
    const postDate = new Date(post.created_at)
    const offsetInMs = postDate.getTimezoneOffset() * 60 * 1000
    const localPostDate = new Date(postDate.getTime() - offsetInMs)
    const options = { month: 'short', day: 'numeric' }
    const dateString = localPostDate.toLocaleDateString(undefined, options)

    const handleUserProfile = () => {
        history.push(`/profile/${post.user.id}`)
    }

    const renderLikes = () => {
        if (!post.likes.length) {
            return null;
        } else if (post.likes.length) {
            return (
                <>
                    <img className='likes-tab-icon' src={like} alt="Like icon" />
                    {`${post.likes[0].user.first_name} ${post.likes[0].user.last_name} likes this`}
                </>
            )
        } else if (post.likes.length === 2) {
            return (
                <>
                    <img className='likes-tab-icon' src={like} alt="Like icon" />
                    {`${post.likes[0].user.first_name} ${post.likes[0].user.last_name} and ${post.likes[1].user.first_name} ${post.likes[1].user.last_name} like this`}
                </>
            )
        } else {
            const numOtherLikes = post.likes.length - 2
            return (
                <>
                    <img className='likes-tab-icon' src={like} alt="Like icon" />
                    {`${post.likes[0].user.first_name} ${post.likes[0].user.last_name} and ${numOtherLikes} others like this`}
                </>
            )
        }
    }




    return (
        <div className="feed-container">
            <div className="user-post">
                <div className="post-header">
                    <div className='profile-image-info-container'>
                        <img src={post.user.profile_picture} alt="Profile Image" className="profile-image"></img>
                        <div className="post-info">
                            <span onClick={handleUserProfile} className="user-name">{post.user.first_name}</span>
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
                <div className='likes-comments-tab-container'>
                    <div className='likes-tab'>
                        {renderLikes()}
                    </div>
                    <div className='comments-tab' onClick={() => setShowComments(!showComments)}>
                        {!postComments.length ? null : postComments.length > 1 ? `${postComments.length} comments` : `${postComments.length} comment`}
                    </div>
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
