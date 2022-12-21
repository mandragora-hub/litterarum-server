import HttpMessage from "~/config/messages";
import HttpException from "./httpException";

export default class ValidationError extends HttpException {
  constructor(
    name: string,
    statusCode = HttpMessage.BAD_REQUEST.code,
    description = HttpMessage.BAD_REQUEST.message,
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}
