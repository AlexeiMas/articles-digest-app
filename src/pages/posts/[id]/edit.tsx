import React from 'react'
import {useEditPostMutation, useGetPostByIdQuery} from "@/store/services/posts.api"
import {TPostDataFromPage} from "@/validators/schemas/postSchema"
import {withRouter} from "next/router"
import Loader from "@/components/UI/Loader"
import PostContainer from "@/containers/PostContainer"
import {TRouter} from "@/types/general"

const EditPost = ({router: {push, query}}: TRouter) => {
  const {id} = query as {id: string}
  const {data, isLoading} = useGetPostByIdQuery(id, {skip: !id, refetchOnMountOrArgChange: true})
  const [editPost] = useEditPostMutation()

  if (isLoading || !data) {
    return <Loader/>
  }

  const onSubmitHandler = (fields: TPostDataFromPage) => {
    editPost({id, body: fields}).then(res => {
      if ('data' in res) {
        res.data.message && push(`/posts/${id}`)
      }
    })
  }

  return (
    <>
      <PostContainer data={data} onSubmitHandler={onSubmitHandler}/>
    </>
  )
}

export default withRouter(EditPost)