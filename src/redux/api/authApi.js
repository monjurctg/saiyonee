import {apiSlice} from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // endpoints here

    checkEmail: builder.mutation({
      query: (data) => ({
        url: `/confirm_email_is_unique`,
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ["tasks"],
    }),
    register: builder.mutation({
      query: (data) => (
        
        {
        url: `/ApiRegister`,
        method: "POST",
        body: data,
      }),
      // invalidatesTags: [""],
    }),

    // getTasks: builder.query({
    //   query: () => "/tasks",
    //   providesTags: ["tasks"],
    // }),

    // gotoInProgress: builder.mutation({
    //   query: (id) => ({
    //     url: `/tasks/in_progress/${id}`,
    //     method: "PATCH",
    //   }),
    //   invalidatesTags: (result, error, arg) => [
    //     "tasks",
    //     {type: "tasks", id: arg.id},
    //   ],
    // }),

    // gotoComplete: builder.mutation({
    //   query: (id) => ({
    //     url: `/tasks/complete/${id}`,
    //     method: "PATCH",
    //   }),
    //   invalidatesTags: (result, error, arg) => [
    //     "tasks",
    //     {type: "tasks", id: arg.id},
    //   ],
    // }),
  }),
});

export const {useCheckEmailMutation, useRegisterMutation} = authApi;
