import {IUserSchema, TUserLogin} from "@/validators/schemas/authSchema"
import User from "@/models/User"
import {ApiError} from "@/extensions/ApiError"
import bcrypt from "bcrypt"
// import TokenService from "@/services/TokenService"
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

    // const tokens = TokenService.generateTokens({
    //     _id: user._id
    //   })
    // await TokenService.saveToken(user._id, tokens.refreshToken)

    return {
      user,
      // ...tokens
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
    // const tokens = TokenService.generateTokens({...userDto})
    // await TokenService.saveToken(user._id, tokens.refreshToken)

    return {
      // ...tokens,
      user: userDto
    }
  }
}

export default new UserService()