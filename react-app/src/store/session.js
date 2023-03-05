// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const GET_USER = "session/GET_USER"
const GET_USERS = "session/GET_USERS"
const EDIT_USER = "session/EDIT_USER"
const LOAD_CONNECTIONS = 'connections/LOAD'
const CREATE_CONNECTION = 'connections/CREATE'
const DELETE_CONNECTION = 'connections/DELETE'


const setUser = (user) => ({
	type: SET_USER,
	payload: user
});

const removeUser = () => ({
	type: REMOVE_USER
});

const getUser = (user) => ({
	type: GET_USER,
	payload: user
})

const getUsers = (user) => ({
	type: GET_USERS,
	payload: user
})

const editUser = (user) => ({
	type: EDIT_USER,
	payload: user
})

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


export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, email, password, firstName, lastName, occupation, profilePic) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
			first_name: firstName,
			last_name: lastName,
			occupation,
			profile_picture: profilePic
		}),
	});

	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		} else {
			dispatch(setUser(data));
			return null;
		}
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const thunkGetUser = (userId) => async (dispatch) => {
	const res = await fetch(`/api/users/${userId}`)

	if (res.ok) {
		const data = await res.json()
		dispatch(getUser(data))
		return data
	}
}


export const thunkGetUsers = () => async (dispatch) => {
	const res = await fetch(`/api/users/`)

	if (res.ok) {
		const data = await res.json()
		dispatch(getUsers(data))
		return data
	}
}


export const thunkEditUser = (userId, userInfo) => async (dispatch) => {
	const res = await fetch(`/api/users/${userId}/edit`, {
		method: "PUT",
		headers: {
			"content-type": "application/json"
		},
		body: JSON.stringify(userInfo)
	})

	if (res.ok) {
		const data = await res.json()
		dispatch(editUser(data))
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data;
		}
	} else {
		return ['An error occurred. Please try again.'];
	}

}

//! Connection Thunks

export const thunkLoadConnections = (userId) => async (dispatch) => {
	const res = await fetch(`/api/connections/${userId}`)
	if (res.ok) {
		const data = await res.json()
		dispatch(actionLoadConnections(data))
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
	}
}

export const thunkDeleteConnection = (id) => async (dispatch) => {
	const res = await fetch(`/api/connections/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		}
	})
	if (res.ok) {
		const data = await res.json()
		dispatch(actionDeleteConnection(data))
		return data
	}
}


const initialState = { user: null, connections: []}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload }
		case REMOVE_USER:
			return { user: null }
		case GET_USER:
			return { ...state, singleUser: action.payload }
		case GET_USERS:
			return { ...state, allUsers: action.payload }
		case EDIT_USER:
			return { ...state, singleUser: action.payload }
		case LOAD_CONNECTIONS:
			const connections = {}
			action.payload.forEach(connects => connections[connects.id] = connects)
			return { ...state, connections: connections.undefined }
		case CREATE_CONNECTION:
			return { ...state, connections: { ...state.connections, [action.payload.id]: action.payload } }
		case DELETE_CONNECTION:
		default:
			return state
	}
}