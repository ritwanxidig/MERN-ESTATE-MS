import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tags, QueryEndpoint, PostEndpoint } from "./helpers";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5555",
    prepareHeaders: (headers) => {
      headers.set("content-type", "application/json");
      return headers;
    },
  }),
  tagTypes: Tags,
  endpoints: (builder) => ({
    getAllUsers: QueryEndpoint(builder, "/users"),

    // auth endpoints
    login: PostEndpoint(builder, "/auth/login"),
    signUp: PostEndpoint(builder, "/auth/signUp"),
  }),
});

export const { useGetAllUsersQuery, useLoginMutation, useSignUpMutation } = api;