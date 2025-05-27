// src/utils/formatDate.ts
export function formatDate(dateStr: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateStr).toLocaleDateString(undefined, options);
}
