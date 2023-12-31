import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Tags,
  QueryEndpoint,
  PostEndpoint,
  UpdateEndpoint,
  DeleteEndpoint,
  QueryParamEndpoint,
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
    // auth endpoints
    login: PostEndpoint(builder, "/auth/signIn"),
    signUp: PostEndpoint(builder, "/auth/signUp"),
    signWithGoogle: PostEndpoint(builder, "/auth/google"),
    signOut: PostEndpoint(builder, "/auth/signOut"),

    // users endpoint
    getAllUsers: QueryEndpoint(builder, "/users"),
    updateUser: UpdateEndpoint(builder, "/users"),
    updateUserAvatar: UpdateEndpoint(builder, "/users/updateAvatar"),
    deleteUser: DeleteEndpoint(builder, "/users"),
    getSingleUser: QueryParamEndpoint(builder, "/users"),

    // listings endpoint
    getAllListings: QueryEndpoint(builder, "/listings"),
    getUserListings: QueryEndpoint(builder, "/listings/user-listings"),
    getSearchListings: QueryParamEndpoint(builder, "/listings"),
    getSingleListing: QueryParamEndpoint(builder, "/listings"),
    createListing: PostEndpoint(builder, "/listings"),
    updateListing: UpdateEndpoint(builder, "/listings"),
    deleteListing: DeleteEndpoint(builder, "/listings"),
  }),
});

export const {
  // hooks for auth
  useLoginMutation,
  useSignUpMutation,
  useSignWithGoogleMutation,
  useSignOutMutation,

  // hooks for users
  useGetAllUsersQuery,
  useUpdateUserAvatarMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetSingleUserQuery,

  // hoooks for listings
  useCreateListingMutation,
  useUpdateListingMutation,
  useGetAllListingsQuery,
  useGetUserListingsQuery,
  useGetSingleListingQuery,
  useDeleteListingMutation,
  useGetSearchListingsQuery,
} = api;
