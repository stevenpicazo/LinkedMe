// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector, } from "react-redux";
// import { thunkUpdatePost, thunkLoadUserPosts } from "../../../store/posts";
// import { useModal } from '../../../context/Modal'


// const UpdatePost = () => {

//     const post = useSelector(state => state.posts.userPosts)
//     console.log('post --->', post)

//     const dispatch = useDispatch()
//     const { closeModal } = useModal()

//     const [newpost, setNewPost] = useState('')
//     const [newImage, setNewImage] = useState('')
//     const [errors, setErrors] = useState([])

//     useEffect(() => {
//         dispatch(thunkLoadUserPosts())
//     }, [dispatch])


//     const onSubmit = async (e) => {
//         e.preventDefault()
//         setErrors([])

//         const updatedPost = {
//             post: newpost,
//             image: newImage,
//         }

//         const data = await dispatch(thunkUpdatePost(post.id, updatedPost))

//         if (data && data.errors) {
//             setErrors(errors)
//         } else {
//             closeModal()
//         }
//     }

//     return (
//         <div className='newPost-container'>
//             <span className="newPost-title">Edit Post</span>
//             <div className="user-profile-pic"></div>
//             <form className="newPost-form" onSubmit={onSubmit}>
//                 <div>
//                     <div className="error-messages">
//                         {Object.values(errors).map((error, ind) => (
//                             <div key={ind}>
//                                 {error}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div>
//                     <label className='newPost-label'>
//                         <textarea
//                             placeholder='What do you want to talk about?'
//                             className='newPost-text'
//                             type='textarea'
//                             value={newpost}
//                             onChange={(e) => setNewPost(e.target.value)}
//                         ></textarea>
//                     </label>
//                     <label className='feedback-label'>
//                         <input
//                             type="file"
//                             accept="image/*"
//                             placeholder="&#xf03e"
//                             className='newPost-input'
//                             onChange={(e) => setNewImage(e.target.value)}
//                             value={newImage}
//                         ></input>
//                     </label>
//                 </div>
//                 <button className="newPost-button" type='submit'>Post</button>

//             </form>
//         </div>
//     )
// }

// export default UpdatePost;