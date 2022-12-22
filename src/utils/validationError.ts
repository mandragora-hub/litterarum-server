import HttpMessage from "~/config/messages";
import HttpException from "./httpException";

export default class ValidationError extends HttpException {
  constructor(
    description = HttpMessage.BAD_REQUEST.message,
    statusCode = HttpMessage.BAD_REQUEST.code,
    name = "ValidationError",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}
