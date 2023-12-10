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
    updateUserSuccess(state, action) {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateAvatar(state, action) {
      state.currentUser.avatar = action.payload.avatar;
    },
    signOut(state, action) {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
      window.location.reload();
    },
  },
});

export const {
  signInFailure,
  signInSuccess,
  updateUserSuccess,
  updateAvatar,
  signOut,
} = authSlice.actions;
