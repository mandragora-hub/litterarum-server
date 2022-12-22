import HttpMessage from "~/config/messages";
import HttpException from "./httpException";

export default class Api404Error extends HttpException {
  constructor(
    description = HttpMessage.NOT_FOUND.message,
    statusCode = HttpMessage.NOT_FOUND.code,
    name = "Api404Error",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}
