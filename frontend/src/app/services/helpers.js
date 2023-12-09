export const Tags = ["Users"];

export const QueryEndpoint = (builder, query) => {
  return builder.query({
    query: () => query,
    providesTags: ["Users"],
  });
};

export const PostEndpoint = (builder, query) => {
  return builder.mutation({
    query: (body) => ({
      url: query,
      method: "POST",
      body,
    }),
  });
};
