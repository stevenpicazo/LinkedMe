import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { thunkCreateComment, thunkUpdateComment } from "../../../store/comments";

const CreateOrUpdateComment = ({ post, handleClick }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)

    // const comments = useSelector(state => state.comments)
    // const postComments = Object.values(comments).filter(comment => comment.post_id === post.id);

    const [newComment, setNewComment] = useState('')
    const [errors, setErrors] = useState([])
    const [showTextArea, setShowTextArea] = useState(false)

    const handleText = () => {
        setShowTextArea(!showTextArea);
    }


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
        <div >
            <i onClick={handleText} className="fa-regular fa-comment-dots"></i>
            {showTextArea && (
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
                            onClick={handleText}
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

export default CreateOrUpdateComment
