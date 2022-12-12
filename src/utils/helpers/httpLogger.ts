import morgan from "morgan";
import logger from "./logger";

const httpLogger = morgan(
  ":remote-addr :method :url :status :res[content-length] - :response-time ms",
  {
    stream: {
      write: (message) => logger.http(message),
    },
  }
);

export default httpLogger;
