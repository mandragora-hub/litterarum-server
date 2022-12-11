/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Express } from "express";
import serverResponses from "~/utils/helpers/responses";
import messages from "~/config/messages";
import { Todo } from "~/models/todos/todo";

const routes = (app: Express) => {
  const router = express.Router();

  router.post("/todos", (req, res) => {
    const todo = new Todo({
      text: req.body.text,
    });

    todo
      .save()
      .then((result) => {
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
      })
      .catch((_e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST);
      });
  });

  router.get("/", (req, res) => {
    Todo.find({}, { __v: 0 })
      .then((todos) => {
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, todos);
      })
      .catch((_e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST);
      });
  });

  // it's a prefix before api it is useful when you have many modules and you want to
  // differentiate b/w each module you can use this technique
  app.use("/api", router);
};
export default routes;
