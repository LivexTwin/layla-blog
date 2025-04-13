// /cypress/e2e/blog.cy.js
describe("Blog post page loads with Sanity content", () => {
  const slug = "hello-world"; // replace with your actual test slug

  it("renders blog page with correct title and heading", () => {
    cy.visit(`/blog/${slug}`);

    // Check that the h1 heading matches what Sanity returned
    cy.get("h1").should("contain.text", "Hello World"); // match your actual post title
  });
});

describe("Blog category filtering works", () => {
  it("filters posts by selected category", () => {
    // Navigate to the filtered category
    cy.visit("/blog/category/a-category-test"); // Adjust the URL to match your test category

    // Verify the page shows posts only from the selected category
    cy.get("article").should("have.length", 2); // Adjust based on expected number of posts

    // Verify all posts are displayed again
    cy.get("article").should("have.length", 2); // Adjust based on total posts
  });
});
