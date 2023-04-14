import { Response, NextFunction } from "express";
import serverResponses from "~/utils/helpers/responses";
import messages from "~/config/messages";
// import Api404Error from "~/utils/api404Error";
import { Book, Author, SysTag } from "~/models";
// import getUniqueListBy from "~/utils/lib/getUniqueListBy";
import type { KeysetPagination, RequestQuery } from "~/types/common";

const DEFAULT_LIMIT = 7;
const DEFAULT_ORDER = "desc";
const DEFAULT_BOOK_SORT = "title";
const DEFAULT_AUTHOR_SORT = "name";
const DEFAULT_TAG_SORT = "tag";

const books = async (
  req: RequestQuery<KeysetPagination>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      q,
      page = 1,
      limit = DEFAULT_LIMIT,
      order = DEFAULT_ORDER,
      sort = DEFAULT_BOOK_SORT,
    } = req.query;
    const books = await Book.find({
      ...(q ? { title: { $regex: q, $options: "i" } } : {}),
    })
      .populate(["author", "tags"])
      .limit(limit)
      .skip((page - 1) * limit)
      .sort([[sort, order]])
      .exec();
    const count = await Book.count({
      ...(q ? { title: { $regex: q, $options: "i" } } : {}),
    });
    serverResponses.sendSuccess(res, messages.SUCCESSFUL, books, {
      totalPages: Math.ceil(count / limit),
      currentPages: page,
      count: count,
    });
  } catch (err) {
    next(err);
  }
};

const authors = async (
  req: RequestQuery<KeysetPagination>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      q,
      page = 1,
      limit = DEFAULT_LIMIT,
      order = DEFAULT_ORDER,
      sort = DEFAULT_AUTHOR_SORT,
    } = req.query;
    const authors = await Author.find({
      ...(q ? { name: { $regex: q, $options: "i" } } : {}),
    })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort([[sort, order]])
      .exec();
    const count = await Author.count({
      ...(q ? { name: { $regex: q, $options: "i" } } : {}),
    });
    serverResponses.sendSuccess(res, messages.SUCCESSFUL, authors, {
      totalPages: Math.ceil(count / limit),
      currentPages: page,
      count: count,
    });
  } catch (err) {
    next(err);
  }
};

const tags = async (
  req: RequestQuery<KeysetPagination>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      q,
      page = 1,
      limit = DEFAULT_LIMIT,
      order = DEFAULT_ORDER,
      sort = DEFAULT_TAG_SORT,
    } = req.query;
    const tags = await SysTag.find({
      ...(q ? { tag: { $regex: q, $options: "i" } } : {}),
    })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort([[sort, order]])
      .exec();
    const count = await SysTag.count({
      ...(q ? { title: { $regex: q, $options: "i" } } : {}),
    });
    serverResponses.sendSuccess(res, messages.SUCCESSFUL, tags, {
      totalPages: Math.ceil(count / limit),
      currentPages: page,
      count: count,
    });
  } catch (err) {
    next(err);
  }
};

export { books, authors, tags };
