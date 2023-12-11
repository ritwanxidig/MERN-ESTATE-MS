export const Tags = ["Users", "Listings"];

export const QueryEndpoint = (builder, query) => {
  return builder.query({
    query: () => query,
    providesTags: Tags,
  });
  
};

export const PostEndpoint = (builder, query) => {
  return builder.mutation({
    query: (body) => ({
      url: query,
      method: "POST",
      body,
    }),
    invalidatesTags: Tags,
  });
};

export const UpdateEndpoint = (builder, query) => {
  return builder.mutation({
    query: ({ id, ...values }) => ({
      url: `${query}/${id}`,
      method: "PUT",
      body: values,
    }),
    invalidatesTags: Tags,
  });
};

export const DeleteEndpoint = (builder, query) => {
  return builder.mutation({
    query: (id) => ({
      url: `${query}/${id}`,
      method: "DELETE",
    }),
    invalidateTags: Tags,
  });
};
