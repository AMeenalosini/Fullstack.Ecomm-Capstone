import { createSlice } from "@reduxjs/toolkit";

export const defaultState = {
  message: "",
  token: "",
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState: defaultState,
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.message = action.payload.message;
      state.user = action.payload.user;
    },
  },
});

export const { setUser } = userSlice.actions;

export const getRUserDetails = (state) => state.user;

export const getRUserId = (state) => state.user.user.id;

export const getToken = (state) => state.user.token;

export default userSlice.reducer;