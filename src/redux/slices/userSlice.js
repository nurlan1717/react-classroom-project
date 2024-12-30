import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthStatus: (state, action) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuth = false;
    },
    updateUser: (state, action) => {
      if (state.currentUser && state.currentUser.id === action.payload.id) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    }
  },
});

export const { setAuthStatus, setUser, logout,updateUser } = userSlice.actions;
export default userSlice.reducer;
