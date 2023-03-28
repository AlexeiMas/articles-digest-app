import Ajv, {DefinedError, JSONSchemaType} from "ajv"
import addFormats from "ajv-formats"
import {NextApiHandler, NextApiRequest} from "next"
import {ApiError} from "@/extensions/ApiError"
import {IUserDto} from "@/dtos/UserDto"
import {checkAuth} from "@/validators/checkAuth"

export type TNextApiReqWithId = NextApiRequest & { user: string }

const withValidation = <T>(
  schema: JSONSchemaType<T>,
  handler: NextApiHandler<T>,
): NextApiHandler<T | { message: string, errors?: DefinedError[] }> => {
  const ajvInstance = new Ajv({allErrors: true, removeAdditional: true})
  addFormats(ajvInstance)
  const validate = ajvInstance.compile<T>(schema)

  return async (req, res) => {
    const {method} = req
    if (method === "GET") {
      return handler(req, res)
    }
    if (req.method === "POST" || "PATCH" || "PUT") {
      const session = await checkAuth(req, res)
      if (session) {
        const isValid = validate(req.body)
        if (!isValid) {
          const {
            status,
            message,
            errors
          } = ApiError.BadRequest('Invalid request body', validate.errors as DefinedError[])
          return res.status(status).json({message, errors: errors as DefinedError[]})
        }
        const userId = (session?.user as IUserDto).id
        if (userId) {
          (req as TNextApiReqWithId).user = userId
        }
        return handler(req, res)
      }
      const {status, message} = ApiError.UnauthorizedError()
      return res.status(status).json({message})
    }

    if (method === "DELETE") {
      const session = await checkAuth(req, res)
      if (session) {
        return handler(req, res)
      }
      const {status, message} = ApiError.UnauthorizedError()
      return res.status(status).json({message})
    }

    const {status, message} = ApiError.MethodNotAllowed()
    return res.status(status).json({message})
  }
}

export default withValidation