import mongoose from "mongoose"
import {ITagSchema} from "@/types/data"

const TagSchema = new mongoose.Schema<ITagSchema>({
  name: String,
  posts: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
      }
    ],
    default: []
  }
}, {
  timestamps: true
})

export default mongoose.models.Tag || mongoose.model<ITagSchema>('Tag', TagSchema)