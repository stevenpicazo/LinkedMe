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
    }, [dispatch, hasSubmitted])

    const deletePost = async (e) => {
        e.preventDefault()
        await dispatch(thunkDeletePost(post.id))
        setHasSubmitted(true)
        closeMenu()
    }

    return (
        <>
            <button
                onClick={(e) => deletePost(e, post.id)}
                className='delete-post-button'> Delete
            </button>
        </>
    )
}

export default DeletePost;