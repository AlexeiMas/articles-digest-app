import {IUserSchema} from "@/validators/schemas/authSchema"

export interface IUserDto extends Record<"id" | "email" | "name" | "image", string> {}
export interface IUserSchemaWithId extends Record<keyof IUserSchema | "_id", string> {}

export class UserDto implements IUserDto {
  id;
  email;
  name;
  image;

  constructor(model: IUserSchemaWithId) {
    this.id = model._id
    this.email = model.email
    this.name = model.fullName
    this.image = model.avatarUrl
  }
}