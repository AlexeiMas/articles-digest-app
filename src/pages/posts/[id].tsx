import React from 'react'
import Post from "@/components/Post"
import CommentsBlock from "@/components/CommentsBlock"
import AddComment from "@/components/AddComment"
import {Typography} from "@mui/material"
import {NextRouter, withRouter} from "next/router"
import {useGetPostByIdQuery} from "@/store/apis/posts.api"
import PostSkeleton from "@/components/Post/Skeleton"

const FullPost = ({router: {query}}: { router: NextRouter }) => {
  const {id} = query as {id: string}
  const {data, isLoading} = useGetPostByIdQuery(id, {skip: !id, refetchOnMountOrArgChange: true})

  if (isLoading || !data) {
    return <PostSkeleton/>
  }

  return (
    <>
      <Post
        _id={data._id}
        title={data.title}
        imageUrl={data.imageUrl}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.commentsCount}
        tags={data.tags}
        isFullPost
      >
        <Typography paragraph>
          {data.text}
        </Typography>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "User First",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "This is test comment 555555",
          },
          {
            user: {
              fullName: "User Second",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <AddComment/>
      </CommentsBlock>
    </>
  )
}

export default withRouter(FullPost)