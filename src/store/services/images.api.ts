import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const imagesApi = createApi({
  reducerPath: 'imagesApi',
  baseQuery: fetchBaseQuery({baseUrl: process.env.API_URL}),
  endpoints: (builder) => ({
    removeImage: builder.mutation<{message: string, url?: string}, string>({
      query: (id) => ({
        url: `/api/images/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const {useRemoveImageMutation} = imagesApi