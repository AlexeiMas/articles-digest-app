import type {NextApiRequest, NextApiResponse} from 'next'
import {ApiError} from "@/extensions/ApiError"
import {upload} from "@/utils/multerConfig"
import {checkAuth} from "@/validators/checkAuth"

interface IExtendedNextApiRequest extends NextApiRequest {
  file:
    Record<"fieldname" | "originalname" | "encoding" | "mimetype" | "destination" | "filename" | "path", string>
    & { size: number }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true
  },
}

export default function handler(req: IExtendedNextApiRequest, res: NextApiResponse) {
  return checkAuth(req, res).then(isSession => {
    if (isSession) {
      if (req.method === "POST") {
        return upload.single('image')(req as any, res as any, (err: any) => {
          if (err) {
            const {status, message, errors} = ApiError.InternalServerError("", err)
            return res.status(status).json({ message, errors });
          }
          const {filename, destination} = req.file
          return res.status(200).json({
            success: true,
            url: destination.split('/')[1].concat('/' + filename)
          });
        });
      }
      const {status, message} = ApiError.MethodNotAllowed()
      return res.status(status).json({message})
    }
    const {status, message} = ApiError.UnauthorizedError()
    return res.status(status).json({message})
  })
}