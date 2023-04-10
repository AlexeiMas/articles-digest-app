import React from 'react'
import {useEditPostMutation, useGetPostByIdQuery} from "@/store/services/posts.api"
import {TPostDataForPage} from "@/validators/schemas/postSchema"
import {NextRouter, withRouter} from "next/router"
import Loader from "@/components/UI/Loader"
import PostContainer from "@/containers/PostContainer"

const AddPost = ({router: {push, query}}: { router: NextRouter }) => {
  const {id} = query as {id: string}
  const {data, isLoading} = useGetPostByIdQuery(id, {skip: !id, refetchOnMountOrArgChange: true})
  const [editPost] = useEditPostMutation()

  if (isLoading || !data) {
    return <Loader/>
  }

  const onSubmitHandler = (fields: TPostDataForPage) => {
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

export default withRouter(AddPost)