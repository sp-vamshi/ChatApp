import { createSlice } from "@reduxjs/toolkit";

import { dispatch } from "../store"

const initialState = {
    sidebar: {
        open: false,
        type: "CONTACT", // can be CONTACT, STARRED, SHARED

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
        }
    }
})

export default slice.reducer;

export function ToggleSideBar() {
    return async () => {
        dispatch(slice.actions.toggleSideBar())
    }
}

export function UpdateSideBarType(type) {
    return async () => {
        dispatch(slice.actions.UpdateSideBarType({
            type,
        }))
    }
}