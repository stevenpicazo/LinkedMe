import { thunkLoadPosts } from "./posts"

//! Actions
const LOAD_COMMENTS = 'comments/LOAD'
const CREATE_COMMENT = 'comments/CREATE'
const UPDATE_COMMENT = 'comments/UPDATE'
const DELETE_COMMENT = 'comments/DELETE'

export const actionLoadComments = (payload) => {
    return {
        type: LOAD_COMMENTS,
        payload
    }
}

export const actionCreateComment = (payload) => {
    return {
        type: CREATE_COMMENT,
        payload
    }
}

export const actionUpdateComment = (payload) => {
    return {
        type: UPDATE_COMMENT,
        payload
    }
}

export const actionDeleteComment = (payload) => {
    return {
        type: DELETE_COMMENT,
        payload
    }
}

//! Thunks
export const thunkLoadComments = (postId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${postId}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(actionLoadComments(data))
        return data
    }
}

export const thunkCreateComment = (comment, postId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${postId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(actionCreateComment(data))
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

export const thunkUpdateComment = (comment, commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(actionUpdateComment(data))
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

export const thunkDeleteComment = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(thunkLoadPosts(data))
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

//! Cases not need because we using sqlalchemy reltationship with 
//! posts to get all data related to comments.
const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export default commentReducer;