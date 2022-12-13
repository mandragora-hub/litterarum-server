import HttpMessage from "~/config/messages";
import HttpException from "./httpException";

export default class Api404Error extends HttpException {
  constructor(
    name: string,
    statusCode = HttpMessage.NOT_FOUND.code,
    description = HttpMessage.NOT_FOUND.message,
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}
