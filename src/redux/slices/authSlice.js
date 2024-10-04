import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  sessionTimedout: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.sessionTimedout = false
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.sessionTimedout = true
    }
  }
})
export const { login, logout } = authSlice.actions;
export default authSlice.reducer