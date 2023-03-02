import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
import { thunkUpdateComment } from "../../../store/comments"
import { thunkLoadPosts } from "../../../store/posts"
import DeleteComment from "../DeleteComment"
import './UpdateComment.css'

const UpdateComment = ({ comment, showComments, setShowComments, post }) => {
    const [showMenu, setShowMenu] = useState(false)
    const [editing, setEditing] = useState(false)
    const [newComment, setNewComment] = useState('')
    const [errors, setErrors] = useState([])
    const ulRef = useRef()
    const history = useHistory()
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


    useEffect(() => {
        setNewComment(comment.comment)
    }, [comment])

    const onSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        if (newComment.length > 255) {
            setErrors(['Comment cannot be longer than 255 characters'])
            return
        }
        const userComment = {
            comment: newComment
        }
        const data = await dispatch(thunkUpdateComment(userComment, comment.id))
        await dispatch(thunkLoadPosts(data))
        { console.log('data', data.errors) }
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

    const handleCancel = () => {
        setEditing(false)
        setErrors([])
    }

    const handleUserProfile = () => {
        history.push(`/profile/${comment.user.id}`)
    }

    return (
        <div className="comment-content-container">
            {showComments && (
                <>
                    <div className='comments-content' key={comment.id}>
                        <div className="comment-occupation-container">
                            <img
                                src={comment.user.profile_picture}
                                className="comments-user-profile-pic">
                            </img>
                            <form onSubmit={onSubmit} className="user-name-occupation-container">
                                <div className="comment-options">
                                    <span onClick={handleUserProfile} className="user-first-last-name">{comment.user.first_name} {comment.user.last_name}</span>
                                    {comment.user_id === sessionUser.id && (
                                        <i onClick={openMenu} className="fa-solid fa-ellipsis"></i>
                                    )}
                                </div>
                                <span className="user-occupation">{comment.user.occupation}</span>
                                <div>
                                    <div className="error-messages">
                                        {console.log('errors', errors)}
                                        {Object.values(errors).map((error, ind) => (
                                            <div key={ind}>
                                                {error}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {editing ? (
                                    <>
                                        <div
                                            className="editable-comment"
                                            contentEditable
                                            onInput={(e) => {
                                                setNewComment(e.target.innerText)
                                                if (e.target.innerText.length <= 255) {
                                                    setErrors([])
                                                }
                                            }}
                                            // onInput={(e) => setNewComment(e.target.innerText)}
                                            dangerouslySetInnerHTML={{ __html: comment.comment }}
                                        />
                                        <div className="edit-comments-container">
                                            <button className="save-comment-button" >Save Changes</button>
                                            <button className="cancel-edit-comment-button" onClick={handleCancel}>Cancel</button>
                                        </div>
                                    </>
                                ) : (
                                    <span className="user-comment">{comment.comment}</span>
                                )}
                            </form>
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