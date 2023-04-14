import {IUserSchema, TUserLogin} from "@/validators/schemas/authSchema"
import User from "@/models/User"
import {ApiError} from "@/extensions/ApiError"
import bcrypt from "bcrypt"
import {UserDto} from "@/dtos/UserDto"

class UserService {
  async registration({...args}: IUserSchema) {
    const candidate = await User.findOne({email: args.email})
    if (candidate) {
      throw ApiError.BadRequest(`User with the same email ${args.email} is already exists!`)
    }
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(args.password, salt)

    const userDoc = new User<IUserSchema>({
      ...args,
      password: passwordHash,
    })
    const user = await userDoc.save()

    return {
      user
    }
  }

  async login({email, password}: TUserLogin) {
    const user = await User.findOne({email})
    if (!user) {
      throw ApiError.BadRequest('Wrong email or password')
    }
    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw ApiError.BadRequest('Wrong email or password')
    }
    const userDto = new UserDto(user)

    return {
      user: userDto
    }
  }
}

export default new UserService()