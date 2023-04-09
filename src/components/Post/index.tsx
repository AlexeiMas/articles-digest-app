import React from 'react'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Clear'
import EditIcon from '@mui/icons-material/Edit'
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import Image from "next/image"
import cn from "classnames"
import UserInfo from "@/components/UserInfo"
import Link from "next/link"
import styles from "./Post.module.css"
import {IUserSchemaWithId} from "@/dtos/UserDto"

export interface IPost {
  _id: string | number
  title: string
  text?: string
  createdAt: string
  imageUrl: string
  user: Pick<IUserSchemaWithId, "fullName" | "avatarUrl" | "_id">
  viewsCount: number
  commentsCount: number
  tags: string[]
  isFullPost?: boolean
  isEditable?: boolean
}

const Post = (
  {
    _id,
    title,
    createdAt,
    imageUrl,
    user,
    viewsCount,
    commentsCount,
    tags,
    children,
    isFullPost,
    isEditable,
  }: React.PropsWithChildren<IPost>
) => {

  const onClickRemove = () => {
  }

  return (
    <div className={cn(styles.root, {[styles.rootFull]: isFullPost})}>
      {isEditable && (
        <div className={styles.editButtons}>
          <IconButton component={Link} href={`/posts/${_id}/edit`} color="primary">
            <EditIcon/>
          </IconButton>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon/>
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <Image
          width={630}
          height={300}
          className={cn(styles.image, {[styles.imageFull]: isFullPost})}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt}/>
        <div className={styles.indention}>
          <h2 className={cn(styles.title, {[styles.titleFull]: isFullPost})}>
            {isFullPost ? title : <Link href={`/posts/${_id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags.map((name) => (
              <li key={name}>
                <Link href={`/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon/>
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon/>
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Post