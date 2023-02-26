import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { thunkDeleteComment, thunkLoadComments } from '../../../store/comments'
import { thunkLoadPosts } from '../../../store/posts'
import './DeleteComment.css'

const DeleteComment = ({ comment, closeMenu, post }) => {
    const dispatch = useDispatch()
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(thunkLoadComments(post.id))
            .then(() => setIsLoaded(true))
    }, [dispatch, hasSubmitted]) // refetching comments everytime hasSubmitted changes state to true

    const deleteComment = async (e) => {
        e.preventDefault()
        await dispatch(thunkDeleteComment(comment.id))
        setHasSubmitted(!hasSubmitted)
        closeMenu()
    }

    return (
        <>
            <div onClick={(e) => deleteComment(e, comment.id)} className="delete-comment">
                <i className="fa-regular fa-trash-can edit-comment-logo"></i>
                Delete
            </div>
        </>
    )
}

export default DeleteComment;