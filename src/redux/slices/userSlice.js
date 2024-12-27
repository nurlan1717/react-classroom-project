import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  currentUser: null,
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state, action) => {
      state.users.push(action.payload);
    },
    login: (state, action) => {
      const user = state.users.find(
        (u) =>
          u.email === action.payload.email &&
          u.password === action.payload.password
      );
      if (user) {
        state.currentUser = user;
        state.isAuth = true;
      } else {
        state.isAuth = false;
      }
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuth = false;
    },
  },
});

export const { register, login, logout } = userSlice.actions;
export default userSlice.reducer;
