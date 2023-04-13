import {IPostSchema} from "@/validators/schemas/postSchema"
import Post from "@/models/Post"
import {Error} from "mongoose"
import {ApiError} from "@/extensions/ApiError"
import fs from "fs"
import {TSortBy} from "@/types/general"
import Tag from "@/models/Tag"
import {ITagSchema} from "@/types/data"

class PostService {
  async create({...args}: IPostSchema) {
    try {
      const {tags, ...fields} = args
      const post = new Post<IPostSchema>({...fields})
      const tagsTuple = tags ? tags.map((name) => {
        return Tag.findOne({name}).exec().then((tag) => {
          if (!tag) {
            return (new Tag<ITagSchema>({name, posts: [post._id]})).save()
          }
          return Tag.findByIdAndUpdate(tag._id, {$addToSet: {posts: post._id}}, {new: true})
        })
      }) : []

      const tagsData = await Promise.all([...tagsTuple])
      const tagsIds = tagsData.map(tag => tag._id)
      post.tags.push(...tagsIds)
      const data = await post.save()
      return data._id
    } catch (e) {
      throw ApiError.InternalServerError((e as Error).message)
    }
  }

  async getAll(sortBy: TSortBy = "createdAt") {
    return await Post.find({}, null, {sort: {[sortBy]: -1}})
      .populate([
        {
          path: 'user',
          select: '-password',
        },
        {
          path: 'tags',
          select: '-_id name',
        }
      ]).exec()
  }

  async getOne(id: string) {
    try {
      return await Post.findByIdAndUpdate(
        {_id: id},
        {$inc: {viewsCount: 1}},
        {returnDocument: "after"},
      ).populate([
        {
          path: 'user',
          select: 'fullName avatarUrl',
        },
        {
          path: 'tags',
          select: '-_id name',
        }
      ]).exec()
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
      await Tag.updateMany({_id: {$in: doc.tags}}, {$pull: {posts: doc._id}})
      await Tag.deleteMany({posts: []})
      return doc
    } catch (e) {
      throw ApiError.NotFound('Post is not found')
    }
  }

  async update({id, ...args}: IPostSchema & { id: string }) {
    try {
      const {tags, ...fields} = args
      const existedTags = await Tag.find({name: {$in: tags}})
      const existedNames = existedTags.map(el => el.name)
      const newData = tags ? tags.filter(tag => !existedNames.includes(tag)).map(name => (
        new Tag<ITagSchema>({
        name,
        posts: [id]
        })
      ).save()) : []
      const newTags = await Promise.all(newData)
      const checkUrl = fields.imageUrl ? {} : {$unset: {imageUrl: 1}}
      return await Post.updateOne(
        {_id: id},
        {...fields, tags: [...existedTags, ...newTags], ...checkUrl},
        {new: true}
      )
    } catch (e) {
      throw ApiError.NotFound('Post is not found')
    }
  }
}

export default new PostService()