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

    const ulClassName = "post-options" + (showMenu ? "" : " hidden")

    return (
        <div className="user-post-dropdown">
            {post.user_id === sessionUser.id ? (
                <>
                    <i onClick={openMenu} className="fa-solid fa-ellipsis"></i>
                    <div className={ulClassName} ref={ulRef}>
                        <div className="post-options-container">
                            <div className="post-options-edit-container">
                                <i className="fa-solid fa-pencil post-options-edit-symbol"></i>
                                <OpenModalButton
                                    modalComponent={<CreateOrUpdatePost post={post} isEditing={isEditing} />}
                                    buttonText="Edit"
                                    className="post-options-edit"
                                    onClick={handleEditClick}
                                />
                            </div>
                            <DeletePost post={post} closeMenu={closeMenu} />
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
}

export default PostOptions;
