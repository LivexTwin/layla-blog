// schemaTypes/navigation.ts
// schemas/navigation.ts
export default {
  name: "navigation",
  title: "Main Navigation",
  type: "document",
  fields: [
    {
      name: "menuItems",
      title: "Menu Items",
      type: "array",
      of: [{ type: "string" }], // or a reference or custom object
    },
  ],
};
