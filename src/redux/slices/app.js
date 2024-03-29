import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    sidebar: {
        open: false,
        type: "CONTACT", // can be CONTACT, STARRED, SHARED
    },
    snackBar: {
        open: null,
        message: null,
        severity: null
    },
    users: [],
    friends: [],
    friendRequests: [],
    chat_type: null,
    room_id: null,
    selectedTab: 0
}

export const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleSideBar(state, action) {
            state.sidebar.open = action.payload
        },
        UpdateSideBarType(state, action) {
            state.sidebar.type = action.payload.type;
        },
        openSnackBar(state, action) {
            state.snackBar.open = true;
            state.snackBar.severity = action.payload.severity;
            state.snackBar.message = action.payload.message;
        },
        closeSnackBar(state, action) {
            state.snackBar.open = false;
            state.snackBar.severity = null;
            state.snackBar.message = null;
        },
        updateUsers(state, action) {
            state.users = action.payload.users
        },
        updateFriends(state, action) {
            state.friends = action.payload.friends
        },
        updateFriendRequests(state, action) {
            state.friendRequests = action.payload.request;
        },
        selectConversation(state, action) {
            state.chat_type = action.payload.chat_type;
            state.room_id = action.payload.room_id
        },
        onSignOut(state, action) {
            return initialState
        },
        changeTab(state, action) {
            state.selectedTab = action.payload.tabNumber
        }

    }
})

export default slice.reducer;

export const ChangeTab = ({ tabNumber }) => {
    return (dispatch, getState) => {
        dispatch(slice.actions.changeTab({ tabNumber }))
    }
}

export const ClearApp = () => {
    return (dispatch, getState) => {
        dispatch(slice.actions.onSignOut())
    }
}

export function ToggleSideBar(isOpen) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.toggleSideBar(isOpen))
    }
}

export function UpdateSideBarType(type) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.UpdateSideBarType({
            type,
        }))
    }
}

export function showSnackBar({ severity, message }) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.openSnackBar({
            message, severity
        }));

        setTimeout(() => {
            dispatch(slice.actions.closeSnackBar());
        }, 4000)

    }
}

export function closeSnackBar() {
    return async (dispatch, getState) => {
        dispatch(slice.actions.closeSnackBar());
    }
}

export const FetchUsers = () => {
    return async (dispatch, getState) => {
        await axios.get("/user/get-users", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().auth.token}`
            }
        }).then((response) => {

            dispatch(slice.actions.updateUsers({
                users: response.data.data
            }));

        }).catch((error) => {
        })
    }
}

export const FetchFriends = () => {
    return async (dispatch, getState) => {
        await axios.get("/user/get-friends", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().auth.token}`
            }
        }).then((response) => {

            dispatch(slice.actions.updateFriends({
                friends: response.data.data
            }));

        }).catch((error) => {
        })
    }
}

export const FetchFriendRequests = () => {
    return async (dispatch, getState) => {
        await axios.get("/user/get-friend-requests", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().auth.token}`
            }
        }).then((response) => {

            dispatch(slice.actions.updateFriendRequests({
                request: response.data.data
            }));

        }).catch((error) => {
        })
    }
}

export const SelectConversation = ({ room_id, chat_type }) => {
    return (dispatch, getState) => {
        dispatch(slice.actions.selectConversation({ room_id, chat_type }))
    }
}