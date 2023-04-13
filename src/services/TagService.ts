import Tag from "@/models/Tag"

class TagService {
  async getPopularTags(limit: number = 5) {
    const data = await Tag.find({}, 'name', {limit, sort: {posts: -1}})
    return data.map(el => el.name)
  }
  async getPostsByTagName(name: string) {
    const data = await Tag.find({name}, '-_id posts').populate({
      path: 'posts',
      populate: {
        path: "tags",
        select: "-_id name"
      }
    })
    return data.length >=1 ? data[0].posts : []
  }
}

export default new TagService()