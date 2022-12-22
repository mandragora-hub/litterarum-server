import { JSONSchemaType } from "ajv";

interface IBookPost {
  title: string;
  basename: string;
  downloaded?: number;
  authorId: string;
  tagsId?: string[];
}

const bookPostSchema: JSONSchemaType<IBookPost> = {
  type: "object",
  properties: {
    title: { type: "string" },
    basename: { type: "string" },
    downloaded: { type: "integer", nullable: true },
    authorId: { type: "string" },
    tagsId: { type: "array", nullable: true, items: { type: "string" } },
  },
  required: ["title", "basename", "authorId"],
  additionalProperties: false,
};

export default bookPostSchema;
// pattern: "/^[0-9a-fA-F]{24}$/"
