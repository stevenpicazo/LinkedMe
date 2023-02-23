import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadPosts } from "../../../store/posts";
import './AllPosts.css'
import UserPostCard from "../UserPostCard";
import CreatePost from "../CreatePost";

const AllPosts = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const [showCreatePost, setShowCreatePost] = useState(false);

    const posts = useSelector(state => state.posts?.allPosts);

    useEffect(() => {
        dispatch(thunkLoadPosts())
    }, [dispatch])

    const handleCreatePost = () => {
        setShowCreatePost(true);
    }

    const handleUpdatePost = () => {
        setShowCreatePost(true);
    }

    return (
        <div className="main-page-container">
            <div className="about-me-container">
                ABOUT ME
            </div>
            <div className="main-page-feed">
                <div className="create-post-container">
                    {!showCreatePost && (
                        <button onClick={handleCreatePost}>Create Post</button>
                    )}
                    {showCreatePost && (
                        <CreatePost handleCreatePost={handleCreatePost} handleUpdatePost={handleUpdatePost} />
                    )}
                </div>
                {Object.values(posts).map((post) => (
                    <UserPostCard post={post} key={`user-post-card-${post.id}`} />
                ))}
            </div>
            <div className="main-page-right-side">
                RIGHT SIDE
            </div>
        </div>
    )
}

export default AllPosts;
