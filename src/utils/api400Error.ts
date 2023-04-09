import HttpMessage from "~/config/messages";
import HttpException from "./httpException";

export default class Api400Error extends HttpException {
  constructor(
    description = HttpMessage.BAD_REQUEST.message,
    statusCode = HttpMessage.BAD_REQUEST.code,
    name = "Api404Error",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}
