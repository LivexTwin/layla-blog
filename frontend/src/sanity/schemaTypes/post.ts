// ./src/sanity/schemaTypes/post.ts
import { defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";

export const postType = defineType({
  name: "post",
  type: "document",
  icon: BookIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      description:
        "Automatically generated from the title. You can edit it for clarity. Keep it under 96 characters.",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/['’]/g, "") // remove apostrophes
            .replace(/\s+/g, "-") // replace spaces with hyphens
            .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
            .slice(0, 96),
      },
    }),
    defineField({
      name: "author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
        // metadata: ["lqip"],
        metadata: ["lqip", "palette", "blurhash"],
      },
      validation: (Rule) =>
        Rule.required().error("Main image is required for every post."),
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Important for SEO and accessibility.",
          validation: (Rule) =>
            Rule.error("You have to fill out the alternative text").required(),
        },
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }], // <-- wrap it in an array
      description:
        "Pick the primary category this post belongs to. This helps users find related content more easily.",
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      description: "Add up to 3 tags to describe this post (optional).",
      validation: (Rule) => Rule.max(3),
    }),

    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Published At",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
      description:
        "A short summary of the post, used for SEO and social media previews.",
      validation: (Rule) =>
        Rule.max(160).warning("Keep it under 160 characters for best SEO."),
    }),
    {
      name: "description",
      type: "text",
      title: "SEO Description",
      description: "This will be used for SEO meta tags and search engines.",
      validation: (Rule) =>
        Rule.max(160).warning("Try to keep it under 160 characters"),
    },

    defineField({
      name: "body",
      type: "blockContent",
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
