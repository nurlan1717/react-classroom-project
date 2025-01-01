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
    },
    updateTaskOn: (state, action) => {
      const taskIndex = state.tasks.findIndex(task => task.id === action.payload.id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...action.payload };
      }
    }    
  },
});

export const { setAuthStatus, setUser, logout,updateUser,updateTaskOn } = userSlice.actions;
export default userSlice.reducer;
