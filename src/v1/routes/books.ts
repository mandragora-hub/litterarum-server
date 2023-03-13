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
} from "~/controllers/books";

const router = express.Router();

router.get("/", findAll);
router.get("/latest", latest);
// router.get("/trending", trending);
// router.get("/popular", popular);
// router.get("/top-rate", topRate);
router.get("/:id", findOne);
router.post("/", validateBody(bookPostSchema), create);
router.put("/:id", validateBody(bookPutSchema), update);
router.delete("/:id", remove);
router.post("/:id/author", validateBody(authorPostSchema), addAuthor);
router.post("/:id/tags", validateBatch(tagPostSchema), addTags);
router.get("/:id/download", download);

export default router;
