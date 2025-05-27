// utils/readingTime.js
export function getReadingTime(estimatedTime) {
  const time = Number(estimatedTime);
  return time > 0 ? `${time} min read` : "1 min or less";
}
