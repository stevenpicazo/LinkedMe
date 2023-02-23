import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadPosts } from "../../../store/posts";
import './AllPosts.css'
import UserPostCard from "../UserPostCard";
import CreatePost from "../CreatePost";

const AllPosts = () => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)

    const posts = useSelector(state => state.posts?.allPosts)

    useEffect(() => {
        dispatch(thunkLoadPosts())
        // .then(() => setIsLoaded(true))
    }, [dispatch])

    return (
        <div className="main-page-container">
            <div className="about-me-container">
                ABOUT ME
            </div>
            <div className="main-page-feed">
                <div className="create-post-container">
                    <CreatePost />
                </div>
                {Object.values(posts).map((post) => (
                    <React.Fragment key={post.id} >
                        <UserPostCard post={post} key={`user-post-card-${post.id}`} />
                    </React.Fragment>
                ))}
            </div>
            <div className="main-page-right-side">
                RIGHT SIDE
            </div>
        </div>
    )
}

export default AllPosts;