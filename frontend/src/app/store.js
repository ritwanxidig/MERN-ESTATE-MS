import { configureStore, createStore } from "@reduxjs/toolkit";
import { api } from "./services/api";
import { authSlice } from "./reducers/auth.slice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
});

export default store;
