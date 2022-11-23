import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    token: null,
    isAuth: false,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.isAuth = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuth = false;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;