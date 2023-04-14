import {JSONSchemaType} from "ajv"

export interface IPostSchema {
  title: string
  text: string
  tags?: string[]
  viewsCount?: number
  user: {type: string, ref: string} | string
  imageUrl?: string
  comments?: {type: string, ref: string} | string[]
}

export const postSchema: JSONSchemaType<IPostSchema> = {
  type: 'object',
  properties: {
    title: {type: "string", minLength: 2},
    text: {type: "string", minLength: 10},
    tags: {type: "array", items: {type: "string"}, uniqueItems: true, nullable: true},
    viewsCount: {type: "number", nullable: true},
    user: {type: "string"},
    imageUrl: {type: 'string', format: 'uri', nullable: true},
    comments: {type: "array", items: {type: "string"}, uniqueItems: true, nullable: true},
  },
  required: ['title', 'text'],
  additionalProperties: false
}

export type TPostDataFromPage = Omit<IPostSchema, "user" | "viewsCount">