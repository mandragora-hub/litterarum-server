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
  mostDownloaded,
  popular,
  increaseViewsCount,
  increaseDownloadCount,
} from "~/controllers/books";
import authenticate from "~/middleware/passport";

const router = express.Router();

router.get("/", findAll);
router.get("/latest", latest);
router.get("/popular", popular);
router.get("/most_downloaded", mostDownloaded);
// router.get("/trending", trending);
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
router.post("/:id/hit/views", increaseViewsCount);
router.post("/:id/hit/download", increaseDownloadCount);

export default router;
