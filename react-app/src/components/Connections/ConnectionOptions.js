import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteConnection from "./DeleteConnection";

const ConnectionOptions = ({ connection }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const sessionUser = useSelector((state) => state.session.user);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true)
    }

    const closeMenu = (e) => {
        setShowMenu(false)
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
        <div className='connection-options-container'>
            <i onClick={openMenu} class="fa-solid fa-ellipsis connection-options"></i>
            <div className={ulClassName} ref={ulRef}>
                <DeleteConnection connection={connection} closeMenu={closeMenu}/>
            </div>
        </div>
    )
}


export default ConnectionOptions;

