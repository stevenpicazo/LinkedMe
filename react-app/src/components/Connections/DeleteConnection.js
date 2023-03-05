import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { connectionThunk, thunkGetUser } from "../../store/session";
// import { thunkDeleteConnection, thunkLoadConnections } from "../../store/connections";

const DeleteConnection = ({ connection, closeMenu }) => {
    const dispatch = useDispatch()
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    // console.log('c', connection)
    const { userId } = useParams()
    const user = useSelector(state => state.session.singleUser)
    const sessionUser = useSelector(state => state.session.user)
    

    // useEffect(() => {
    //     dispatch(thunkGetUser(userId))
    // }, [dispatch])


    // useEffect(() => {
    //     dispatch(thunkLoadConnections(user.id))
    //         .then(() => setIsLoaded(true)) 
    // }, [dispatch, hasSubmitted])

    const deleteConnection = async (e) => {
        e.preventDefault()
        await dispatch(connectionThunk(user.id))
        setHasSubmitted(!hasSubmitted)
        closeMenu()
    }

    return (

        <button onClick={deleteConnection} className="delete-connection-button">
            <i className="fa-regular fa-trash-can edit-comment-logo delete-connection-symbol"></i>
            Remove Connection
        </button>

    )
}

export default DeleteConnection;