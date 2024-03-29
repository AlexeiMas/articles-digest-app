import {NextApiRequest, NextApiResponse} from "next"
import withValidation, {TNextApiReqWithId} from "@/validators/validate"
import {IPostSchema, postSchema} from "@/validators/schemas/postSchema"
import PostService from "@/services/PostService"
import {ApiError, IApiError} from "@/extensions/ApiError"
import dbConnect from "@/lib/dbConnect"
import {TSortBy} from "@/types/general"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()

  const {method} = req

  switch (method) {
    case "GET":
      const sortBy: TSortBy = req.query.sortBy === "viewsCount" ? "viewsCount" : "createdAt"
      const posts = await PostService.getAll(sortBy)
      if (posts) {
        return res.json(posts)
      }
      const {status, message} = ApiError.NotFound('Posts have not been found')
      return res.status(status).json({message})
    case "POST":
      try {
        const {user} = req as TNextApiReqWithId
        const postId = await PostService.create({...req.body, user})
        return res.json({ message: 'The post was created successfully', postId })
      } catch (e) {
        const {status, message} = e as IApiError
        return res.status(status).json({message})
      }
  }
  const {status, message} = ApiError.InternalServerError()
  return res.status(status).json({message})
}

export default withValidation<IPostSchema>(postSchema, handler)
