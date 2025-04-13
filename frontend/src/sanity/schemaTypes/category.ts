// ./src/sanity/schemaTypes/category.ts
import { defineField, defineType } from "sanity";

// export const categoryType = defineType({
//   name: "category",
//   type: "document",
//   fields: [
//     defineField({
//       name: "title",
//       type: "string",
//     }),
//     defineField({
//       name: "description",
//       type: "text",
//     }),
//   ],

// });

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      description: "Optional description of the category",
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title", // 👈 auto-generates slug from the title
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
