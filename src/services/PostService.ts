import {IPostSchema} from "@/validators/schemas/postSchema"
import Post from "@/models/Post"
import {Error} from "mongoose"
import {ApiError} from "@/extensions/ApiError"
import fs from "fs"
import {TSortBy} from "@/types/general"

class PostService {
  async create({...args}: IPostSchema) {
    try {
      const doc = new Post<IPostSchema>({...args})
      const data = await doc.save()
      return data._id
    } catch (e) {
      throw ApiError.InternalServerError((e as Error).message)
    }
  }

  async getAll(sortBy: TSortBy = "createdAt") {
    return await Post.find({}, null, {sort: {[sortBy]: -1}}).populate('user', '-password').exec()
  }

  async getOne(id: string) {
    try {
      return await Post.findByIdAndUpdate(
        {_id: id},
        {$inc: {viewsCount: 1}},
        {returnDocument: "after"},
      ).populate('user', 'fullName avatarUrl').exec()
    } catch (e) {
      throw ApiError.NotFound('Post is not found')
    }
  }

  async remove(id: string) {
    try {
      const doc = await Post.findOneAndDelete({_id: id})
      const fullPath = doc.imageUrl?.replace(process.env.API_URL, "public/")
      if (fs.existsSync(fullPath)) {
        fs.unlink(fullPath, (err) => {
          if (err) {
            return err
          }
        })
      }
      return doc
    } catch (e) {
      throw ApiError.NotFound('Post is not found')
    }
  }

  async update({id, ...args}: IPostSchema & { id: string }) {
    try {
      const checkUrl = args.imageUrl ? {} : {$unset: {imageUrl: 1}}
      return await Post.updateOne(
        {_id: id},
        {...args, ...checkUrl}
      )
    } catch (e) {
      throw ApiError.NotFound('Post is not found')
    }
  }

  async getLastTags(limit: number = 5) {
    const data = await Post.find({}, 'tags').limit(limit).exec()
    return [...new Set(data.flatMap(el => el.tags).slice(0, limit))]
  }
}

export default new PostService()