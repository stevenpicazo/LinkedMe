import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateComment } from "../../../store/comments";
import { thunkLoadPosts } from "../../../store/posts";
import CreateOrDeleteLike from "../../Likes/CreateOrDeleteLike";
import './CreateComments.css'

const CreateComment = ({ post, showComments, setShowComments }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const [newComment, setNewComment] = useState('')
    const [errors, setErrors] = useState([])

    const onSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        const userComment = {
            comment: newComment
        }
        const data = await dispatch(thunkCreateComment(userComment, post.id))
        setErrors([])
        await dispatch(thunkLoadPosts(data))
        if (data && data.errors) {
            setErrors(data.errors)
        } else {
            setNewComment('')
        }
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault()
            onSubmit(e)
        }
    }

    return (
        <>
            <div className="post-card-buttons-container">
                <CreateOrDeleteLike post={post} />
                <button
                    onClick={() => setShowComments(!showComments)}
                    className="create-comment-button-container">
                    <i className="fa-regular fa-comment-dots"></i>
                    <span className="create-commment-text">Comment</span>
                </button>
            </div>
            <div className="create-comment-container">
                {showComments && (
                    <div className="comment-form-container">
                        <form className="comment-form" onSubmit={onSubmit}>
                            <div>
                                <div className="error-messages">
                                    {Object.values(errors).map((error, ind) => (
                                        <div key={ind}>
                                            {error}
                                        </div>
                                    ))}
                                </div>
                            </div>


                            <div className="prof-pic-comment-creation-container">
                                <img className="comment-prof-pic" src={user.profile_picture} alt="Profile Image" ></img>
                                <textarea
                                    placeholder="Add a comment"
                                    type='textarea'
                                    className="new-comment-textarea"
                                    value={newComment}
                                    onChange={(e) => {
                                        setNewComment(e.target.value)
                                        if (e.target.value.length <= 255) {
                                            setErrors([])
                                        }
                                    }}
                                    onKeyDown={handleKeyDown}
                                ></textarea>
                            </div>

                        </form>
                    </div>
                )}
            </div >
        </>
    )
}

export default CreateComment
