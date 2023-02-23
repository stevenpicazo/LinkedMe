
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

const initialState = {
    allPosts: {}
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_POSTS:
            const allPosts = {};
            action.payload.forEach(post => allPosts[post.id] = post)
            return {
                ...state,
                allPosts: allPosts
            }
        case CREATE_POST:
            return { ...state, allPosts: { ...state.allPosts, [action.payload.id]: action.payload, } }
        case UPDATE_POST:
            return {
                ...state, allPosts: {
                    ...state.allPosts, [action.payload.id]:
                    {
                        ...state.allPosts[action.payload.id],
                        post: action.payload.post,
                        image: action.payload.image,
                    },
                },
            }
        case DELETE_POST:
            const newPosts = { ...state.allPosts }
            delete newPosts[action.payload]
            return {
                ...state,
                allPosts: newPosts,
            }
        default:
            return state
    }
}

export default postReducer;
