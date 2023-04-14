import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {ICommentSchema} from "@/validators/schemas/commentSchema"
import {ICommentBase} from "@/types/data"

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({baseUrl: process.env.API_URL}),
  endpoints: (builder) => ({
    getRecentComments: builder.query<ICommentBase[], void>({
      query: (sortBy) => ({
        url: `/api/comments`
      })
    }),
    createComment: builder.mutation<{ message: string, commentId?: string }, Omit<ICommentSchema, "user">>({
      query: (body) => ({
        url: `/api/comments`,
        method: 'POST',
        body
      })
    })
  })
})

export const {useGetRecentCommentsQuery, useLazyGetRecentCommentsQuery, useCreateCommentMutation} = commentsApi