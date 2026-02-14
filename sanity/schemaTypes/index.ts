import { type SchemaTypeDefinition } from "sanity";
import { menuItem } from "./menuItem";
import { order } from "./order";
import { siteSettings } from "./siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [menuItem, siteSettings, order],
};
