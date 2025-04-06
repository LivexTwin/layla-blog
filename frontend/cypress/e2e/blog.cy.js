describe("Blog post page loads with Sanity content", () => {
  const slug = "hello-world"; // replace with your actual test slug

  it("renders blog page with correct title and heading", () => {
    cy.visit(`/blog/${slug}`);

    // Check that the h1 heading matches what Sanity returned
    cy.get("h1").should("contain.text", "Hello World"); // match your actual post title
  });
});
