import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdatePostModal from "../UpdatePost/UpdatePostModal";
import './PostOptions.css'

function PostOptions() {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
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
    // const closeMenu = () => setShowMenu(false);

    return (

        <div>
            <i onClick={openMenu} class="fa-solid fa-ellipsis"></i>
            <ul className={ulClassName} ref={ulRef}>
                <div className="post-options-container">
                    <UpdatePostModal />
                    <div>Delete</div>
                </div>
            </ul>
        </div>

    );
}

export default PostOptions;
