import express from "express";
import { validateBody, validateBatch } from "~/middleware";
import {
  bookPostSchema,
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
} from "~/controllers/books";

const router = express.Router();

router.get("/", findAll);
router.get("/latest", latest);
router.get("/:id", findOne);
router.post("/", validateBody(bookPostSchema), create);
router.put("/:id", validateBody(bookPostSchema), update);
router.delete("/:id", remove);
router.post("/:id/author", validateBody(authorPostSchema), addAuthor);
router.post("/:id/tags", validateBatch(tagPostSchema), addTags);

export default router;
