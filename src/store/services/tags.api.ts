import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {IPost} from "@/components/Post"

export const tagsApi = createApi({
  reducerPath: 'tagsApi',
  baseQuery: fetchBaseQuery({baseUrl: process.env.API_URL}),
  // refetchOnFocus: true,
  endpoints: (builder) => ({
    getPopularTags: builder.query<string[], void>({
      query: () => ({
        url: `/api/tags`
      })
    }),
    getPostsByTagName: builder.query<IPost[], string>({
      query: (name) => ({
        url: `/api/tags/${encodeURI(name)}`
      })
    })
  })
})

export const {useGetPopularTagsQuery, useLazyGetPopularTagsQuery, useGetPostsByTagNameQuery} = tagsApi