import {JSONSchemaType} from "ajv"

export interface ICommentSchema extends Record<"user" | "postId", {type: string, ref: string} | string>{
  text: string
}

export const commentSchema: JSONSchemaType<ICommentSchema> = {
  type: 'object',
  properties: {
    text: {type: "string"},
    user: {type: "string"},
    postId: {type: "string"}
  },
  required: ["text", "postId"],
  additionalProperties: false
}