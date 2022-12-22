import express from "express";
import { findAll, findOne, create, update, remove } from "~/controllers/author";
import validateBody from "~/middleware/validateBody";
import { authorPostSchema } from "~/utils/validator";

const router = express.Router();

router.get("/", findAll);
router.get("/:id", findOne);
router.post("/", validateBody(authorPostSchema), create);
router.put("/:id", validateBody(authorPostSchema), update);
router.delete("/:id", remove);

export default router;
