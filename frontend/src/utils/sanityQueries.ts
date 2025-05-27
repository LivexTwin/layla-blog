import { sanityClient } from "sanity:client";
import {
  postsQuery,
  postsByCategoryQuery,
  usedCategoriesQuery,
  postQuery,
  relatedPostsQuery,
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

  // Log the post data to inspect the structure
  console.log("Post Data:", post);

  // Check if the category is present and access the _id of the category
  const categoryId = post.category?._id; // Access the _id of the category directly

  console.log("Category ID:", categoryId);

  // If no category is found, log and return an empty array
  if (!categoryId) {
    console.warn(
      `Post "${slug}" does not have a category assigned. Skipping related posts.`
    );
    return [];
  }

  // Fetch related posts by categoryId, excluding the current post's ID
  return sanityClient.fetch(relatedPostsQuery, {
    categoryId,
    postId: post._id,
  });
}

// export {};
