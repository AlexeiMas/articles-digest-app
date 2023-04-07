import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {IPost} from "@/components/Post"

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({baseUrl: process.env.API_URL}),
  // refetchOnFocus: true,
  endpoints: (builder) => ({
    getAllPosts: builder.query<IPost[], void>({
      query: () => ({
        url: `/api/posts`,
      })
    }),
    getPostById: builder.query<IPost, string>({
      query: (id: string) => ({
        url: `/api/posts/${id}`,
      })
    })
  })
})

export const {useGetAllPostsQuery, useGetPostByIdQuery} = postsApi