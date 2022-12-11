import { Request, Response, NextFunction } from 'express'
import logger from "./helpers/logger";

export function logError(err: Error, req: Request, res: Response, next: NextFunction) {
    logger.error(err.stack)
    next(err)
}

export function sendError(err: Error, req: Request, res: Response) {
    return res.status(500).send({ status: 'FAILED', message: err.message })
}

export default {
    logError,
    sendError
}