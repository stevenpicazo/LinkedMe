
// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const GET_USER = "session/GET_USER"
const GET_USERS = "session/GET_USERS"
const EDIT_USER = "session/EDIT_USER"
const SET_LOADING = "session/SET_LOADING";
const FOLLOW_OR_UNFOLLOW = "session/FOLLOW_OR_UNFOLLOW";


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

const setLoading = (loading) => ({
	type: SET_LOADING,
	payload: loading,
})

const followOrUnfollow = (userId) => ({
	type: FOLLOW_OR_UNFOLLOW,
	payload: userId
})



const initialState = { user: null };

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
	dispatch(setLoading(true));
	const res = await fetch(`/api/users/`)

	if (res.ok) {
		const data = await res.json()
		dispatch(getUsers(data.users))
		dispatch(setLoading(false))
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

export const thunkSetUser = (user) => (dispatch) => {
	return dispatch(setUser(user))
}

export const thunkFollowUser = (userId) => async (dispatch) => {
	const res = await fetch(`/api/users/${userId}/follow`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		}
	})
	if (res.ok) {
		const user = await res.json()
		dispatch(thunkGetUser(userId))
		dispatch(thunkSetUser(user))
	}
}

export const thunkUnfollowUser = (userId) => async (dispatch) => {
	const res = await fetch(`/api/users/${userId}/unfollow`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		}
	})
	if (res.ok) {
		const user = await res.json()
		dispatch(thunkGetUser(userId))
		dispatch(thunkSetUser(user))
	}
}

export const thunkFollowOrUnfollow = (id) => async (dispatch) => {
	const res = await fetch(`/api/users/${id}/follow`, {
		method: "POST",
		headers: {
			"content-type": "application/json"
		},
	})

	if (res.ok) {
		const data = await res.json()
		dispatch(followOrUnfollow(data))
	}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case GET_USER:
			return { ...state, singleUser: action.payload }
		case GET_USERS:
			return { ...state, allUsers: action.payload }
		case SET_LOADING:
			return { ...state, loading: action.payload };
		case FOLLOW_OR_UNFOLLOW: {
			const newState = { ...state };
			newState.user.following = action.payload;
			return newState;
		}
		default:
			return state;
	}
}