import express from "express";
import rateLimit from "express-rate-limit";
import multer from "multer";
import { getAllFiles, stat, download, handleUpload } from "~/controllers/files";

const memoryStorage = multer.memoryStorage();
const multerMiddleware = multer({
  storage: memoryStorage,
  limits: {
    fileSize: 1024 * 1024 * 10, // 10mb
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .pdf format allowed!"));
    }
  },
}).array("files");

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // Limit each IP to 10 requests per `window` (here, per 5 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const router = express.Router();

router.get("/", getAllFiles);
router.post("/upload", multerMiddleware, handleUpload);
router.get("/:id", limiter, download);
router.get("/:id/stat", stat);

export default router;
