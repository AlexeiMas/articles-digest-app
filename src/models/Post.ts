import mongoose from "mongoose"
import {IPostSchema} from "@/validators/schemas/postSchema"

const PostSchema = new mongoose.Schema<IPostSchema>({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true,
    unique: true
  },
  tags: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag"
      }
    ],
    default: []
  },
  viewsCount: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: {
    type: String
  }
}, {
  timestamps: true
})

export default mongoose.models.Post || mongoose.model<IPostSchema>('Post', PostSchema)