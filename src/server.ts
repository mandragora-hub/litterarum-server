import "./config/config";

import express from "express";
import { join } from "path";
import cors from "cors";
import connect from "./db";
import setupRoute from "./routes"
const app = express();

// connection from db here
connect(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

//  adding routes
setupRoute(app);

app.on("ready", () => {
  app.listen(3000, () => {
    console.log("Server is up on port", 3000);
  });
});

export default app;
