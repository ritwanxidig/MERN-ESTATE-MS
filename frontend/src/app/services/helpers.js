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

export const UpdateEndpoint = (builder, query) => {
  return builder.mutation({
    query: ({ id, ...values }) => ({
      url: `${query}/${id}`,
      method: "PUT",
      body: values,
    }),
  });
};

export const DeleteEndpoint = (builder, query) => {
  return builder.mutation({
    query: (id) => ({
      url: `${query}/${id}`,
      method: "DELETE",
    }),
  });
};
