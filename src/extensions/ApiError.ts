export class ApiError extends Error {
  status: number;
  errors: unknown[];
  constructor(status: number, message: string, errors: unknown[] = []) {
    super(message);
    this.status = status;
    this.errors = errors
  }

  static BadRequest(message?: string, errors?: unknown[]) {
    return new ApiError(400, message ?? 'Bad request', errors)
  }

  static UnauthorizedError() {
    return new ApiError(401, 'User is not authorized')
  }

  static Forbidden() {
    return new ApiError(403, "You don't have permissions for looking this page")
  }

  static NotFound(message?: string) {
    return new ApiError(404, message ?? 'The server cannot find the requested resource')
  }

  static MethodNotAllowed() {
    return new ApiError(405, 'The request method is not supported by the target resource')
  }

  static InternalServerError(message?: string, errors?: unknown[]) {
    return new ApiError(500, message ?? 'Something went wrong', errors)
  }
}