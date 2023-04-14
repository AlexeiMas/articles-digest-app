import React from 'react'
import {Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Skeleton} from "@mui/material"
import SideBlock from "@/components/SideBlock"
import Link from "next/link"
import {ICommentBase} from "@/types/data"

export type TItems = {
  isLoading: boolean
  items: ICommentBase[]
  asLink?: boolean
}

function options(this: string | undefined) {
  return {component: Link, href: '/posts/' + this ?? ''}
}

const CommentsBlock = ({children, items, isLoading, asLink}: React.PropsWithChildren<TItems>) => {
  return (
    <SideBlock title={"Recent comments"}>
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj, index) => (
          <React.Fragment key={index}>
            <ListItem {...asLink ? options.call(obj?.postId) : {}} alignItems="flex-start">
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
                )}
              </ListItemAvatar>
              {isLoading ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <ListItemText
                  primary={obj.user.fullName}
                  secondary={obj.text}
                />
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
        {!isLoading && items.length < 1 && <ListItem><i>No comments yet</i></ListItem>}
      </List>
      {children}
    </SideBlock>
  )
}

export default CommentsBlock