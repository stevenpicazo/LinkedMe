import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { thunkUpdateComment } from "../../../store/comments";
import './UpdateComment.css'

const UpdateComment = ({ comment, showComments, setShowComments }) => {

    const truncateName = (name) => {
        const shortName = name?.slice(0, 16);
        return shortName + "...";
    }

    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef()

    const openMenu = () => {
        if (showMenu) return
        setShowMenu(true)
    }

    const closeMenu = (e) => {
        setShowMenu(false)
    }

    useEffect(() => {
        if (!showMenu) return
        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false)
            }
        }
        document.addEventListener("click", closeMenu);
        return () => document.removeEventListener("click", closeMenu)
    }, [showMenu])

    const ulClassName = "comment-dropdown" + (showMenu ? "" : " hidden")

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

        <div className="comment-content-container">
            {showComments && (
                <>
                    <div className='comments-content' key={comment.id}>
                        <div className="comment-occupation-container">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png"
                                className="user-profile-pic">
                            </img>
                            <div className="user-name-occupation-container">
                                <div className="comment-options">
                                    <span className="user-first-last-name">{comment.user.first_name} {comment.user.last_name}</span>
                                    <i onClick={openMenu} className="fa-solid fa-ellipsis"></i>
                                </div>
                                <span className="user-occupation">{comment.user.occupation}</span>
                                <span className="user-comment">{comment.comment}</span>
                            </div>
                        </div>
                    </div>

                    <div className={ulClassName} ref={ulRef}>
                        <div className="edit-comment">
                            <i className="fa-solid fa-pencil edit-comment-logo"></i>
                            Edit
                        </div>
                        <div className="delete-comment">
                            <i className="fa-regular fa-trash-can edit-comment-logo"></i>
                            Delete
                        </div>

                    </div>
                </>
            )}
        </div>



        // <div>
        //     <form>
        //         <textarea
        //             value={newComment}
        //             onChange={(e) => setNewComment(e.target.value)}
        //         />
        //         <div className="error-messages">
        //             {errors.map((error, ind) => (
        //                 <div key={ind}>{error}</div>
        //             ))}
        //         </div>
        //         <button onClick={onSubmit}>Edit</button>
        //     </form>
        // </div>
    );
};

export default UpdateComment;