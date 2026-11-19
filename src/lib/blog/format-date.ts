export const DATE_LOCALE = 'en-GB'

export interface FormattedDate {
  /** Value for the `datetime` attribute of `<time>`: YYYY-MM-DD in UTC. */
  datetime: string
  /** Reader-facing label, for example "8 September 2026". */
  label: string
}

/** The one date format of the blog. UTC, so a build machine's zone never moves the day. */
export function formatDate(
  date: string | Date,
  locale: string = DATE_LOCALE,
): FormattedDate {
  const instant = new Date(date)
  return {
    datetime: instant.toISOString().slice(0, 10),
    label: new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(instant),
  }
}
