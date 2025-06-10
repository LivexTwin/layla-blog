// /cypress/e2e/blog.cy.js
describe("Blog post page loads with Sanity content", () => {
  const slug = "blog-post-2"; // replace with your actual test slug

  it("renders blog page with correct title and heading", () => {
    cy.visit(`/blog/${slug}`);

    // Check that the h1 heading matches what Sanity returned
    cy.get("h1").should("contain.text", "Blog Post 2"); // match your actual post title
  });
});

describe("Blog category filtering works", () => {
  it("filters posts by selected category", () => {
    cy.visit("/blog/category/a-category-test");

    // Ensure at least one post is shown
    cy.get("article").should("have.length.greaterThan", 0);

    // Adjust this to match an actual post title from your data (not 'Expected Post Title')
    cy.get("article").first().should("contain.text", "Blog Post 10"); // example real title
  });
});
