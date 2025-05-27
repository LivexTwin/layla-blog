// ./src/sanity/schemaTypes/quote.ts
import { defineType, defineField } from "sanity";
import { BlockquoteIcon } from "@sanity/icons";

export const quoteType = defineType({
  name: "quote",
  type: "object",
  title: "Quote",
  icon: BlockquoteIcon,
  fields: [
    defineField({
      name: "text",
      type: "text",
      title: "Text",
    }),
    defineField({
      name: "author",
      type: "string",
      title: "Author",
    }),
    defineField({
      name: "url",
      type: "url",
      title: "URL",
      description: "Source on the web",
    }),
  ],
  preview: {
    select: {
      text: "text",
      author: "author",
    },
    prepare(selection) {
      const { text, author } = selection;
      return {
        title: text ? `"${text}"` : "No quote text",
        subtitle: author ? `— ${author}` : "",
      };
    },
  },
});
