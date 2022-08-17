import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
/* @reduxjs/toolkit/query/react is a react-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */

// RTK Query includes these APIs:
// createApi(): The core of RTK Query's functionality. It allows you to define a set of endpoints describe how to retrieve data from a series of endpoints, including configuration of how to fetch and transform that data. In most cases, you should use this once per app, with "one API slice per base URL" as a rule of thumb.
// fetchBaseQuery(): A small wrapper around fetch that aims to simplify requests. Intended as the recommended baseQuery to be used in createApi for the majority of users.
// <ApiProvider />: Can be used as a Provider if you do not already have a Redux store.
// setupListeners(): A utility used to enable refetchOnMount and refetchOnReconnect behaviors.

export const apiSlice = createApi({
  reducerPath: "api", //default is 'api'
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  tagTypes: ["Todos"], // assign tag to the cache
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos", //will be attached to baseUrl
      transformResponse: (res) => res.sort((a, b) => b.id - a.id), // sort by ascending order
      providesTags: ["Todos"],
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todos"], // invalidate the cache data when this mutation is called
    }),
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH", // PUT method used when replacing full record, PATCH method used when replacing part of the record
        body: todo,
      }),
      invalidatesTags: ["Todos"], // invalidate the cache data when this mutation is called
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Todos"], // invalidate the cache data when this mutation is called
    }),
  }),
});
//RTK Query creates custom hooks based on the methods that we provide in createApi:
export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
