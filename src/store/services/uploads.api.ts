import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const uploadsApi = createApi({
  reducerPath: 'uploadsApi',
  baseQuery: fetchBaseQuery({baseUrl: process.env.API_URL}),
  endpoints: (builder) => ({
    uploadImage: builder.mutation<{success: boolean, url: string}, FormData>({
      query: (data) => ({
        url: `/api/upload`,
        method: 'POST',
        body: data
      })
    })
  })
})

export const {useUploadImageMutation} = uploadsApi