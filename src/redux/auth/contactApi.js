import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const contactApi = createApi({
  reducerPath: "contact",
  baseQuery: fetchBaseQuery({
    baseUrl: "  https://contact-app.mmsdev.site/api/v1",
  }),
  tagTypes: ["contact"],
  endpoints: (builder) => ({
    getContactUser: builder.query({
      query: ({ token, count }) => ({
        url: `/contact?page=${count}`,
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["contact"],
    }),
    getSingleContact: builder.query({
      query: ({ id, token }) => ({
        url: `/contact/${id}`,
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["contact"],
    }),
    createContact: builder.mutation({
      query: ({ token, contact }) => ({
        url: "/contact",
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
        body: contact,
      }),
      invalidatesTags: ["contact"],
    }),
    updateContact: builder.mutation({
      query: ({ token, newData }) => ({
        url: `/contact/${newData?.id}`,
        method: "PUT",
        headers: { authorization: `Bearer ${token}` },
        body: newData,
      }),
      invalidatesTags: ["contact"],
    }),
    deleteContact: builder.mutation({
      query: ({ token, id }) => ({
        url: `/contact/${id}`,
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
        body: id,
      }),
      invalidatesTags: ["contact"],
    }),
  }),
});
export const {
  useGetContactUserQuery,
  useGetSingleContactQuery,
  useUpdateContactMutation,
  useCreateContactMutation,
  useDeleteContactMutation,
} = contactApi;
