import express from "express";
import { Model } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { tagPostSchema, authorPostSchema } from "~/types/validator";
import validateBatch from "~/middleware/validateBatch";
import { Author, SysTag } from "~/models";
import serverResponses from "~/utils/helpers/responses";
import messages from "~/config/messages";

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function insertMany<T extends Model<any>, Data>(
  Model: T,
  data: Data,
  res: Response,
  next: NextFunction
) {
  try {
    Model.insertMany(data, function (err) {
      if (err) {
        throw new Error(err.message);
      }
      serverResponses.sendSuccess(res, messages.SUCCESSFUL);
    });
  } catch (err) {
    next(err);
  }
}

router.post(
  "/tags",
  validateBatch(tagPostSchema),
  (req: Request, res: Response, next: NextFunction) => {
    insertMany<typeof SysTag, object>(SysTag, req.body, res, next);
  }
);
router.post(
  "/authors",
  validateBatch(authorPostSchema),
  (req: Request, res: Response, next: NextFunction) => {
    insertMany<typeof Author, object>(Author, req.body, res, next);
  }
);

export default router;
