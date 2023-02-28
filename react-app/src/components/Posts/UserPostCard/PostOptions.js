import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../../OpenModalButton";
import CreateOrUpdatePost from "../CreateOrUpdatePost";
import DeletePost from "../DeletePost";
import "./PostOptions.css";

function PostOptions({ post }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const ulRef = useRef()
    const sessionUser = useSelector((state) => state.session.user)

    const openMenu = () => {
        if (showMenu) return
        setShowMenu(true)
    }

    const closeMenu = (e) => {
        setShowMenu(false)
    }

    const handleEditClick = () => {
        setIsEditing(true)
        closeMenu()
    }

    useEffect(() => {
        if (!showMenu) return

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false)
            }
        }

        document.addEventListener("click", closeMenu)

        return () => document.removeEventListener("click", closeMenu)
    }, [showMenu])

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden")

    return (
        <div>
            {post.user_id === sessionUser.id ? (
                <>
                    <i onClick={openMenu} className="fa-solid fa-ellipsis"></i>
                    <ul className={ulClassName} ref={ulRef}>
                        <div className="post-options-container">
                            <OpenModalButton
                                modalComponent={
                                    <CreateOrUpdatePost post={post} isEditing={isEditing} />
                                }
                                buttonText="Edit"
                                className="open-edit-post-button"
                                onClick={handleEditClick}
                            />
                            <DeletePost post={post} closeMenu={closeMenu} />
                        </div>
                    </ul>
                </>
            ) : null}
        </div>
    );
}

export default PostOptions;
