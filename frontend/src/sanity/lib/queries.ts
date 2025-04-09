// ./src/sanity/lib/queries.ts

export const postQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    title,
    body,
    mainImage,
    tags[]-> { 
    _id,
     title,
     slug }
  }
`;

export const postsQuery = `
    *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        mainImage
    }
`;

export const tagsQuery = `
  *[_type == "tag"] | order(title asc) {
    _id,
    title,
    slug
  }
`;

// Query for posts that are associated with a specific tag, useful for a tag page
export const postsByTagQuery = `
  *[_type == "post" && references(*[_type == "tag" && slug.current == $slug]._id)] {
    _id,
    title,
    slug,
    body,
    tags[]-> { _id, title, slug }
  }
`;
