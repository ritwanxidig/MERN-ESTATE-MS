import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    currentUser: null,
  },
  reducers: {
    signInSuccess(state, action) {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure(state, action) {
      state.createSlice = null;
      state.loading = false;
      state.error = action.payload;
    },
    updateAvatar(state, action) {
      state.currentUser.avatar = action.payload.avatar;
    },
  },
});

export const { signInFailure, signInSuccess, updateAvatar } = authSlice.actions;
