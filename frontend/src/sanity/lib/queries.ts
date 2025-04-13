// ./src/sanity/lib/queries.ts

// common fields
const postPreviewFields = `
  _id,
  title,
  slug,
  publishedAt,
  mainImage {
    asset->{
      _id,
      url
    },
    alt
  },
  categories[]->{
    title,
    slug
  }
`;

// one post (for PostDetail)
export const postQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    ${postPreviewFields},
    body
  }
`;

// all posts (for Blog index)
export const postsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    ${postPreviewFields}
  }
`;

// posts by category
export const postsByCategoryQuery = `
  *[
    _type == "post" &&
    $categorySlug in categories[]->slug.current
  ] | order(publishedAt desc) {
    ${postPreviewFields}
  }
`;

// used categories (for filter list)
export const usedCategoriesQuery = `
  *[_type == "category" && count(*[_type == "post" && references(^._id)]) > 0] {
    title,
    "slug": slug.current,
    _id
  }
`;

// export const siteSettingsQuery = `
//   *[_type == "siteSettings"][0] {
//     title,
//     description,
//     logo,
//     socialMedia {
//       title,
//       url
//     }
//   }
// `;

export const tagsQuery = `
  *[_type == "tag"] | order(title asc) {
    _id,
    title,
    slug
  }
`;
