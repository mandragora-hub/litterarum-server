import { JSONSchemaType } from "ajv";
import { IBaseBook } from "~/models/book";

const bookPostSchema: JSONSchemaType<IBaseBook> = {
  type: "object",
  properties: {
    title: { type: "string" },
    basename: { type: "string" },
    downloaded: { type: "integer", nullable: true, default: 0 },
  },
  required: ["title", "basename"],
  additionalProperties: false,
};

export default bookPostSchema;
// pattern: "/^[0-9a-fA-F]{24}$/"
