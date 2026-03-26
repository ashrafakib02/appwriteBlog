import { createSlice } from "@reduxjs/toolkit";

const authInitialState = 
    {
     status : false,
     userData: null,
    };

const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData ?? action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;