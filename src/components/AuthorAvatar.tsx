import { useState } from "react";

// Inline SVG silhouette — used when an author has no image or the image fails to load.
// Inlined as a data URI so the placeholder works offline and survives any CDN going down.
const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>" +
      "<circle cx='50' cy='50' r='50' fill='#dee2e6'/>" +
      "<circle cx='50' cy='40' r='15' fill='#adb5bd'/>" +
      "<path d='M20 90 a30 30 0 0 1 60 0z' fill='#adb5bd'/>" +
      "</svg>"
  );

interface Props {
  src?: string | null;
  alt?: string;
  className?: string;
}

export function AuthorAvatar({
  src,
  alt = "",
  className,
}: Props): JSX.Element {
  const [errored, setErrored] = useState(false);
  const finalSrc = !src || errored ? PLACEHOLDER : src;
  return (
    <img
      src={finalSrc}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
    />
  );
}
