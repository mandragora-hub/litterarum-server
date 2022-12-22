import { IAuthor } from "~/models/author";
import { JSONSchemaType } from "ajv";

const authorPostSchema: JSONSchemaType<IAuthor> = {
  type: "object",
  properties: {
    name: { type: "string" },
    biography: { type: "string", nullable: true },
    photoUrl: { type: "string", nullable: true },
  },
  required: ["name"],
  additionalProperties: false,
};

export default authorPostSchema;
