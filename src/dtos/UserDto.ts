import {IUserSchema} from "@/validators/schemas/authSchema"

export class UserDto {
  id: string
  email: string;
  name: string;
  image: string;

  constructor(model: Record<keyof IUserSchema, string> & {_id: string}) {
    this.id = model._id
    this.email = model.email
    this.name = model.fullName
    this.image = model.avatarUrl
  }
}