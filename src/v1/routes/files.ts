import express from "express";
import { getAllFiles, stat, download } from "~/controllers/files";

const router = express.Router();

router.get("/", getAllFiles);
router.get("/:id", download);
router.get("/:id/stat", stat);

export default router;
