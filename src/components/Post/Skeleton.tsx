import React from 'react'
import {Box, Skeleton, Stack} from "@mui/material"

const PostSkeleton = () => {
  return (
    <Box bgcolor={"#fff"} border={"1px solid #dedede"} borderRadius={"6px"} overflow={"hidden"} mb={"15px"}>
      <Stack spacing={1}>
        <Skeleton variant="rectangular" width="100%" height={300} />
        <Box p={"20px"}>
          <Stack direction={"row"}>
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              style={{ marginRight: 10 }}
            />
            <Stack>
              <Skeleton variant="text" width={60} height={20} />
              <Skeleton variant="text" width={100} height={15} />
            </Stack>
          </Stack>
          <Box ml={"50px"}>
            <Skeleton variant="text" width="80%" height={45} />
            <Stack direction={"row"} spacing={2}>
              <Skeleton variant="text" width={40} height={30} />
              <Skeleton variant="text" width={40} height={30} />
              <Skeleton variant="text" width={40} height={30} />
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}

export default PostSkeleton