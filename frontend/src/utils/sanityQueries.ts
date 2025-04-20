import { sanityClient } from "sanity:client";
import {
  postsQuery,
  postsByCategoryQuery,
  usedCategoriesQuery,
  postQuery,
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

// pagination

// export {};
