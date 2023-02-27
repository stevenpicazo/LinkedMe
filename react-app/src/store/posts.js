
//! Actions

const LOAD_POSTS = 'posts/LOAD'
const CREATE_POST = 'posts/CREATE'
const UPDATE_POST = 'posts/UPDATE'
const DELETE_POST = 'posts/DELETE'

export const actionLoadPosts = (payload) => {
    return {
        type: LOAD_POSTS,
        payload
    }
}

export const actionCreatePost = (payload) => {
    return {
        type: CREATE_POST,
        payload
    }
}

export const actionUpdatePost = (payload) => {
    return {
        type: UPDATE_POST,
        payload
    }
}

export const actionDeletePost = (payload) => {
    return {
        type: DELETE_POST,
        payload
    }
}

//! Thunks
export const thunkLoadPosts = () => async (dispatch) => {
    const res = await fetch('/api/posts/')

    if (res.ok) {
        const data = await res.json()
        dispatch((actionLoadPosts(data)))
        return data
    }
}

export const thunkCreatePost = (post) => async (dispatch) => {
    const res = await fetch('/api/posts/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(actionCreatePost(data))
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

export const thunkUpdatePost = (post, postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(post)
    });

    if (res.ok) {
        const data = await res.json()
        dispatch(actionUpdatePost(data))
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error occurred. Please try again.'];
    }
}

export const thunkDeletePost = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(actionDeletePost(data.message))
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

const initialState = {
    allPosts: {}
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_POSTS:
            const allPosts = {}
            action.payload.forEach(post => allPosts[post.id] = post)
            return { ...state, allPosts: allPosts }
        case CREATE_POST:
            return { ...state, allPosts: { ...state.allPosts, [action.payload.id]: action.payload } }
        case UPDATE_POST:
            return { ...state, allPosts: { ...state.allPosts, [action.payload.id]: action.payload } }
        case DELETE_POST:
            const newState = { ...state }
            // delete state.allPosts[action.payload]
            return newState
        default:
            return state
    }
}

export default postReducer;
