import {createSlice} from "@reduxjs/toolkit"

const initialState: Record<"posts" | "tags", {items: string[], status: string}> = {
  posts: {
    items: [],
    status: 'loading'
  },
  tags: {
    items: [],
    status: 'loading'
  }
}

const PostSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {

  }
})

export const PostsActions = PostSlice.actions
export const postsReducer = PostSlice.reducer