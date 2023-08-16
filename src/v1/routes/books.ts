import express from "express";
import { validateBody, validateBatch } from "~/middleware";
import {
  bookPostSchema,
  bookPutSchema,
  authorPostSchema,
  tagPostSchema,
} from "~/utils/validator";
import {
  findAll,
  findOne,
  latest,
  create,
  update,
  remove,
  addAuthor,
  addTags,
  download,
  trending,
  popular,
} from "~/controllers/books";
import authenticate from "~/middleware/passport";

const router = express.Router();

router.get("/", findAll);
router.get("/latest", latest);
router.get("/trending", trending);
router.get("/popular", popular);
// router.get("/top-rate", topRate);
router.get("/:id", findOne);
router.post("/", authenticate, validateBody(bookPostSchema), create);
router.put("/:id", authenticate, validateBody(bookPutSchema), update);
router.delete("/:id", authenticate, remove);
router.post(
  "/:id/author",
  authenticate,
  validateBody(authorPostSchema),
  addAuthor
);
router.post("/:id/tags", authenticate, validateBatch(tagPostSchema), addTags);
router.get("/:id/download", download);

export default router;
