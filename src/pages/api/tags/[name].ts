import {NextApiRequest, NextApiResponse} from "next"
import withValidation from "@/validators/validate"
import {IPostSchema, postSchema} from "@/validators/schemas/postSchema"
import TagService from "@/services/TagService"
import {ApiError} from "@/extensions/ApiError"
import dbConnect from "@/lib/dbConnect"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()

  const {method} = req
  const {name} = req.query

  if (name) {
    switch (method) {
      case "GET":
        const decodedName = decodeURI(String(name))
        const tags = await TagService.getPostsByTagName(decodedName)
        if (tags) {
          return res.json(tags)
        }
        const {status, message} = ApiError.NotFound('Tags have not been found')
        return res.status(status).json({message})
      default:
        const {status: statusD, message: messageD} = ApiError.MethodNotAllowed()
        return res.status(statusD).json({messageD})
    }
  }
  const {status, message} = ApiError.BadRequest()
  return res.status(status).json({message})
}

export default withValidation<IPostSchema>(postSchema, handler)
