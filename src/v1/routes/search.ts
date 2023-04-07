import express from "express";
import { books, authors, tags } from "~/controllers/search";

const router = express.Router();

router.get("/books", books);
router.get("/authors", authors);
router.get("/tags", tags);

export default router;
