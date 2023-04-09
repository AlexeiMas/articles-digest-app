import type {NextApiRequest, NextApiResponse} from 'next'
import {ApiError} from "@/extensions/ApiError"
import {checkAuth} from "@/validators/checkAuth"
import * as fs from "fs"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return checkAuth(req, res).then(isSession => {
    if (isSession) {
      if (req.method === "DELETE") {
        const {id} = req.query
        const fullPath = `public/uploads/${id}`
        if (fs.existsSync(fullPath)) {
          fs.unlink(`public/uploads/${id}`, (err) => {
            if (err) {
              const {status, message} = ApiError.InternalServerError()
              return res.status(status).json({message})
            }
          })
          return res.status(200).json({
            message: 'File successfully deleted from server',
            url: "uploads/" + id
          })
        }
        const {status, message} = ApiError.NotFound("File with indicated ID isn't found")
        return res.status(status).json({message})
      }
      const {status, message} = ApiError.MethodNotAllowed()
      return res.status(status).json({message})
    }
    const {status, message} = ApiError.UnauthorizedError()
    return res.status(status).json({message})
  })
}