import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { thunkUpdateComment } from "../../../store/comments";

const UpdateComment = ({ comment }) => {
    console.log('comment --->', comment)
    const dispatch = useDispatch()
    const [newComment, setNewComment] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        setNewComment(comment.comment)
    }, [comment])


    const onSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        const userComment = {
            comment: newComment
        }
        const data = await dispatch(thunkUpdateComment(userComment, comment.id))
        if (data && data.errors) {
            setErrors(data.errors)
        } else {
            setNewComment('')
        }
    }

    return (
        <div>
            
            <form>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <div className="error-messages">
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <button onClick={onSubmit}>Edit</button>
            </form>
        </div>
    );
};

export default UpdateComment;