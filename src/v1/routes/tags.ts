import express from "express";
import validateBody from "~/middleware/validateBody";
import { tagPostSchema } from "~/utils/validator";
import { findAll, findOne, create, remove, update } from "~/controllers/tags";
import authenticate from "~/middleware/passport";

const router = express.Router();

router.get("/", findAll);
router.get("/:id", findOne);
router.post("/", authenticate, validateBody(tagPostSchema), create);
router.put("/:id", authenticate, validateBody(tagPostSchema), update);
router.delete("/:id", authenticate, remove);

export default router;
