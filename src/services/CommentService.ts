import Post from "@/models/Post"
import {Error} from "mongoose"
import {ApiError} from "@/extensions/ApiError"
import Comment from "@/models/Comment"
import {ICommentSchema} from "@/validators/schemas/commentSchema"

class CommentService {
  async create({...args}: ICommentSchema) {
    try {
      const {postId} = args
      const comment = await Comment.create({...args})
      const {_id} = comment
      await Post.findByIdAndUpdate(postId, {$push: {comments: _id}})
      return _id
    } catch (e) {
      throw ApiError.InternalServerError((e as Error).message)
    }
  }
  async getRecentComments(limit: number = 5) {
    try {
      return await Comment.find({}, '-createdAt -updatedAt', {limit, sort: {createdAt: -1}}).populate([
        {
          path: 'user',
          select: 'fullName avatarUrl'
        }
      ])
    } catch (e) {
      throw ApiError.InternalServerError((e as Error).message)
    }
  }
}

export default new CommentService()