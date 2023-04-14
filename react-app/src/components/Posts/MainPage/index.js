import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadPosts } from "../../../store/posts";
import './MainPage.css';
import UserPostCard from "../UserPostCard";
import CreateOrUpdatePost from "../CreateOrUpdatePost";
import AppInfo from "./AppInfo";
import OpenModalButton from "../../OpenModalButton";
import ReactSwitch from "react-switch";

const AllPosts = ({ theme, toggleTheme }) => {
    const dispatch = useDispatch();
    const [showCreatePost, setShowCreatePost] = useState(false);

    const user = useSelector(state => state.session.user)
    const posts = useSelector(state => state.posts?.allPosts)


    useEffect(() => {
        dispatch(thunkLoadPosts())
    }, [dispatch])

    const handleCreatePost = () => {
        setShowCreatePost(false);
    }

    const handleUpdatePost = () => {
        setShowCreatePost(true);
    }

    return (
        <div className="main-page-container">
            <div className="main-page-left-side-container">
                <div className="about-me-container">
                    <img className="about-me-background-img" src={user.background_picture} />
                    <img className="about-me-profile-pic" src={user.profile_picture} />
                    <span className="about-me-firstname">{user.first_name}</span>
                    <span className="about-me-occupation">{user.occupation}</span>
                    <div className="about-me-bio">Passionate in my field & dedicated to excellence and innovation!</div>
                </div>
                <div className="socials-container">
                    <div className="socials-title">Connect with me!</div>
                    <div className="mainpage-github">
                        <div className="linkedin-text" onClick={() => window.open("https://www.linkedin.com/in/steven-picazo-994042225", "_blank")} >
                            LinkedIn
                        </div>
                        <div class='github-text' onClick={() => window.open('https://github.com/stevenpicazo')}>
                            GitHub
                        </div>
                    </div>
                </div>
                <div className="switch">
                    <label> {theme === "light" ? "Light Mode" : "Dark Mode"}</label>
                    <ReactSwitch className="reactswitch" onChange={toggleTheme} checked={theme === "light"} />
                </div>
            </div>
            <div className="main-page-feed">
                <div className="create-post-container">
                    {!showCreatePost && (
                        <div className="post-prof-pic-container">
                            <img className="profile-image" src={user.profile_picture} />
                            <OpenModalButton
                                modalComponent={<CreateOrUpdatePost />}
                                buttonText="Start a post"
                                className="create-post-button"
                                onModalClose={() => setShowCreatePost(false)}
                            />
                        </div>
                    )}
                    {showCreatePost && (
                        <CreateOrUpdatePost handleCreatePost={handleCreatePost} handleUpdatePost={handleUpdatePost} />
                    )}
                </div>
                <div className="feed-border"></div>

                {Object.values(posts).reverse().map((post) => (
                    <UserPostCard post={post} key={`user-post-card-${post.id}`} />
                ))}
            </div>
            <AppInfo />
        </div>
    )
}

export default AllPosts;
