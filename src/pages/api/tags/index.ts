import {NextApiRequest, NextApiResponse} from "next"
import withValidation from "@/validators/validate"
import {IPostSchema, postSchema} from "@/validators/schemas/postSchema"
import TagService from "@/services/TagService"
import {ApiError} from "@/extensions/ApiError"
import dbConnect from "@/lib/dbConnect"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()

  const {method} = req

  switch (method) {
    case "GET":
      const tags = await TagService.getPopularTags()
      if (tags) {
        return res.json(tags)
      }
      const {status, message} = ApiError.NotFound('Tags have not been found')
      return res.status(status).json({message})
  }
  const {status, message} = ApiError.InternalServerError()
  return res.status(status).json({message})
}

export default withValidation<IPostSchema>(postSchema, handler)
