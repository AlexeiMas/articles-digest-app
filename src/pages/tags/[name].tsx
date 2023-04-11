import React, {useMemo} from 'react'
import {withRouter} from "next/router"
import {TRouter} from "@/types/general"
import Head from "next/head"
import {Grid, Typography} from "@mui/material"
import Post from "@/components/Post"
import {useGetAllPostsQuery} from "@/store/services/posts.api"
import PostSkeleton from "@/components/Post/Skeleton"

const Tags = ({router: {push, query}}: TRouter) => {
  const {name} = query as { name: string }
  const {data, isLoading} = useGetAllPostsQuery(undefined, {refetchOnMountOrArgChange: true})

  const Skeleton = useMemo(() => [...Array(5)].map((_, i) => (
      <Grid xs={12} sm={6} item key={i}>
        <PostSkeleton/>
      </Grid>
    )
  ), [])
  return (
    <>
      <Head>
        <title>Tags page</title>
        <meta name="description" content="Generated by create next app"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main>
        <Typography component={"h1"} variant={"h2"} color={"rgba(0,0,0,.5)"} mb={4}>#{name}</Typography>
        <Grid container spacing={2}>
          {isLoading ? Skeleton : data?.map((item) =>
            <Grid xs={12} sm={6} item key={item._id}>
              <Post
                _id={item._id}
                title={item.title}
                createdAt={item.createdAt}
                imageUrl={item.imageUrl}
                user={item.user}
                viewsCount={item.viewsCount}
                commentsCount={item.commentsCount}
                tags={item.tags}
              />
            </Grid>
          )}
        </Grid>
      </main>
    </>
  )
}

export default withRouter(Tags)