import {NextApiRequest, NextApiResponse} from "next"
import withValidation from "@/validators/validate"
import {IUserSchema, registerSchema} from "@/validators/schemas/authSchema"
import dbConnect from "@/lib/dbConnect"
import UserService from "@/services/UserService"
import {ApiError} from "@/extensions/ApiError"
import {MongoError} from "mongodb"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()

  const {method} = req

  switch (method) {
    case 'POST':
      try {
        const {email, password, fullName, avatarUrl} = req.body as IUserSchema
        await UserService.registration({email, password, fullName, avatarUrl})

        res.status(200).json({success: true, message: "You're registered successfully. Log in, please."})
      } catch (e) {
        const {status, message} = ApiError.InternalServerError((e as MongoError).message || "Something went wrong, you ain't registered")
        res.status(status).json({success: false, message})
      }
      break
    default:
      const {status, message} = ApiError.MethodNotAllowed()
      res.status(status).json({success: false, message})
  }
}

export default withValidation<IUserSchema>(registerSchema, handler)