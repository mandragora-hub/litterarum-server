import { Request, Response, NextFunction } from "express";
import serverResponses from "~/utils/helpers/responses";
import messages from "~/config/messages";
import Api404Error from "~/utils/api404Error";
import Api400Error from "~/utils/api400Error";
import { Book, IBook } from "~/models/book";
import { Author, IAuthor } from "~/models/author";
import { SysTag, ISysTag } from "~/models/sysTag";
import getUniqueListBy from "~/utils/lib/getUniqueListBy";
import type { KeysetPagination, RequestQuery, TypeFile } from "types";
import { books as searchBooks } from "./search";
import { download as downloadFile } from "./files";
import slugify from "~/utils/lib/slugify";

const findAll = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  req: Request<{}, {}, { slug?: string }>,
  res: Response,
  next: NextFunction
) => {
  Book.find({ ...(req.query.slug && { slug: req.query.slug }) }, { __v: 0 })
    .populate(["author", "tags"])
    .then((books) => {
      serverResponses.sendSuccess(res, messages.SUCCESSFUL, books);
    })
    .catch((err) => {
      next(err);
    });
};

const create = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  const book = new Book({ ...req.body });
  book
    .save()
    .then((result) => {
      serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
    })
    .catch((err) => {
      next(err);
    });
};

const addAuthor = async (
  req: Request<{ id: string }, object, Partial<IAuthor>>,
  res: Response,
  next: NextFunction
) => {
  try {
    const newAuthor = req.body;

    // Get author to append to new book
    const author = await Author.findOne({ name: newAuthor.name });
    if (!author) {
      throw new Api404Error(`Author with name: ${newAuthor.name} not found.`);
    }

    const book = await Book.findByIdAndUpdate(req.params.id, {
      author: author,
    });
    if (!book) {
      throw new Api404Error(`book with id: ${req.params.id} not found.`);
    }

    serverResponses.sendSuccess(res, messages.SUCCESSFUL, book);
  } catch (err) {
    next(err);
  }
};

const addTags = async (
  req: Request<{ id: string }, object, ISysTag[]>,
  res: Response,
  next: NextFunction
) => {
  try {
    // Remove duplicates
    const cleanTags = getUniqueListBy<ISysTag>(req.body, "tag");

    const book = await Book.findById(req.params.id);
    if (!book) {
      throw new Api404Error(`book with id: ${req.params.id} not found.`);
    }

    const newSysTag: ISysTag[] = [];
    for (const e of cleanTags) {
      let sysTag = await SysTag.findOne({ tag: e.tag });
      if (!sysTag) {
        sysTag = await SysTag.create({ tag: e.tag });
      }

      newSysTag.push(sysTag);
    }

    book.tags = newSysTag;
    await book.save();

    serverResponses.sendSuccess(res, messages.SUCCESSFUL, book);
  } catch (err) {
    next(err);
  }
};

const createBatch = async (
  req: Request<{ id: string }, object, IBook[]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const cleanBooks = getUniqueListBy<IBook>(req.body, "title");

    for (const book of cleanBooks) {
      const newAuthor =
        book.author &&
        (await Author.findOneAndUpdate(
          { name: book.author.name },
          book.author,
          { new: true, upsert: true }
        ));
      const newSysTag: ISysTag[] = [];
      if (book.tags) {
        for (const e of book.tags) {
          let sysTag = await SysTag.findOne({ tag: e.tag });
          if (!sysTag) {
            sysTag = await SysTag.create({ tag: e.tag });
          }

          newSysTag.push(sysTag);
        }
      }

      await Book.findOneAndUpdate(
        { title: book.title },
        {
          ...book,
          author: newAuthor,
          tags: newSysTag,
        },
        { new: true, upsert: true }
      );
    }
    serverResponses.sendSuccess(res, messages.SUCCESSFUL);
  } catch (err) {
    next(err);
  }
};

