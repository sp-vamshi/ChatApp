import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebar: {
        open: false,
        type: "CONTACT", // can be CONTACT, STARRED, SHARED
    },
    snackBar: {
        open: null,
        message: null,
        severity: null
    }
}

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleSideBar(state, action) {
            state.sidebar.open = !state.sidebar.open
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
        }

    }
})

export default slice.reducer;

export function ToggleSideBar() {
    return async (dispatch, getState) => {
        dispatch(slice.actions.toggleSideBar())
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