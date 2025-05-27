import React, { useState, useEffect } from "react";
import getImageProps from "../sanity/lib/get-image-props"; // Assuming this is imported correctly

// LazySanityImage component
const LazySanityImage = ({
  image,
  maxWidth = 600,
  loading = "lazy",
  alt = "",
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!image || !image.asset) {
    console.warn("SanityImage: No image data passed:", image);
    return null;
  }

  // Fetch image properties for src, srcset, sizes, width, and height
  const { src, srcset, sizes, width, height } = getImageProps({
    image,
    maxWidth,
  });

  // Fetch the LQIP placeholder image
  const lqip = image?.asset?.metadata?.lqip;

  const fetchpriority = loading === "eager" ? "high" : undefined;

  // Handle image load event
  const onImageLoad = () => {
    setImageLoaded(true);
    console.log("Full image loaded");
  };

  // Log to debug if imageLoaded state is working
  console.log("Image loaded:", imageLoaded);
  console.log("LQIP:", lqip);
  console.log("Full image src:", src);

  return (
    <img
      style={{ height: "auto" }}
      loading={loading}
      fetchpriority={fetchpriority}
      alt={alt || ""}
      src={imageLoaded ? src : lqip} // Show LQIP until full image loads
      srcSet={srcset}
      sizes={sizes}
      width={width}
      height={height}
      onLoad={onImageLoad} // Trigger image load event
    />
  );
};

export default LazySanityImage;
