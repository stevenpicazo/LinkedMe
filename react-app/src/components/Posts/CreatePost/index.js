import React, { useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { useHistory } from 'react-router-dom';
import { thunkCreatePost, thunkUpdatePost } from "../../../store/posts";
import { useModal } from '../../../context/Modal'
import './CreatePost.css'

const CreatePost = ({post}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const { closeModal } = useModal()

    const [newpost, setNewPost] = useState('')
    const [newImage, setNewImage] = useState('')
    const [errors, setErrors] = useState([])

    const title = post ? "Edit Post" : "Start a Post";

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors([])
        const userPost = {
            post: newpost,
            sessionUser: sessionUser.id,
            image: newImage,
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
        <div className='newPost-container'>
            <span className="newPost-title">{title}</span>
            <div className="user-profile-pic"></div>
            <form className="newPost-form" onSubmit={onSubmit}>
                <div >
                    <div className="error-messages">
                        {Object.values(errors).map((error, ind) => (
                            <div key={ind}>
                                {error}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <label className='newPost-label'>
                        <textarea
                            placeholder='What do you want to talk about?'
                            className='newPost-text'
                            type='textarea'
                            value={newpost}
                            onChange={(e) => setNewPost(e.target.value)}
                        ></textarea>
                    </label>
                    <label className='feedback-label'>
                        <input
                            type="file"
                            accept="image/*"
                            placeholder="&#xf03e"
                            className='newPost-input'
                            onChange={(e) => setNewImage(e.target.value)}
                            value={newImage}
                        ></input>
                    </label>
                </div>
                <button className="newPost-button" type='submit'>{title}</button>

            </form>
        </div>
    )
}


export default CreatePost;