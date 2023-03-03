import { thunkGetUsers } from "./session"

//! Actions
const LOAD_CONNECTIONS = 'connections/LOAD'
const CREATE_CONNECTION = 'connections/CREATE'
const DELETE_CONNECTION = 'connections/DELETE'

export const actionLoadConnections = (payload) => {
    return {
        type: LOAD_CONNECTIONS,
        payload
    }
}

export const actionCreateConnection = (payload) => {
    return {
        type: CREATE_CONNECTION,
        payload
    }
}

export const actionDeleteConnection = (payload) => {
    return {
        type: DELETE_CONNECTION,
        payload
    }
}

//! Thunks
export const thunkLoadConnections = (userId) => async (dispatch) => {
    const res = await fetch(`/api/connections/${userId}`)

    if (res.ok) {
        const data = await res.json()
        dispatch((actionLoadConnections(data)))
        return data
    }
}


export const thunkCreateConnection = (userId) => async (dispatch) => {
    const res = await fetch(`/api/connections/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(actionCreateConnection(data))
        return data
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
}


export const thunkDeleteConnection = (userId) => async (dispatch) => {
    const res = await fetch(`/api/connections/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(actionDeleteConnection(data.message))
        return data
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
}

//! Reducer
const initialState = {}

const connectionsReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export default connectionsReducer