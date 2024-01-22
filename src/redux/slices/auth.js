import { createSlice } from "@reduxjs/toolkit";

import axios from "../../utils/axios";
import { showSnackBar } from "./app";

const initialState = {
    isLoggedIn: false,
    isLoading: false,
    token: "",
    email: "",
    error: false,
}

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateIsLoading(state, action) {
            state.error = action.payload.error
            state.isLoading = action.payload.isLoading
        },
        logIn(state, action) {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
        },
        signOut(state, action) {
            state.isLoggedIn = false;
            state.token = "";
        },
        updateRegisterEmail(state, action) {
            state.email = action.payload.email
        }
    }
})

// Reducer
export default slice.reducer

// Log in 

export function LoginUser(formValues) {
    return async (dispatch, getState) => {
        await axios.post("/auth/login", { ...formValues }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            dispatch(slice.actions.logIn({
                isLoggedIn: true,
                token: response.data?.token
            }))

            window.localStorage.setItem("user_id", response.data.user_id);

            dispatch(showSnackBar({ severity: "success", message: response.data.message }))

        }).catch(function (error) {
            dispatch(showSnackBar({ severity: "error", message: error.message }))

        })
    }
}


export function LogoutUser() {
    return (dispatch, getState) => {
        window.localStorage.removeItem("user_id");
        dispatch(slice.actions.signOut())

    }
}


export function ForgotPassword(formValues) {
    return async (dispatch, getState) => {
        await axios.post("/auth//fogot-password", {
            ...formValues
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            dispatch(
                showSnackBar({ severity: "success", message: response.data.message })
            );
        }).catch((error) => {
            dispatch(showSnackBar({ severity: "error", message: error.message }));
        })
    }
}

export function ResetPassword(formValues) {
    return async (dispatch, getState) => {
        await axios.post("/auth/reset-password", { ...formValues }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            dispatch(slice.actions.logIn({
                isLoggedIn: true,
                token: response.data?.token
            }))
            dispatch(
                showSnackBar({ severity: "success", message: response.data.message })
            );
        }).catch(error => {
            dispatch(showSnackBar({ severity: "error", message: error.message }));
        })
    }
}

export function RegisterUser(formValues) {

    return async (dispatch, getState) => {
        dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }))

        await axios.post("/auth/register", {
            ...formValues
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            dispatch(showSnackBar({ severity: "success", message: response.data.message }));

            dispatch(slice.actions.updateRegisterEmail({ email: formValues.email }))

            dispatch(slice.actions.updateIsLoading({ isLoading: false, error: false }))

        }).catch((error) => {
            dispatch(showSnackBar({ severity: "error", message: error.message }));
            dispatch(slice.actions.updateIsLoading({ isLoading: false, error: true }))
        }).finally(() => {
            if (!getState().auth.error) {
                window.location.href = "/auth/verify";
            }
        })
    }
}


export function VerifyEmail(formValues) {
    return async (dispatch, getState) => {
        await axios.post("/auth/verify",
            { ...formValues },
            { headers: { "Content-Type": "application/json" } }).then((response) => {

                dispatch(slice.actions.logIn({
                    isLoggedIn: true,
                    token: response.data.token
                }))

                window.localStorage.setItem("user_id", response.data.user_id);

                dispatch(showSnackBar({ severity: "success", message: response.data.message }));

            }).catch((error) => {
                dispatch(showSnackBar({ severity: "error", message: error.message }));
            })
    }
}