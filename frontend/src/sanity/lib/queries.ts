// ./src/sanity/lib/queries.ts

// common fields
const postPreviewFields = `
  _id,
  title,
  slug,
  publishedAt,
    excerpt,
    description,
mainImage {
  asset->{
    _id,
    url,
    metadata {
      dimensions {
        width,
        height,
        aspectRatio
      },

    }
  },
  alt
},

  category-> {
    _id,
    title,
    slug
  },
   "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
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

// For next post (published after current)
export const nextPostQuery = `
*[_type == "post" && publishedAt > $publishedAt] | order(publishedAt asc)[0] {
  title,
  slug
}
`;

// For previous post (published before current)
export const prevPostQuery = `
*[_type == "post" && publishedAt < $publishedAt] | order(publishedAt desc)[0] {
  title,
  slug
}
`;

// all posts (for Blog index)
export const postsQuery = `
  *[_type == "post"] | order(publishedAt desc)[0...200] {
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
  *[_type == "category" && count(*[_type == "post" && references(^._id)]) > 0][0...8] {
    title,
    "slug": slug.current,
    _id
  }
`;

export const tagsQuery = `
  *[_type == "tag"] | order(title asc) {
    _id,
    title,
    slug
  }
`;

// need related posts query
export const relatedPostsQuery = `
  *[_type == "post" && category._ref == $categoryId && _id != $postId] 
  | order(publishedAt desc) [0..3] {
    ${postPreviewFields}
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
