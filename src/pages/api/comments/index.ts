import {NextApiRequest, NextApiResponse} from "next"
import withValidation, {TNextApiReqWithId} from "@/validators/validate"
import {commentSchema, ICommentSchema} from "@/validators/schemas/commentSchema"
import {ApiError, IApiError} from "@/extensions/ApiError"
import dbConnect from "@/lib/dbConnect"
import CommentService from "@/services/CommentService"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()

  const {method} = req

  switch (method) {
    case "GET":
      const comments = await CommentService.getRecentComments()
      if (comments) {
        return res.json(comments)
      }
      const {status, message} = ApiError.NotFound('Comments have not been found')
      return res.status(status).json({message})
    case "POST":
      try {
        const {user} = req as TNextApiReqWithId
        const commentId = await CommentService.create({...req.body, user})
        return res.json({ message: 'The comment was created successfully', commentId })
      } catch (e) {
        const {status, message} = e as IApiError
        return res.status(status).json({message})
      }
  }
  const {status, message} = ApiError.InternalServerError()
  return res.status(status).json({message})
}

export default withValidation<ICommentSchema>(commentSchema, handler)
