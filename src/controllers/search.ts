import { Response, NextFunction } from "express";
import serverResponses from "~/utils/helpers/responses";
import messages from "~/config/messages";
// import Api404Error from "~/utils/api404Error";
import { Book } from "~/models/book";
// import { Author, IAuthor } from "~/models/author";
// import { SysTag, ISysTag } from "~/models/sysTag";
// import getUniqueListBy from "~/utils/lib/getUniqueListBy";
import type { KeysetPagination, RequestQuery } from "~/types/common";

const books = async (
  req: RequestQuery<KeysetPagination>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      q,
      page = 1,
      limit = 1,
      order = "asc",
      sort = "title",
    } = req.query;
    const books = await Book.find({
      ...(q ? { title: { $regex: q, $options: "i" } } : {}),
    })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort([[sort, order]])
      .exec();
    const count = await Book.count();
    serverResponses.sendSuccess(res, messages.SUCCESSFUL, books, {
      totalPages: Math.ceil(count / limit),
      currentPages: page,
      count: count,
    });
  } catch (err) {
    next(err);
  }
};

export { books };
