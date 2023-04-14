import { JSONSchemaType } from "ajv";
import { IBaseBook } from "~/models/book";

const bookPutSchema: JSONSchemaType<IBaseBook> = {
  type: "object",
  properties: {
    title: { type: "string" },
    description: { type: "string", nullable: true },
    downloaded: { type: "integer" },
    coverUrl: { type: "string", nullable: true },
    readTime: { type: "number", nullable: true },
    wordCount: { type: "number", nullable: true },
    pages: { type: "number", nullable: true },
    views: { type: "number" },
    pdfFile: { type: "string", nullable: true },
    ePubFile: { type: "string", nullable: true },
  },
  required: [],
  additionalProperties: true,
};

export default bookPutSchema;
// pattern: "/^[0-9a-fA-F]{24}$/"
