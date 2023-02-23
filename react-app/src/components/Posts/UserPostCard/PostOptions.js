import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "../CreatePost";
import './PostOptions.css'

function PostOptions({ post }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false)
    const ulRef = useRef();
    const sessionUser = useSelector(state => state.session.user);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };


    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <div>
            {post.user_id === sessionUser.id ?
                <>
                    <i onClick={openMenu} className="fa-solid fa-ellipsis"></i>
                    <ul className={ulClassName} ref={ulRef}>
                        <div className="post-options-container">
                            <CreatePost post={post} />
                            <div>Delete</div>
                        </div>

                    </ul>
                </>
                : null}
        </div>
    );
}


export default PostOptions;