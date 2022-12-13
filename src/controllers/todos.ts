import { Request, Response, NextFunction } from "express";
import serverResponses from "~/utils/helpers/responses";
import messages from "~/config/messages";
import { Todo } from "~/models/todos/todo";
import Api404Error from "~/utils/api404Error";

const createNewTodos = (req: Request, res: Response, next: NextFunction) => {
  const todo = new Todo({
    text: req.body.text,
  });

  todo
    .save()
    .then((result) => {
      serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
    })
    .catch((err) => {
      next(err);
    });
};

const getAllTodos = (req: Request, res: Response, next: NextFunction) => {
  Todo.find({}, { __v: 0 })
    .then((todos) => {
      serverResponses.sendSuccess(res, messages.SUCCESSFUL, todos);
    })
    .catch((err) => {
      next(err);
    });
};

const getOneTodos = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      throw new Api404Error(`Todo with id: ${req.params.id} not found.`);
    }
    serverResponses.sendSuccess(res, messages.SUCCESSFUL, "todo");
  } catch (err) {
    next(err);
  }
};

export { createNewTodos, getAllTodos, getOneTodos };
