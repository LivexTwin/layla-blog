// ./src/sanity/schemaTypes/index.ts
import type { SchemaTypeDefinition } from "sanity";
import { authorType } from "./author";
import { blockContentType } from "./blockContent";
import { categoryType } from "./category";
import { postType } from "./post";
import { tagType } from "./tag";
import { figureType } from "./figure";

import siteSettings from "./siteSettings";
import colors from "./colors";
import navigation from "./navigation";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    authorType,
    blockContentType,
    categoryType,
    postType,
    tagType,

    siteSettings,
    colors,
    navigation,
    figureType,
  ],
};
