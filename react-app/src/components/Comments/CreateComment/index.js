import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkCreateComment } from "../../../store/comments";

const CreateComment = ({ post, showComments ,setShowComments }) => {
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
        <div>
            <i onClick={() => setShowComments(!showComments)} className="fa-regular fa-comment-dots"></i>
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
                        
                        <textarea
                            placeholder="Add a comment"
                            type='textarea'
                            className="new-comment-textarea"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyDown={handleKeyDown}
                        ></textarea>
                    </form>
                </div>
            )}
        </div>
    )
}

export default CreateComment
