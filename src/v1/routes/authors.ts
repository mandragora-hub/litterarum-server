import express from "express";
import { findAll, findOne, create, update, remove } from "~/controllers/author";
import validateBody from "~/middleware/validateBody";
import { authorPostSchema } from "~/utils/validator";
import authenticate from "~/middleware/passport";

const router = express.Router();

router.get("/", findAll);
router.get("/:id", findOne);
router.post("/", authenticate, validateBody(authorPostSchema), create);
router.put("/:id", authenticate, validateBody(authorPostSchema), update);
router.delete("/:id", authenticate, remove);

export default router;
