import { sanityClient } from "sanity:client";
import {
  postsQuery,
  postsByCategoryQuery,
  usedCategoriesQuery,
  postQuery,
  relatedPostsQuery,
  nextPostQuery,
  prevPostQuery,
} from "../sanity/lib/queries";

// Fetch single post by slug
export async function getPostBySlug(slug: string) {
  return sanityClient.fetch(postQuery, { slug });
}

export async function getAllPosts() {
  return sanityClient.fetch(postsQuery);
}

export async function getPostsByCategory(categorySlug: string) {
  return sanityClient.fetch(postsByCategoryQuery, { categorySlug });
}

export async function getUsedCategories() {
  return sanityClient.fetch(usedCategoriesQuery);
}

export async function getCategorySlugs() {
  return sanityClient.fetch(`
      *[_type == "category" && defined(slug.current)]{
        "slug": slug.current
      }
    `);
}

export async function getRelatedPosts(slug: string) {
  const post = await getPostBySlug(slug);

  // Check if the category is present and access the _id of the category
  const categoryId = post.category?._id; // Access the _id of the category directly

  // If no category is found, log and return an empty array
  if (!categoryId) {
    // Optional: only warn in dev
    if (import.meta.env.DEV) {
      console.warn(
        `Post "${slug}" does not have a category assigned. Skipping related posts.`
      );
    }
    return [];
  }

  // Fetch related posts by categoryId, excluding the current post's ID
  return sanityClient.fetch(relatedPostsQuery, {
    categoryId,
    postId: post._id,
  });
}

// Fetch next post after a given date
export async function getNextPost(publishedAt: string) {
  return sanityClient.fetch(nextPostQuery, { publishedAt });
}

// Fetch previous post before a given date
export async function getPrevPost(publishedAt: string) {
  return sanityClient.fetch(prevPostQuery, { publishedAt });
}

// export {};
