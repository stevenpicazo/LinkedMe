import { thunkLoadPosts } from "./posts"

//! Actions
const LOAD_LIKES = 'likes/LOAD'
const CREATE_LIKE = 'likes/CREATE'
const DELETE_LIKE = 'likes/DELETE'

export const actionLoadLikes = (payload) => {
    return {
        type: LOAD_LIKES,
        payload
    }
}

export const actionCreateLike = (payload) => {
    return {
        type: CREATE_LIKE,
        payload
    }
}

export const actionDeleteLike = (payload) => {
    return {
        type: DELETE_LIKE,
        payload
    }
}

//! Thunks
export const thunkLoadLikes = (postId) => async (dispatch) => {
    const res = await fetch(`/api/likes/${postId}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(actionLoadLikes(data))
        return data
    }
}

export const thunkCreateLike = (like, postId) => async (dispatch) => {
    const res = await fetch(`/api/likes/${postId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(like)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(actionCreateLike(data))
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

export const thunkDeleteLike = (likeId) => async (dispatch) => {
    const res = await fetch(`/api/likes/${likeId}`, {
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
const initialState = {
    allLikes: {}
}

//! Cases not need because we are using sqlalchemy reltationship with 
//! posts to get all data related to likes.
const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export default commentReducer;