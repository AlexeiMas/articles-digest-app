import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {IPost} from "@/components/Post"
import {TPostDataFromPage} from "@/validators/schemas/postSchema"
import {TSortBy} from "@/types/general"

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({baseUrl: process.env.API_URL}),
  // refetchOnFocus: true,
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getAllPosts: builder.query<IPost[], TSortBy | undefined>({
      query: (sortBy) => ({
        url: `/api/posts`,
        params: sortBy ? {sortBy} : undefined
      }),
      providesTags: ["Posts"]
    }),
    getPostById: builder.query<Required<Omit<IPost, "isEditable" | "isFullPost">>, string>({
      query: (id) => ({
        url: `/api/posts/${id}`,
      })
    }),
    createPost: builder.mutation<{ message: string, postId?: string }, TPostDataFromPage>({
      query: (data) => ({
        url: `/api/posts`,
        method: 'POST',
        body: data
      })
    }),
    removePost: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/api/posts/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ["Posts"]
    }),
    editPost: builder.mutation<{ message: string }, { id: string, body: TPostDataFromPage }>({
      query: ({id, body}) => ({
        url: `/api/posts/${id}`,
        method: 'PATCH',
        body
      })
    }),
  })
})

export const {
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useRemovePostMutation,
  useEditPostMutation
} = postsApi