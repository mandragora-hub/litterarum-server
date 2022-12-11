import "config/config";

import express from "express";
import logger from "~/utils/helpers/logger";
import httpLogger from "~/utils/helpers/httpLogger";
import ErrorHandler from "~/utils/errorHandler";
import { join } from "path";
import cors from "cors";
import connect from "./db";
import setupRoute from "./routes";

const app = express();

connect(app); // connection from db here
app.use(httpLogger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

//  adding routes
setupRoute(app);

app.use(ErrorHandler.logError);
app.use(ErrorHandler.sendError);

app.on("ready", () => {
  app.listen(3000, () => {
    logger.info("Express.js listening on http://localhost:3000/.");
  });
});

export default app;
