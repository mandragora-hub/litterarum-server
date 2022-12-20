import express from "express";
import validateBody from "~/middleware/validateBody";
import { tagPostSchema } from "~/types/validator";
import { findAll, findOne, create, remove, update } from "~/controllers/tags";

const router = express.Router();

router.get("/", findAll);
router.get("/:id", findOne);
router.post("/", validateBody(tagPostSchema), create);
router.put("/:id", validateBody(tagPostSchema), update);
router.delete("/:id", remove);

export default router;
