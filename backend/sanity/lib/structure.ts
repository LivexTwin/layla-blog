// ./src/sanity/lib/structure.ts
import { CogIcon, FilterIcon } from "@sanity/icons";

export const myStructure = (S) =>
  S.list()
    .title("Content") // You can choose a title here, like "Settings" or anything you prefer
    .items([
      S.listItem()
        .title("Filtered Posts")
        .icon(FilterIcon) // You can choose any icon you like here
        .child(
          S.list()
            .title("Filters")
            .items([
              S.listItem()
                .title("Posts By Category")
                .child(
                  S.documentTypeList("category")
                    .title("Posts by Category")
                    .child((categoryId) =>
                      S.documentList()
                        .title("Posts")
                        .filter(
                          '_type == "post" && category._ref == $categoryId'
                        )
                        .params({ categoryId })
                    )
                ),
              S.listItem()
                .title("Posts By Author")
                .child(
                  S.documentTypeList("author")
                    .title("Posts by Author")
                    .child((authorId) =>
                      S.documentList()
                        .title("Posts")
                        .filter('_type == "post" && $authorId == author._ref')
                        .params({ authorId })
                    )
                ),
            ])
        ),
      S.listItem().title("All Posts").child(
        /* Create a list of all posts */
        S.documentList().title("All Posts").filter('_type == "post"')
      ),
      S.divider(),
      // The rest of this document is from the original manual grouping in this series of articles
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["post", "siteSettings", "navigation", "colors"].includes(
            listItem.getId()
          )
      ),
      S.divider(),
      S.listItem()
        .title("Site Settings")
        .icon(CogIcon) // You can choose any icon you like here
        .child(
          S.list()
            // Sets a title for our new list
            .title("Settings Documents")
            // Add items to the array
            // Each will pull one of our new singletons
            .items([
              S.listItem()
                .title("Metadata")
                .child(
                  S.document()
                    .schemaType("siteSettings")
                    .documentId("siteSettings")
                ),
              S.listItem()
                .title("Site Colors")
                .child(S.document().schemaType("colors").documentId("colors")),
              S.listItem()
                .title("Main Navigation")
                .child(
                  S.document().schemaType("navigation").documentId("navigation")
                ),
            ])
        ),
    ]);