// const create = async (
//   req: Request<{ id: string }>,
//   res: Response,
//   next: NextFunction
// ) => {
//   // validate type of body
//   const newBook = req.body;

//   // Get author to append to new book
//   const author = await Author.findById(newBook.authorId);
//   if (!author) {
//     return serverResponses.sendSuccess(res, messages.SUCCESSFUL);
//   }

//   const tags = await SysTag.find({ _id: { $in: newBook.tagsId } });
//   const book = new Book({
//     title: newBook.title,
//     basename: newBook.basename,
//     downloaded: newBook.downloaded || 0,
//     author: author,
//     ...(tags && { tags: tags }),
//   });

//   book
//     .save()
//     .then((result) => {
//       serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
//     })
//     .catch((err) => {
//       next(err);
//     });
// };

const findOne = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await Book.findById(req.params.id).populate([
      "author",
      "tags",
    ]);
    if (!book) {
      throw new Api404Error(`book with id: ${req.params.id} not found.`);
    }
    // * increase views count
    book.views++;
    book.save();

    serverResponses.sendSuccess(res, messages.SUCCESSFUL, book);
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
    const result = await Book.deleteOne({ _id: req.params.id });
    if (result.deletedCount == 0) {
      throw new Api404Error(`books with id: ${req.params.id} not found.`);
    }
    serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
  } catch (err) {
    next(err);
  }
};

const update = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  // TODO: fix this
  try {
    const newBook = {
      ...(req.body.title && { slug: slugify(req.body.title) }),
      ...req.body,
    };
    const updateOptions = {
      new: true,
    };

    const updatedBook = await Book.findOneAndUpdate(
      { _id: req.params.id },
      newBook,
      updateOptions
    );
    if (!updatedBook) {
      throw new Api404Error(`books with id: ${req.params.id} not found.`);
    }

    serverResponses.sendSuccess(res, messages.SUCCESSFUL, updatedBook);
  } catch (err) {
    next(err);
  }
};

const download = async (
  req: Request<{ id: string }, unknown, unknown, { type?: TypeFile }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      throw new Api404Error(`book with id: ${req.params.id} not found.`);
    }
    // * increase downloaded property here
    book.downloaded++;
    book.save();

    if (!req.query.type) req.query.type = "pdf";
    if (!["pdf", "epub"].includes(req.query.type)) {
      throw new Api400Error(`Cannot find ${req.query.type} type.`);
    }
    if (req.query.type === "pdf" && !book.pdfFile) {
      throw new Api404Error(
        `Cannot find pdf file for book (${req.params.id}).`
      );
    }
    if (req.query.type === "epub" && !book.ePubFile) {
      throw new Api404Error(
        `Cannot find epub
         file for book (${req.params.id}).`
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (req.query.type === "pdf") req.params.id = book.pdfFile!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (req.query.type === "epub") req.params.id = book.ePubFile!;

    return downloadFile(req, res, next);
  } catch (err) {
    next(err);
  }
};

const latest = async (
  req: RequestQuery<KeysetPagination>,
  res: Response,
  next: NextFunction
) => {
  try {
    // Default value
    req.query.sort = "title";
    req.query.q = "";

    return searchBooks(req, res, next);
  } catch (err) {
    next(err);
  }
};

const trending = async (
  req: RequestQuery<KeysetPagination>,
  res: Response,
  next: NextFunction
) => {
  try {
    // Default value
    req.query.sort = "downloaded";
    req.query.q = "";

    return searchBooks(req, res, next);
  } catch (err) {
    next(err);
  }
};

const popular = async (
  req: RequestQuery<KeysetPagination>,
  res: Response,
  next: NextFunction
) => {
  try {
    // Default value
    req.query.sort = "views";
    req.query.q = "";

    return searchBooks(req, res, next);
  } catch (err) {
    next(err);
  }
};

export {
  findAll,
  create,
  findOne,
  remove,
  update,
  addAuthor,
  addTags,
  createBatch,
  latest,
  trending,
  popular,
  download,
};
