import mongoose from "mongoose"
import {ICommentSchema} from "@/validators/schemas/commentSchema"

const CommentSchema = new mongoose.Schema<ICommentSchema>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  },
  text: {
    type: String
  }
}, {
  timestamps: true
})

export default mongoose.models.Comment || mongoose.model<ICommentSchema>('Comment', CommentSchema)