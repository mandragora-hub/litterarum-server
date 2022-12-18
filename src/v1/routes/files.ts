import express from "express";
import { getAllFiles, stat, download } from "~/controllers/files";

const router = express.Router();

router.get("/", getAllFiles);
router.get("/:id", stat);
router.get("/:id/download", download);


export default router;