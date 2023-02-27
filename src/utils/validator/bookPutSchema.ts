import { JSONSchemaType } from "ajv";
import { IBaseBook } from "~/models/book";

const bookPutSchema: JSONSchemaType<IBaseBook> = {
  type: "object",
  properties: {
    title: { type: "string" },
    basename: { type: "string" },
    downloaded: { type: "integer", nullable: true },
    coverUrl: { type: "string", nullable: true },
  },
  required: [],
  additionalProperties: false,
};

export default bookPutSchema;
// pattern: "/^[0-9a-fA-F]{24}$/"
