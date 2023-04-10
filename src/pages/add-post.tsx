import React from 'react'
import "easymde/dist/easymde.min.css"
import {useCreatePostMutation} from "@/store/services/posts.api"
import {TPostDataForPage} from "@/validators/schemas/postSchema"
import {NextRouter, withRouter} from "next/router"
import PostContainer from "@/containers/PostContainer"

const AddPost = ({router: {push}}: { router: NextRouter }) => {
  const [createPost] = useCreatePostMutation()

  const onSubmitHandler = (fields: TPostDataForPage) => {
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