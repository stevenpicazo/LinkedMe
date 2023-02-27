import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
import { thunkUpdateComment } from "../../../store/comments"
import DeleteComment from "../DeleteComment"
import './UpdateComment.css'

const UpdateComment = ({ comment, showComments, setShowComments, post }) => {

    const truncateName = (name) => {
        const shortName = name?.slice(0, 16)
        return shortName + "..."
    }

    const [showMenu, setShowMenu] = useState(false)
    const [editing, setEditing] = useState(false)
    const ulRef = useRef()
    const sessionUser = useSelector(state => state.session.user)

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
        document.addEventListener("click", closeMenu)
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
            setEditing(false)
        }
    }

    const handleEdit = () => {
        setEditing(true)
        closeMenu()
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
                                    {comment.user_id === sessionUser.id && (
                                        <i onClick={openMenu} className="fa-solid fa-ellipsis"></i>
                                    )}
                                </div>
                                <span className="user-occupation">{comment.user.occupation}</span>
                                {editing ? (
                                    <>
                                        <div
                                        className="editable-comment"
                                            contentEditable
                                            onInput={(e) => setNewComment(e.target.innerText)}
                                            dangerouslySetInnerHTML={{ __html: comment.comment }}
                                        />
                                        <button className="save-comment-button" onClick={onSubmit}>Save Changes</button>
                                    </>
                                ) : (
                                    <span className="user-comment">{comment.comment}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={ulClassName} ref={ulRef}>
                        <div className="edit-comment" onClick={handleEdit}>
                            <i className="fa-solid fa-pencil edit-comment-logo"></i>
                            Edit
                        </div>
                        <DeleteComment comment={comment} closeMenu={closeMenu} post={post} />
                    </div>
                </>
            )}
        </div>
    )
}

export default UpdateComment