import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Config } from "../../constant/Index";

export const DZapi = createApi({
  reducerPath: "DZapi",
  baseQuery: fetchBaseQuery({
    baseUrl: Config.serverUrl,
    prepareHeaders: async (headers, { getState, endpoint }) => {
      headers.set("Accept", "application/json");
      // headers.set("Accept", "text/plain");
      headers.set('Content-Type', 'application/json');

      return headers;
    },
  }),

  //******************Products api******************//

  endpoints: (builder) => ({
    getAllUserHomes: builder.query({
      query: (id) => `Homes`,
    }),
    addHome: builder.mutation({
      query: (pro) => ({
        url:  `Homes/`,
        method: "POST",
        body: pro.data,
      })
    }),
    updateHome: builder.mutation({
      query: (pro) => ({
        url:  `Homes/${pro.userId}`,
        method: "PUT",
        body: pro.data,
      })
    }),
    deleteHome: builder.mutation({
      query: (id) => ({
        url: `Homes/${id}`,
        method: "DELETE",
      }),
    }),
    roomAdd: builder.mutation({
      query: (pro) => ({
        url:  `roomProfiles/add/${pro.userId}`,
        method: "POST",
        body: pro.data,
      })
    }),
    roomUpdate: builder.mutation({
      query: (body) => ({
        url:  `roomProfiles/modify`,
        method: "PUT",
        body: body,
      }),
    }),
    removeRoom: builder.mutation({
      query: (id) => ({
        url: `roomProfiles/remove/${id}`,
        method: "DELETE",
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: `users/login?email=${body.email}&password=${body.password}`,
      }),
    }),
    signup: builder.mutation({
      query: (body) => ({
        url: `users/signup`,
        method: "POST",
        body: body,
      }),
    })
  }),
});

export const {
  useGetAllUserHomesQuery,
  useAddHomeMutation,
  useUpdateHomeMutation,
  useDeleteHomeMutation,
  useRoomAddMutation,
  useRoomUpdateMutation,
  useRemoveRoomMutation,
  useLoginMutation,
  useSignupMutation
} = DZapi;
