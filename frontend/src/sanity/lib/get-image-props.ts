// ./sanity/lib/get-image-props.ts
// This file is used to generate image URLs for Sanity images, including webp format and optional properties like alt text, class names, width, height, and fit mode.

import { getImageDimensions } from "./get-image-dimensions";
import imageUrlBuilder from "@sanity/image-url";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET;

export const builder = imageUrlBuilder({ projectId, dataset });

const LARGEST_VIEWPORT = 1920;
const DEFAULT_WIDTH_STEPS = [400, 600, 850, 1000, 1150];
const DEFAULT_FULL_WIDTH_STEPS = [360, 414, 768, 1366, 1536, 1920];
const DEFAULT_MIN_STEP = 0.1;

export default function getImageProps({
  image,
  maxWidth: userMaxWidth,
  minimumWidthStep = DEFAULT_MIN_STEP,
  customWidthSteps,
  sizes,
}) {
  if (!image?.asset) return {};

  const maxWidth =
    typeof userMaxWidth === "number" ? userMaxWidth : LARGEST_VIEWPORT;

  const builderInstance = builder.image(image).fit("max").auto("format");
  const imageDimensions = getImageDimensions(image) || {
    width: LARGEST_VIEWPORT,
    height: LARGEST_VIEWPORT / 1.5,
    aspectRatio: 1.5,
  };

  const baseSizes = [
    maxWidth,
    ...(customWidthSteps ||
      (typeof userMaxWidth === "number"
        ? DEFAULT_WIDTH_STEPS
        : DEFAULT_FULL_WIDTH_STEPS)),
  ];

  const retinaSizes = Array.from(
    new Set([
      ...baseSizes,
      ...baseSizes.map((size) => size * 2),
      ...baseSizes.map((size) => size * 3),
    ])
  )
    .sort((a, b) => a - b)
    .filter(
      (size) => size <= imageDimensions.width * 1.1 && size <= maxWidth * 3
    )
    .filter((size, i, arr) => {
      const nextSize = arr[i + 1];
      return nextSize ? nextSize / size > minimumWidthStep + 1 : true;
    });

  const lqip = image.asset.metadata?.lqip;

  return {
    src: builderInstance.width(maxWidth).url(),
    srcset: retinaSizes
      .map((size) => `${builderInstance.width(size).url()} ${size}w`)
      .join(", "),
    sizes:
      userMaxWidth === "100vw"
        ? "100vw"
        : sizes || `(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`,
    width: retinaSizes[0],
    height: retinaSizes[0] / imageDimensions.aspectRatio,
    aspectRatio: imageDimensions.aspectRatio,
    lqip,
  };
}
