import { ISysTag } from "~/models/sysTag";
import { JSONSchemaType } from "ajv";

const tagPostSchema: JSONSchemaType<ISysTag> = {
  type: "object",
  properties: {
    tag: { type: "string" },
  },
  required: ["tag"],
  additionalProperties: false,
};

export default tagPostSchema;
