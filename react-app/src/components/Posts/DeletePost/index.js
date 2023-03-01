import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { thunkDeletePost, thunkLoadPosts } from '../../../store/posts'
import './DeletePost.css'

const DeletePost = ({ post, closeMenu }) => {
    const dispatch = useDispatch()
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(thunkLoadPosts())
            .then(() => setIsLoaded(true))
    }, [dispatch, hasSubmitted]) // refetching posts everytime hasSubmitted changes state to true

    const deletePost = async (e) => {
        e.preventDefault()
        await dispatch(thunkDeletePost(post.id))
        setHasSubmitted(true)
        closeMenu()
    }

    return (
        <div className='post-options-delete-container'>
            <i className="fa-regular fa-trash-can post-options-delete-symbol" ></i>
            <button
                onClick={(e) => deletePost(e, post.id)}
                className='post-options-delete'> Delete
            </button>
        </div>
    )
}

export default DeletePost;