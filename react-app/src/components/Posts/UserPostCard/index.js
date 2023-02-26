
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






// import { useEffect, useState, useRef } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { thunkLoadComments } from '../../../store/comments'
// import CreateComment from '../../Comments/CreateComment'
// import UpdateComment from '../../Comments/UpdateComment'
// import PostOptions from './PostOptions'
// import './UserPostCard.css'


// const UserPostCard = ({ post }) => {
//     const dispatch = useDispatch()
//     const [showComments, setShowComments] = useState(false);

//     const [showMenu, setShowMenu] = useState(false);
//     const ulRef = useRef();
//     const sessionUser = useSelector(state => state.session.user);

//     const openMenu = () => {
//         if (showMenu) return;
//         setShowMenu(true);
//     };

//     const closeMenu = (e) => {
//         setShowMenu(false);
//     };

//     useEffect(() => {
//         dispatch(thunkLoadComments(post.id))
//     }, [dispatch, post.id])


//     useEffect(() => {
//         if (!showMenu) return;
//         const closeMenu = (e) => {
//             if (!ulRef.current.contains(e.target)) {
//                 setShowMenu(false);
//             }
//         }
//         document.addEventListener("click", closeMenu);
//         return () => document.removeEventListener("click", closeMenu);
//     }, [showMenu]);

//     const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

//     return (
//         <div className="feed-container">

//             <div className="user-post">
//                 <div className="post-header">
//                     <div className='profile-image-info-container'>
//                         <img src="" alt="Profile Image" className="profile-image"></img>
//                         <div className="post-info">
//                             <h3 className="user-name">User Name</h3>
//                             <span className="post-date">Post Date</span>
//                         </div>
//                     </div>
//                     <PostOptions post={post} />
//                 </div>
//                 <div className="post-body">
//                     <div>{post.post}</div>
//                 </div>
//                 <div className="post-image">
//                 </div>
                // <CreateComment post={post} showComments={showComments} setShowComments={setShowComments} />
                // <div
                //     className='comments-tab'
                //     onClick={() => setShowComments(!showComments)}
                // >Comments
                // </div>

//                 {Object.values(post.comments).map((comment) => (
//                     <div>
//                         {showComments && (
//                             <div className='comment-content-container'>
//                                 {comment.user_id === sessionUser.id && (
//                                     <>
//                                         <i onClick={openMenu} className="fa-solid fa-ellipsis"></i>
//                                         <div className='comments-content' key={comment.id}>{comment.comment}</div>
//                                     </>
//                                 )}
//                                 {comment.user_id === sessionUser.id && (
//                                     <ul className={ulClassName} ref={ulRef}>
//                                         <div className='comment-options container'>
//                                             <UpdateComment comment={comment} />
//                                             <span>Delete</span>
//                                         </div>
//                                     </ul>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </div >
//     )
// }

// export default UserPostCard;