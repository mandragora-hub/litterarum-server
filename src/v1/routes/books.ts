import express from "express";
import validateBody from "~/middleware/validateBody";
import { bookPostSchema, authorPostSchema } from "~/utils/validator";
import { findAll, findOne, create, update, remove, addAuthor } from "~/controllers/books";

const router = express.Router();

router.get("/", findAll);
router.get("/:id", findOne);
router.post("/", validateBody(bookPostSchema), create);
router.put("/:id", validateBody(bookPostSchema), update);
router.delete("/:id", remove);
router.post("/:id/author", validateBody(authorPostSchema), addAuthor);
// router.post("/:id/author", validateBody(authorPostSchema), addTags);


export default router;
