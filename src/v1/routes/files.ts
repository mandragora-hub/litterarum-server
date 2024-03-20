import express from "express";
import rateLimit from "express-rate-limit";
import { getAllFiles, stat, download, handleUpload } from "~/controllers/files";

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // Limit each IP to 10 requests per `window` (here, per 5 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const router = express.Router();

router.get("/", getAllFiles);
router.post("/upload", handleUpload);
router.get("/:id", limiter, download);
router.get("/:id/stat", stat);

export default router;
