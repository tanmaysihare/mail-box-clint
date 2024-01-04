import {createSlice} from '@reduxjs/toolkit';

const initialAuthState = {
    isSignIn : true,
    isLoggedIn : !!localStorage.getItem('token'),
    userId:  localStorage.getItem('userId') || null,
    token: localStorage.getItem('token') || null,
  };
const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        signup(state){
            state.isSignIn = !state.isSignIn;
        },
        login(state,action){
            state.isLoggedIn = true;
            state.userId = action.payload.userId;
            state.token = action.payload.token;
        },
        logout(state){
            state.isLoggedIn = false;
            state.userId = null;
            state.token = null;
        },
     }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;