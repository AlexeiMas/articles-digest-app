import mongoose from "mongoose"
import {IUserSchema} from "@/validators/schemas/authSchema"

const UserSchema = new mongoose.Schema<IUserSchema>({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String,
    default: "https://i.stack.imgur.com/34AD2.jpg"
  }
}, {
  timestamps: true
})

export default mongoose.models.User || mongoose.model<IUserSchema>('User', UserSchema)