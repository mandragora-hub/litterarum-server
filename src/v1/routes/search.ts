import express from "express";
import { books } from "~/controllers/search";

const router = express.Router();

router.get("/books", books);

export default router;
