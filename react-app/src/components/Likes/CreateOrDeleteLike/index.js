import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkCreateLike, thunkDeleteLike } from "../../../store/likes"
import { thunkLoadPosts } from "../../../store/posts"
import './CreateLike.css'

const CreateOrDeleteLike = ({ post }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const likes = post.likes.map(like => like.user_id)

    const isLiked = likes.includes(user.id)

    const handleLike = async () => {
        if (isLiked) {
            await dispatch(thunkDeleteLike(post.id))
        } else {
            await dispatch(thunkCreateLike(post.id))
        }
        await dispatch(thunkLoadPosts())
    }

    return (
        // <>
            <button
                onClick={handleLike}
                className="create-like-button-container">
                <i className={isLiked ? "fa-solid fa-thumbs-up" : "fa-regular fa-thumbs-up"}></i>
                <span className="create-like-text">Like</span>
            </button>
        // </>
    )
}

export default CreateOrDeleteLike;