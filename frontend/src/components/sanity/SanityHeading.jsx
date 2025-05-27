export default function HeadingBlock({ children }) {
  // Ensure children is always an array
  const childArray = Array.isArray(children) ? children : [children];

  const text = childArray
    .map((c) => (typeof c === "string" ? c : c?.text || ""))
    .join(" ");

  const id = text
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");

  return (
    <h2 id={id}>
      <a href={`#${id}`} className="heading-anchor">
        🔗
      </a>
      {children}
    </h2>
  );
}
