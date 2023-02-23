import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadPosts } from "../../../store/posts";
import './AllPosts.css'
import UserPostCard from "../UserPostCard";

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
                {Object.values(posts).map(post => (
                    <UserPostCard key={post.id} post={post} />
                ))}
            </div >
            <div className="main-page-right-side">
                RIGHT SIDE
            </div>
        </div>
    )
}

export default AllPosts;