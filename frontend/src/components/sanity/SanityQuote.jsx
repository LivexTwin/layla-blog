// ./src/components/QuoteComponent.jsx
export default function QuoteComponent({
  node: { text = "No quote text provided.", author, url },
}) {
  return (
    <figure className="quote">
      <blockquote className="quote__text" cite={url}>
        {text}
      </blockquote>
      {author && (
        <figcaption className="quote__author">
          —{" "}
          {url ? (
            <a href={url} target="_blank" rel="noopener noreferrer">
              {author}
            </a>
          ) : (
            author
          )}
        </figcaption>
      )}
    </figure>
  );
}
