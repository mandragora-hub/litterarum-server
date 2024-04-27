import { Request, Response, NextFunction } from "express";
import serverResponses from "~/utils/helpers/responses";
import messages from "~/config/messages";
import Api404Error from "~/utils/api404Error";
import { Book, type IBook } from "~/models/book";
import { Collection } from "~/models/collection";
import getUniqueListBy from "~/utils/lib/getUniqueListBy";
import type { KeysetPagination, RequestQuery } from "types";
import { collections as searchCollections } from "./search";
import slugify from "~/utils/lib/slugify";

const findAll = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  req: Request<{}, {}, { slug?: string }>,
  res: Response,
  next: NextFunction,
) => {
  Collection.find(
    { ...(req.query.slug && { slug: req.query.slug }) },
    { __v: 0 },
  )
    .populate(["books"])
    .then((collections) => {
      serverResponses.sendSuccess(res, messages.SUCCESSFUL, collections);
    })
    .catch((err) => {
      next(err);
    });
};

const create = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  const collection = new Collection({ ...req.body });
  collection
    .save()
    .then((result) => {
      serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
    })
    .catch((err) => {
      next(err);
    });
};

const addBooks = async (
  req: Request<{ id: string }, object, IBook[]>,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Remove duplicates
    const cleanBooks = getUniqueListBy<IBook>(req.body, "slug");

    const collection = await Collection.findById(req.params.id);
    if (!collection) {
      throw new Api404Error(`collection with id: ${req.params.id} not found.`);
    }

    const newBooks: IBook[] = [];
    for (const e of cleanBooks) {
      let book = await Book.findOne({ slug: e.slug });
      if (!book) {
        book = await Book.create({ ...e });
      }

      newBooks.push(book);
    }

    collection.books = newBooks;
    await collection.save();

    serverResponses.sendSuccess(res, messages.SUCCESSFUL, collection);
  } catch (err) {
    next(err);
  }
};

const findOne = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const collection = await Collection.findById(req.params.id).populate([
      "books",
    ]);
    if (!collection) {
      throw new Api404Error(`collection with id: ${req.params.id} not found.`);
    }

    serverResponses.sendSuccess(res, messages.SUCCESSFUL, collection);
  } catch (err) {
    next(err);
  }
};

const remove = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await Collection.deleteOne({ _id: req.params.id });
    if (result.deletedCount == 0) {
      throw new Api404Error(`collection with id: ${req.params.id} not found.`);
    }
    serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
  } catch (err) {
    next(err);
  }
};

const update = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  // TODO: fix this
  try {
    const newCollection = {
      ...(req.body.name && { slug: slugify(req.body.name) }),
      ...req.body,
    };
    const updateOptions = {
      new: true,
    };

    const updatedCollection = await Collection.findOneAndUpdate(
      { _id: req.params.id },
      newCollection,
      updateOptions,
    );
    if (!updatedCollection) {
      throw new Api404Error(`collection with id: ${req.params.id} not found.`);
    }

    serverResponses.sendSuccess(res, messages.SUCCESSFUL, updatedCollection);
  } catch (err) {
    next(err);
  }
};

const latest = async (
  req: RequestQuery<KeysetPagination>,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Default value
    req.query.sort = "name";
    req.query.q = "";

    return searchCollections(req, res, next);
  } catch (err) {
    next(err);
  }
};

const increaseViewsCount = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) {
      throw new Api404Error(`collection with id: ${req.params.id} not found.`);
    }

    collection.views++;
    await collection.save();
    serverResponses.sendSuccess(res, messages.SUCCESSFUL, {});
  } catch (error) {
    next(error);
  }
};

export {
  findAll,
  create,
  findOne,
  remove,
  update,
  latest,
  addBooks,
  increaseViewsCount,
};
