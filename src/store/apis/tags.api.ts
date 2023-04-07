import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const tagsApi = createApi({
  reducerPath: 'tagsApi',
  baseQuery: fetchBaseQuery({baseUrl: process.env.API_URL}),
  // refetchOnFocus: true,
  endpoints: (builder) => ({
    getLastTags: builder.query<string[], void>({
      query: () => ({
        url: `/api/tags`
      })
    })
  })
})

export const {useGetLastTagsQuery} = tagsApi