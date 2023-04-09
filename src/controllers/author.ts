import { Request, Response, NextFunction } from "express";
import serverResponses from "~/utils/helpers/responses";
import messages from "~/config/messages";
import { IAuthor, Author } from "~/models/author";
import Api404Error from "~/utils/api404Error";
import { RequestBody } from "types";

const create = (
  req: RequestBody<IAuthor>,
  res: Response,
  next: NextFunction
) => {
  const author = new Author({
    ...req.body,
  });

  author
    .save()
    .then((result) => {
      serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
    })
    .catch((err) => {
      next(err);
    });
};

const findAll = (req: Request, res: Response, next: NextFunction) => {
  Author.find({}, { __v: 0 })
    .then((author) => {
      serverResponses.sendSuccess(res, messages.SUCCESSFUL, author);
    })
    .catch((err) => {
      next(err);
    });
};

const findOne = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      throw new Api404Error(`Author with id: ${req.params.id} not found.`);
    }
    serverResponses.sendSuccess(res, messages.SUCCESSFUL, author);
  } catch (err) {
    next(err);
  }
};

const remove = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await Author.deleteOne({ _id: req.params.id });
    if (result.deletedCount == 0) {
      throw new Api404Error(`authors with id: ${req.params.id} not found.`);
    }
    serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
  } catch (err) {
    next(err);
  }
};

const update = async (
  req: Request<{ id: string }, object, IAuthor>,
  res: Response,
  next: NextFunction
) => {
  try {
    const newAuthor = req.body;
    const updatedAuthor = await Author.findOneAndUpdate(
      { _id: req.params.id },
      newAuthor,
      {
        new: true,
      }
    );
    if (!updatedAuthor) {
      throw new Api404Error(`author with id: ${req.params.id} not found.`);
    }
    serverResponses.sendSuccess(res, messages.SUCCESSFUL, updatedAuthor);
  } catch (err) {
    next(err);
  }
};

export { create, findAll, findOne, remove, update };
