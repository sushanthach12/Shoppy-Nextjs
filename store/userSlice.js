import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

//basucalliy enums but enums are present in js

import UserConstants from "../constants/userConstants";
import User from "../models/User";

const initialState = {
    user: { name: "", email: "", token: "", isAdmin: false },
    isAuthenticated: false,
    status: ""
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user= action.payload
            state.isAuthenticated = true
        },
        register: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true
        },
        logout: (state, action) => initialState,
        loadUser: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true
        },
        setStatus: (state, action) => {
            state.status = action.payload
        }
    }
})

export const { login, register, logout, loadUser, setStatus } = userSlice.actions

export default userSlice.reducer

//Thunk to make the api calls

export const handleLogin = (credentials) => {
    return async (dispatch, getState) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            })

            const response = await res.json()

            if (response.Success) {
                let user = {
                    name : response.User.name,
                    email : response.User.email,
                    token: response.AuthToken,
                    isAdmin: response.User.isAdmin
                }

                dispatch(setStatus(UserConstants.LOGIN_SUCCESS))
                dispatch(login(user))
            }


        } catch (error) {
            dispatch(setStatus(UserConstants.LOGIN_FAIL))
        }
    }
}

export const handleRegister = (credentials) => {
    return async (dispatch, getState) => {
        try {

            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            })

            const response = await res.json()

            if (response.Success) {
                dispatch(setStatus(UserConstants.REGISTER_USER_SUCCESS))
                const user = {
                    name: credentials.name,
                    email: credentials.email,
                    token: response.AuthToken
                }
                dispatch(register(user))
            }

        } catch (error) {
            dispatch(setStatus(UserConstants.REGISTER_USER_FAIL))
        }
    }
}
export const handleLogout = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(logout())
            dispatch(setStatus(UserConstants.USER_LOGGEDOUT_TRUE))

        } catch (error) {
            dispatch(setStatus(UserConstants.USER_LOGGEDOUT_FALSE))
        }
    }
}


