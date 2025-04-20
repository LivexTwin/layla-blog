// ./src/sanity/lib/queries.ts

// common fields
const postPreviewFields = `
  _id,
  title,
  slug,
  publishedAt,
  mainImage {
    asset,
    alt
  },
  category->{
    title,
    slug
  }
`;

// one post (for PostDetail)
// export const postQuery = `
//   *[_type == "post" && slug.current == $slug][0] {
//     ${postPreviewFields},
//     body
//   }
// `;

// one post (for PostDetail) with image and figure
export const postQuery = `
*[_type == "post" && slug.current == $slug][0] {
  ${postPreviewFields},
  tags[]->{
    _id,
    title,
    slug
  },


  body[] {
    ...,
    _type == "figure" => {
      _type,
      _key,
      "src": image.asset->url,
      "lqip": image.asset->metadata.lqip, 
      "alt": coalesce(alt, caption), // 🟢 fallback logic
      caption,
      attribution,
      attributionLink
    },
    markDefs[] {
      ...,
      _type == "internalLink" => {
        'type': @->_type,
        'slug': @->slug.current,
      }
    }
  }
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
    category->slug.current == $categorySlug
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
