import mongoose from "mongoose"
import {ApiError} from "@/extensions/ApiError"

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect () {
  const MONGODB_URI = process.env.MONGODB_URI

  if (!MONGODB_URI) {
    throw ApiError.InternalServerError('Please define the MONGODB_URI environment variable inside .env.local')
  }

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      // bufferMaxEntries: 0,
      // useFindAndModify: true,
      // useCreateIndex: true
    }

    mongoose.set("strictQuery", false)
    cached.promise = mongoose.connect(MONGODB_URI, options).then(mongoose => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect