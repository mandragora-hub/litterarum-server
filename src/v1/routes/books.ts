import express from "express";
import validateBody from "~/middleware/validateBody";
import { bookPostSchema } from "~/types/validator";
import { findAll, findOne, create, update, remove } from "~/controllers/books";

const router = express.Router();

router.get("/", findAll);
router.get("/:id", findOne);
router.post("/", validateBody(bookPostSchema), create);
router.put("/:id", validateBody(bookPostSchema), update);
router.delete("/:id", remove);

export default router;
