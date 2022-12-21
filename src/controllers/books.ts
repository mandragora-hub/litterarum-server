import { Request, Response, NextFunction } from "express";
import serverResponses from "~/utils/helpers/responses";
import messages from "~/config/messages";
import Api404Error from "~/utils/api404Error";
import { Book } from "~/models/book";
import { Author } from "~/models/author";
// import { SysTag } from "~/models/sysTag";

const findAll = (req: Request, res: Response, next: NextFunction) => {
  Book.find({}, { __v: 0 })
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
  req: Request<{ id: string }>,
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
    const newBook = req.body;
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

export { findAll, create, findOne, remove, update, addAuthor };
