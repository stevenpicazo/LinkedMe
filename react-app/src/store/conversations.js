
//! Actions
const LOAD_CONVERSATION = 'conversations/LOAD'
const LOAD_CONVERSATION_BY_ID = 'conversations/LOAD_BY_ID'
const CREATE_CONVERSATION = 'conversations/CREATE'
const DELETE_CONVERSATION = 'conversations/DELETE'

export const actionLoadConvo = (payload) => {
    return {
        type: LOAD_CONVERSATION,
        payload
    }
}

export const actionLoadConvoById = (payload) => {
    return {
        type: LOAD_CONVERSATION,
        payload
    }
}


export const actionCreateConvo = (payload) => {
    return {
        type: CREATE_CONVERSATION,
        payload
    }
}

export const actionDeleteConvo = (payload) => {
    return {
        type: DELETE_CONVERSATION,
        payload
    }
}


