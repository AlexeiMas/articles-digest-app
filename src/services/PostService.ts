import {IPostSchema} from "@/validators/schemas/postSchema"
import Post from "@/models/Post"
import {Error} from "mongoose"
import {ApiError} from "@/extensions/ApiError"

class PostService {
  async create({...args}: IPostSchema) {
    try {
      const doc = new Post<IPostSchema>({...args})
      return await doc.save()
    } catch (e) {
      throw ApiError.InternalServerError((e as Error).message)
    }
  }

  async getAll() {
    return await Post.find().populate('user', '-password').exec()
  }

  async getOne(id: string) {
    try {
      return await Post.findByIdAndUpdate(
        {_id: id},
        {$inc: {viewsCount: 1}},
        {returnDocument: "after"},
      )
    } catch (e) {
      throw ApiError.NotFound('Post is not found')
    }
  }

  async remove(id: string) {
    try {
      return await Post.findOneAndDelete({_id: id})
    } catch (e) {
      throw ApiError.NotFound('Post is not found')
    }
  }

  async update({id, ...args}: IPostSchema & { id: string }) {
    try {
      return await Post.updateOne(
        {_id: id},
        {...args}
      )
    } catch (e) {
      throw ApiError.NotFound('Post is not found')
    }
  }
}

export default new PostService()