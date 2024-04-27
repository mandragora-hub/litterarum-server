import express from "express";
import { validateBody, validateBatch } from "~/middleware";
import {
  collectionPostSchema,
  collectionPutSchema,
  bookPostSchema,
} from "~/utils/validator";
import {
  findAll,
  findOne,
  latest,
  addBooks,
  create,
  update,
  remove,
  increaseViewsCount,
} from "~/controllers/collections";
import authenticate from "~/middleware/passport";

const router = express.Router();

router.get("/", findAll);
router.get("/latest", latest);
router.get("/:id", findOne);
router.post("/", authenticate, validateBody(collectionPostSchema), create);
router.put("/:id", authenticate, validateBody(collectionPutSchema), update);
router.delete("/:id", authenticate, remove);
router.post(
  "/:id/books",
  authenticate,
  validateBatch(bookPostSchema),
  addBooks,
);
router.post("/:id/hit/views", increaseViewsCount);

export default router;
