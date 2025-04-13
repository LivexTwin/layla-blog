import {
  getAllPosts,
  getPostsByCategory,
  getUsedCategories,
} from "./sanityQueries";

export async function getBlogIndexData({ slug = null }) {
  const categories = await getUsedCategories();
  const posts = slug ? await getPostsByCategory(slug) : await getAllPosts();

  return { categories, posts, categorySlug: slug };
}
