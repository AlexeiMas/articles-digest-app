import Tag from "@/models/Tag"
import {ApiError} from "@/extensions/ApiError"
import {Error} from "mongoose"

class TagService {
  async getPopularTags(limit: number = 5) {
    try {
      const data = await Tag.find({}, 'name', {limit, sort: {posts: -1}})
      return data.map(el => el.name)
    } catch (e) {
      throw ApiError.InternalServerError((e as Error).message)
    }
  }

  async getPostsByTagName(name: string) {
    try {
      const data = await Tag.find({name}, '-_id posts').populate({
        path: 'posts',
        populate: [
          {
            path: "tags",
            select: "-_id name"
          },
          {
            path: "user",
            select: 'fullName avatarUrl'
          }
        ]
      }).exec()
      return data.length >= 1 ? data[0].posts : []
    } catch (e) {
      throw ApiError.InternalServerError((e as Error).message)
    }
  }
}

export default new TagService()