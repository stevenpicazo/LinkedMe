import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { thunkDeleteConnection, thunkLoadConnections } from "../../store/connections";

const DeleteConnection = ({ connection, closeMenu }) => {
    const dispatch = useDispatch()
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    // console.log('c', connection)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(thunkLoadConnections(user.id))
            .then(() => setIsLoaded(true))
        return () => {
        }
    }, [dispatch, hasSubmitted])

    const deleteConnection = async (e) => {
        e.preventDefault()
        await dispatch(thunkDeleteConnection(connection.id))
        setHasSubmitted(!hasSubmitted)
        closeMenu()
    }

    return (

        <button onClick={(e) => deleteConnection(e, connection.id)} className="delete-connection-button">
            <i className="fa-regular fa-trash-can edit-comment-logo delete-connection-symbol"></i>
            Remove Connection
        </button>

    )
}

export default DeleteConnection;