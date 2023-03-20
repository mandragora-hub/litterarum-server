import { JSONSchemaType } from "ajv";
import { IBaseBook } from "~/models/book";

const bookPutSchema: JSONSchemaType<IBaseBook> = {
  type: "object",
  properties: {
    title: { type: "string" },
    basename: { type: "string" },
    downloaded: { type: "integer" },
    coverUrl: { type: "string", nullable: true },
    readTime: { type: "number", nullable: true },
    wordCount: { type: "number", nullable: true },
    pages: { type: "number", nullable: true },
    views: { type: "number" },
  },
  required: [],
  additionalProperties: true,
};

export default bookPutSchema;
// pattern: "/^[0-9a-fA-F]{24}$/"
