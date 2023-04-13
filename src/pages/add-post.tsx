import React from 'react'
import "easymde/dist/easymde.min.css"
import {useCreatePostMutation} from "@/store/services/posts.api"
import {TPostDataFromPage} from "@/validators/schemas/postSchema"
import {withRouter} from "next/router"
import PostContainer from "@/containers/PostContainer"
import {TRouter} from "@/types/general"

const AddPost = ({router: {push}}: TRouter) => {
  const [createPost] = useCreatePostMutation()

  const onSubmitHandler = (fields: TPostDataFromPage) => {
    createPost(fields).then(res => {
      if ('data' in res) {
        res.data.postId && push(`/posts/${res.data.postId}`)
      }
    })
  }

  return (
    <>
      <PostContainer onSubmitHandler={onSubmitHandler}/>
    </>
  )
}

export default withRouter(AddPost)