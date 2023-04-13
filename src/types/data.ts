export interface ITagSchema {
  name: string
  posts?: string[]
}

export interface ICommentSchema {
  user: string
  text: string
}