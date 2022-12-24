import winston from "winston";
import { noSpecialChars } from "../lib/noSpecialChars";
import { removeLineBreak } from "../lib/removeLineBreak";

const timestampOptions = { format: "YYYY-MM-DD HH:mm:ss:ms" };

const consoleFormat = winston.format.combine(
  winston.format.timestamp(timestampOptions),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} level: ${info.level}: message: ${removeLineBreak(info.message)}`
  ),
);

const defaultFormat = winston.format.combine(
  winston.format.timestamp(timestampOptions),
  winston.format.printf(
    (info) =>
      `{"timestamp": "${info.timestamp}", "level": "${info.level}", "message": "${noSpecialChars(removeLineBreak(info.message))}"}`
  )
);

const transports = [
  // Allow the use the console to print the messages
  new winston.transports.Console({
    format: consoleFormat,
    level: "http",
  }),
  // Allow to print all the error level messages inside the error.log file
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
  }),
  // Allow to print all the error message inside the all.log file
  // (also the error log that are also printed inside the error.log(
  new winston.transports.File({
    filename: "logs/app.log",
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    level: "http",
  }),
];

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  format: defaultFormat,
  transports,
  exitOnError: false,
});

export default logger;
