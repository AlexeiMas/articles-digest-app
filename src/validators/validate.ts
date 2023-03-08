import Ajv, {DefinedError, JSONSchemaType} from "ajv"
import addFormats from "ajv-formats"
import {NextApiHandler} from "next"
import {ApiError} from "@/extensions/ApiError"

const withValidation = <T>(
  schema: JSONSchemaType<T>,
  handler: NextApiHandler<T>
): NextApiHandler<T | {message: string, errors?: DefinedError[]}> => {
  const ajvInstance = new Ajv({allErrors: true, removeAdditional: true})
  addFormats(ajvInstance)
  const validate = ajvInstance.compile<T>(schema)

  return async (req, res) => {
    const isValid = validate(req.body)
    if (!isValid) {
      const {status, message, errors} = ApiError.BadRequest('Invalid request body', validate.errors as DefinedError[])
      return res.status(status).json({message, errors: errors as DefinedError[]})
    }
    return handler(req, res)
  }
}

export default withValidation