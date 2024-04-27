import { JSONSchemaType } from "ajv";
import type { ICollection } from "~/models/collection";

const collectionPostSchema: JSONSchemaType<
  Omit<ICollection, "slug" | "books">
> = {
  type: "object",
  properties: {
    name: { type: "string" },
    description: { type: "string", nullable: true },
    coverUrl: { type: "string", nullable: true },
    views: { type: "number" },
  },
  required: [],
  additionalProperties: true,
};

export default collectionPostSchema;
// pattern: "/^[0-9a-fA-F]{24}$/"
