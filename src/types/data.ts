import {IUserSchemaWithId} from "@/dtos/UserDto"

export interface ITagSchema {
  name: string
  posts?: string[]
}

export interface IUserBase extends Pick<IUserSchemaWithId, "fullName" | "avatarUrl" | "_id"> {}
export interface ICommentBase extends IUserBase {
  text: string
  postId?: string
}