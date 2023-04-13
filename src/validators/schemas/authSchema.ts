import {JSONSchemaType} from "ajv"

export interface IUserSchema {
  email: string
  password: string
  fullName: string
  avatarUrl: string
}

export type TUserLogin = Pick<IUserSchema, "email" | "password">

export const registerSchema: JSONSchemaType<IUserSchema> = {
  type: 'object',
  properties: {
    email: {type: 'string', format: 'email'},
    password: {type: 'string', format: 'password', minLength: 3},
    fullName: {type: 'string', minLength: 3},
    avatarUrl: {type: 'string', format: 'uri'}
  },
  required: ['email', 'password', 'fullName'],
  additionalProperties: false
}

export const loginSchema: JSONSchemaType<TUserLogin> = {
  type: 'object',
  properties: {
    email: {type: 'string', format: 'email'},
    password: {type: 'string', format: 'password', minLength: 3}
  },
  required: ['email', 'password'],
  additionalProperties: false
}
