import { JSONSchemaType } from "ajv";
import { IBaseBook } from "~/models/book";

const bookPostSchema: JSONSchemaType<IBaseBook> = {
  type: "object",
  properties: {
    title: { type: "string" },
    basename: { type: "string" },
    downloaded: { type: "integer", default: 0 },
    coverUrl: { type: "string", nullable: true },
    readTime: { type: "number", nullable: true },
    wordCount: { type: "number", nullable: true },
    pages: { type: "number", nullable: true },
    views: { type: "number", default: 0 },
    downloadPdfLink: { type: "string", nullable: true },
    downloadEPubLink: { type: "string", nullable: true },
  },
  required: ["title", "basename"],
  additionalProperties: true,
};

export default bookPostSchema;
// pattern: "/^[0-9a-fA-F]{24}$/"
