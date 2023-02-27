import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkCreateComment } from "../../../store/comments";
import './CreateComments.css'

const CreateComment = ({ post, showComments, setShowComments }) => {
    const dispatch = useDispatch()

    const [newComment, setNewComment] = useState('')
    const [errors, setErrors] = useState([])

    const onSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        const userComment = {
            comment: newComment
        }
        const data = await dispatch(thunkCreateComment(userComment, post.id))
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
        <div className="create-comment-container">
            <button onClick={() => setShowComments(!showComments)} className="create-comment-button-container">
                <i className="fa-regular fa-comment-dots"></i>
                <span className="create-commment-text">Comment</span>
            </button>
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
                            <img className="comment-prof-pic" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png" alt="Profile Image" ></img>
                            <textarea
                                placeholder="Add a comment"
                                type='textarea'
                                className="new-comment-textarea"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                onKeyDown={handleKeyDown}
                            ></textarea>
                        </div>

                    </form>
                </div>
            )
            }
        </div >
    )
}

export default CreateComment
