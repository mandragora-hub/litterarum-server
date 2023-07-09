import express from "express";
import rateLimit from 'express-rate-limit'
import { getAllFiles, stat, download } from "~/controllers/files";


const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 5, // Limit eac5h IP to 5 requests per `window` (here, per 5 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const router = express.Router();

router.get("/", getAllFiles);
router.get("/:id", limiter, download);
router.get("/:id/stat", stat);

export default router;
