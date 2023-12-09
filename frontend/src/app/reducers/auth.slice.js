import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    currentUser: {},
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
  },
});

export const { signInFailure, signInSuccess } = authSlice.actions;
