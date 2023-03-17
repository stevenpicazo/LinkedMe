import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { thunkUnfollowUser } from "../../../store/session";
import './DeleteFollowers.css'

const DeleteFollower = ({ connection, closeMenu }) => {
    const dispatch = useDispatch()
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const deleteFollower = async (e) => {
        e.preventDefault()
        await dispatch(thunkUnfollowUser(connection.id))
        setHasSubmitted(!hasSubmitted)
        closeMenu()
    }

    return (

        <div onClick={(e) => deleteFollower(e, connection.id)} className="unfollow-button">
           <i class="fa-solid fa-trash-can delete-follower-symbol"></i>
            Unfollow
        </div>

    )
}

export default DeleteFollower;