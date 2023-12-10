import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Tags,
  QueryEndpoint,
  PostEndpoint,
  UpdateEndpoint,
  DeleteEndpoint,
} from "./helpers";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5555",
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("content-type", "application/json");
      return headers;
    },
  }),
  tagTypes: Tags,
  endpoints: (builder) => ({
    getAllUsers: QueryEndpoint(builder, "/users"),

    // auth endpoints
    login: PostEndpoint(builder, "/auth/signIn"),
    signUp: PostEndpoint(builder, "/auth/signUp"),
    signWithGoogle: PostEndpoint(builder, "/auth/google"),

    // users endpoint
    updateUser: UpdateEndpoint(builder, "/users"),
    updateUserAvatar: UpdateEndpoint(builder, "/users/updateAvatar"),
    deleteUser: DeleteEndpoint(builder, "/users"),
  }),
});

export const {
  // hooks for auth
  useLoginMutation,
  useSignUpMutation,
  useSignWithGoogleMutation,

  // hooks for users
  useGetAllUsersQuery,
  useUpdateUserAvatarMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = api;
