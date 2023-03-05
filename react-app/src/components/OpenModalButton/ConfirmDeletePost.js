import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { thunkDeletePost, thunkLoadPosts } from '../../store/posts'
import { useModal } from '../../context/Modal'

const ConfirmDeletePost = ({ post, closeMenu }) => {

    const dispatch = useDispatch()
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const { closeModal } = useModal()

    useEffect(() => {
        dispatch(thunkLoadPosts())
            .then(() => setIsLoaded(true))
    }, [dispatch, hasSubmitted]) // refetching posts everytime hasSubmitted changes state to true

    const deletePost = async (e) => {
        e.preventDefault()
        await dispatch(thunkDeletePost(post.id))
        setHasSubmitted(true)
        closeModal()
    }

    return (
        <div className="confirm-delete-container">
            <div className="confirm-delete-title">Delete post?</div>
            <div className="confirm-delete-text">
                Are you sure you want to permanently remove this post from LinkedMe?
            </div>
            <div className='confirm-border'></div>
            <div className='confirm-buttons-container'>
                <button onClick={closeModal} className='confirm-cancel-button'>
                    Cancel
                </button>

                <button className='confirm-delete-button' onClick={(e) => deletePost(e, post.id)}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default ConfirmDeletePost;