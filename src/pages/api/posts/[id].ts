import {NextApiRequest, NextApiResponse} from "next"
import {ApiError} from "@/extensions/ApiError"
import PostService from "@/services/PostService"
import withValidation from "@/validators/validate"
import {IPostSchema, postSchema} from "@/validators/schemas/postSchema"
import dbConnect from "@/lib/dbConnect"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()

  const {method} = req
  const {id} = req.query

  if (id) {
    switch (method) {
      case "GET":
        return PostService.getOne(String(id))
          .then(doc => res.json(doc))
          .catch(err => res.status(err.status).json({message: err.message}))
      case "DELETE":
        return PostService.remove(String(id))
          .then(doc => res.json({message: "Post was removed successfully"}))
          .catch(err => res.status(err.status).json({message: err.message}))
      case "PATCH":
        const {body} = req
        return PostService.update({id: String(id), ...body})
          .then(doc => res.json({message: "Post was updated successfully"}))
          .catch(err => res.status(err.status).json({message: err.message}))
      default:
        const {status, message} = ApiError.MethodNotAllowed()
        return res.status(status).json({message})
    }
  }
  const {status, message} = ApiError.BadRequest()
  return res.status(status).json({message})
}

export default withValidation<IPostSchema>(postSchema, handler)
