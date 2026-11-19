/** URL slug for a display name: lowercase, '&' becomes 'and', other runs of non-alphanumerics become '-'. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
