# TODO ideas

Here we collect enhancement ideas for the code; they're not critical for the prototype and can be time-consuming, so we're currently focusing on cost-effective solutions and make trade-offs to deliver quickly.

## For ChatGPT

- Generate code comments and file trees to include when coding with ChatGPT, similar to our conversations [jak rozmawiamy tutaj](https://chat.openai.com/c/1442f684-50ae-4a74-aa9c-fde3d9d1b47c)

## Toltips with definitions for visitiors

- In the portfolio, implement popups with descriptions when hovering over tags, e.g., hovering over the `LIDAR` tag shows its description. Consider creating a /technologies/ category containing all these technologies with AI-generated content to boost SEO, while also enriching and detailing content for articles.

## Translations

### My own translation component

- Based on [gatsby-plugin-intl](https://github.com/wiziple/gatsby-plugin-intl).
- Replace: `<span dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: 'portfolio.lead' }) }} />`
- Shorten `formatMessage` to `msg`.

### Configuration

- Translate paths, e.g., `/pl/contact` to `/pl/kontakt`.
