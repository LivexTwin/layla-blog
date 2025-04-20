// ./src/sanity/schemaTypes/figureType.ts
import { defineField, defineType } from "sanity"; // Importing necessary methods

export const figureType = defineType({
  name: "figure",
  title: "Figure Image (with Attribution)",
  type: "object",
  fields: [
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: { hotspot: true },
    }),
    defineField({
      name: "caption",
      type: "string",
      title: "Caption (Required)",
      description: "This describes the image and appears as a figcaption.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "attribution",
      type: "string",
      title: "Attribution Name (Required)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "attributionLink",
      type: "url",
      title: "Attribution Link (If Available)",
      description: "URL to the source of the image.",
    }),
    defineField({
      name: "alt",
      type: "string",
      title: "Alternative Text (Optional)",
      description:
        "Optional for figure images. Only use if the caption does not fully describe the image.",
    }),
  ],
});
