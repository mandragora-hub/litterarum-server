import mongoose, { ConnectOptions } from "mongoose";
import { Express } from "express";
import logger from "~/utils/helpers/logger";

export default function connect(app: Express) {
  const options: ConnectOptions = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
  };

  const connectWithRetry = () => {
    mongoose.Promise = global.Promise;

    // Set `strictQuery` to `false` to prepare for the change, suppress warning messages
    mongoose.set("strictQuery", false);

    console.log("MongoDB connection with retry");
    mongoose
      .connect(process.env.MONGODB_URI, options)
      .then(() => {
        logger.info("MongoDB is connected");
        app.emit("ready");
      })
      .catch((err) => {
        logger.error(
          "MongoDB connection unsuccessful, retry after 2 seconds.",
          err
        );
        setTimeout(connectWithRetry, 2000);
      });
  };
  connectWithRetry();
}
