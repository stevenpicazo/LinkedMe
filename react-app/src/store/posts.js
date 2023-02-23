
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
    }
}

export const thunkUpdatePost = (post) => async (dispatch) => {
    const res = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            post: post.post,
            image: post.image
        })
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(actionUpdatePost(data)) 
        return data
    }
}

export const thunkDeletePost = (post) => async (dispatch) => {
    const res = await fetch(`/api/posts/${post.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(actionDeletePost(post))
        return data
    }
}


//! Reducer

//! Reducer

const initialState = {
    allPosts: {},
}

const postReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch(action.type) {
        case LOAD_POSTS:
            for (let post of action.payload.posts) {
                newState.allPosts[post.id] = post
            }
            return newState
        case CREATE_POST:
            newState.allPosts[action.payload.id] = action.payload
            return newState
        case UPDATE_POST:
            newState.allPosts[action.payload.id] = action.payload
            return newState
        case DELETE_POST:
            delete newState.allPosts[action.payload.id]
            return newState
        default:
            return state
    }
}

export default postReducer;