# Design source

The existing site uses a black background, white typography, gray borders, uppercase navigation with wide tracking, and the current responsive spacing scale. Preserve these tokens and the logo.

## Decisions

| Date | Change | Replaces | Reason |
| --- | --- | --- | --- |
| 2026-10-19 | Header navigation responds to the header's available inline size; below 1180px use the existing hamburger menu, below 600px hide the agency descriptor. Keep logo and controls on one row. | Viewport-only navigation breakpoints and wrapping logo text. | An open hub chat panel reduces the page width while the viewport remains wide; all navigation must remain reachable down to a 400px page width. |
