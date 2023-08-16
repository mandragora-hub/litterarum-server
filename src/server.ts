import "dotenv/config";

import express from "express";
import logger from "~/utils/helpers/logger";
import httpLogger from "~/utils/helpers/httpLogger";
import ErrorHandler from "~/utils/errorHandler";
import { join } from "path";
import cors from "cors";
import connect from "./db";
import v1RouterTodos from "./v1/routes/todos";
import v1RouterFiles from "./v1/routes/files";
import v1RouterAuthors from "./v1/routes/authors";
import v1RouterBooks from "./v1/routes/books";
import v1RouterSearch from "./v1/routes/search";
import v1RouterTags from "./v1/routes/tags";
import v1RouterBatch from "./v1/routes/batch";
import v1RouterHealthCheck from "./v1/routes/healthcheck";
import helmet from "helmet";
import hpp from "hpp";
import authenticate from "./middleware/passport";

const app = express();
app.use(httpLogger);

connect(app); // connection from db here

const bodyOptions = { limit: "10mb" };
app.use(express.json(bodyOptions));
app.use(express.urlencoded({ ...bodyOptions, extended: false }));
app.use(express.static(join(__dirname, "../public")));

/* Security middleware configs */
app.use(cors());
app.use(helmet());
app.use(hpp());

// Setup routes
app.use("/api/v1/todos", v1RouterTodos);
app.use("/api/v1/files", v1RouterFiles);
app.use("/api/v1/search", v1RouterSearch);
app.use("/api/v1/authors", v1RouterAuthors);
app.use("/api/v1/books", v1RouterBooks);
app.use("/api/v1/tags", v1RouterTags);
app.use("/api/v1/batch", authenticate, v1RouterBatch);
app.use("/api/v1/healthcheck", v1RouterHealthCheck);

app.use(ErrorHandler.middleware);
process.on("unhandledRejection", (error) => {
  throw error;
});

process.on("uncaughtException", (error) => {
  logger.error(error);

  if (!ErrorHandler.isOperationalError(error)) {
    return process.exit(1);
  }
});

// Not listen for connection  in test environment
if (process.env.NODE_ENV !== "test") {
  app.on("ready", () => {
    const server = app.listen(process.env.PORT, () => {
      logger.info(
        `⚡️[server]: Server is running at http://localhost:${process.env.PORT}`
      );
    });

    // Graceful Shutdown
    process.on("SIGTERM", () => {
      logger.debug("SIGTERM signal received: closing HTTP server");
      server.close(() => {
        logger.debug("HTTP server closed");
      });
    });
  });
}

export default app;
