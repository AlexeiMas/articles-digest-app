import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {IPost} from "@/components/Post"
import {IPostSchema} from "@/validators/schemas/postSchema"

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
    }),
    createPost: builder.mutation<{message: string, postId?: string}, Omit<IPostSchema, "user">>({
      query: (data) => ({
        url: `/api/posts`,
        method: 'POST',
        body: data
      })
    })
  })
})

export const {useGetAllPostsQuery, useGetPostByIdQuery, useCreatePostMutation} = postsApi