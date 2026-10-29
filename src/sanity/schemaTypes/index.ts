import { type SchemaTypeDefinition } from "sanity";
import { productType } from "./product";
import { categoryType } from "./category";
import { siteSettingsType } from "./siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productType, categoryType, siteSettingsType],
};