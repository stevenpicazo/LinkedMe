import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { useHistory } from 'react-router-dom';
import { thunkCreatePost, thunkUpdatePost } from "../../../store/posts";
import { useModal } from '../../../context/Modal'
import './CreatePost.css'

const CreateOrUpdatePost = ({ post }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    const sessionUser = useSelector(state => state.session.user)

    const [newpost, setNewPost] = useState('')
    const [newImage, setNewImage] = useState('')
    const [errors, setErrors] = useState([])
    const [isHovered, setIsHovered] = useState(false)

    const title = post ? "Edit Post" : "Create a post"
    const buttonText = post ? "Edit " : "Post"


    const handleHover = () => {
        setIsHovered(true)
    }

    const handleLeave = () => {
        setIsHovered(false)
    }


    useEffect(() => {
        if (post) {
            setNewPost(post.post)
            setNewImage(post.image)
        }
    }, [post])

    const onSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        const userPost = {
            post: newpost,
            image: newImage,
            sessionUser: sessionUser.id,
        }
        const data = post ? await dispatch(thunkUpdatePost(userPost, post.id)) : await dispatch(thunkCreatePost(userPost))
        if (data && data.errors) {
            setErrors(data.errors)
        } else {
            closeModal()
            history.push('/feed')
        }
    }

    return (
        <div className='new-post-container'>
            <div className="newPost-title-container">
                <div className="newPost-title">{title}</div>
                <span onClick={closeModal} className="x">✕</span>
            </div>
            <div className="create-post-user-container">
                <img className="profile-image" src={sessionUser.profile_picture}></img>
                <span className="newPost-firstname">{sessionUser.first_name}</span>
            </div>
            <form
                className="newPost-form"
                onSubmit={onSubmit}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}>
                <div >
                    <div className="error-messages">
                        {errors && Object.values(errors).map((error, ind) => (
                            <div key={ind}>
                                {error}
                            </div>
                        ))}
                    </div>

                    <div className="post-label-container">
                        <label className='newPost-label'>
                            <textarea
                                placeholder='What do you want to talk about?'
                                className='newPost-text'
                                type='textarea'
                                value={newpost}
                                onInput={(e) => {
                                    setNewPost(e.target.value)
                                    if (e.target.value.length <= 255) {
                                        setErrors([])
                                    }
                                }}
                                // onChange={(e) => setNewPost(e.target.value)}
                                required
                            ></textarea>
                        </label>
                        <div className='post-image-container'>
                            <div className="post-image-text-container">
                                <i className="fa-regular fa-image"></i>
                                <input
                                    placeholder="Image Url"
                                    className="image-input"
                                    type="url"
                                    value={newImage}
                                    onChange={(e) => setNewImage(e.target.value)}
                                ></input>
                            </div>
                            <button
                                className={`newPost-button${!newpost ? ' disabled' : ''}`}
                                type='submit'
                            > {buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            </form >
        </div >
    )
}


export default CreateOrUpdatePost;