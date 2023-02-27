import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadPosts } from "../../../store/posts";
import './MainPage.css';
import UserPostCard from "../UserPostCard";
import CreateOrUpdatePost from "../CreateOrUpdatePost";
import AppInfo from "./AppInfo";

const AllPosts = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const [showCreatePost, setShowCreatePost] = useState(false);

    const user = useSelector(state => state.session.user)
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
                <img className="about-me-background-img" src="https://cdn.shopify.com/s/files/1/0066/4574/3686/files/Finance_LinkedIn_Background_Photo.png?v=1627912020" />
                <img className="about-me-profile-pic" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png" />
                <span className="about-me-firstname">{user.first_name}</span>
                <span className="about-me-occupation">{user.occupation}</span>
                <div className="about-me-bio">Passionate in my field & dedicated to excellence and innovation!</div>
            </div>
            <div className="main-page-feed">
                <div className="create-post-container">
                    {!showCreatePost && (
                        <button onClick={handleCreatePost}>Create Post</button>
                    )}
                    {showCreatePost && (
                        <CreateOrUpdatePost handleCreatePost={handleCreatePost} handleUpdatePost={handleUpdatePost} />
                    )}
                </div>

                {Object.values(posts).map((post) => (
                    <UserPostCard post={post} key={`user-post-card-${post.id}`} />
                ))}
            </div>
            <AppInfo />
        </div>
    )
}

export default AllPosts;
