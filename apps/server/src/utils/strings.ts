export const toSlug = (str: string) => {
  return str.toLowerCase()
    .replace(/[^\w\s]+/g, "")
    .replace(/\s+/g, "-");
}