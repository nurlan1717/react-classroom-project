import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: {},
  activeUsers: [],
  selectedUser: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      const { userId, message } = action.payload;
      if (!state.messages[userId]) {
        state.messages[userId] = [];
      }
      state.messages[userId].push(message);
    },
    setActiveUsers: (state, action) => {
      state.activeUsers = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setMessages, addMessage, setActiveUsers, setSelectedUser } = chatSlice.actions;
export default chatSlice.reducer;