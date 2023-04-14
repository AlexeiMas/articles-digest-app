import React from 'react'
import {Stack, Typography} from "@mui/material"
import Image from "next/image"
import {IUserSchema} from "@/validators/schemas/authSchema"
import { IPost } from '../Post'

const UserInfo = ({fullName, avatarUrl, additionalText}: Pick<IUserSchema, "fullName" | "avatarUrl"> & {additionalText: IPost["createdAt"]}) => {
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Image
        width={30}
        height={30}
        src={avatarUrl || ''}
        alt={fullName}
      />
      <Stack ml={1.5}>
        <Typography variant={"body2"}>{fullName}</Typography>
        <Typography variant={"caption"} sx={{opacity: 0.6}}>{new Date(additionalText).toLocaleDateString("us-US")}</Typography>
      </Stack>
    </Stack>
  )
}

export default UserInfo