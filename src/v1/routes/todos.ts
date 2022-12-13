import express from "express";
import { createNewTodos, getAllTodos, getOneTodos } from "~/controllers/todos";

const router = express.Router();

router.get("/", getAllTodos);
router.get("/:id", getOneTodos);
router.post("/", createNewTodos);

export default router;