# Architectural Decision Records (ADRs)

## Introduction

Architectural Decision Records (ADRs) are documents that record key architectural decisions made in a software project. They serve as a historical record of the reasoning and consequences of these decisions.

## ADR 1: Transition from SASS to JSS for Styling

1. **Status**: Accepted
2. **Context**: Maintaining styles in separate SASS files proved to be challenging, with difficulties in locating specific classes. Integrating styles directly within components using JSS appeared more manageable.
3. **Decision**: Opted for JSS due to ease of maintenance within component files. However, some global styles remain in SASS.
4. **Consequences**: This decision simplifies the management of component-specific styles but necessitates maintaining a hybrid styling approach.

## ADR 2: Implementation of gatsby-plugin-intl for Localization

1. **Status**: Implemented
2. **Context**: Popular options for Gatsby, like gatsby-plugin-react-i18next and gatsby-plugin-lingui, were not compatible with our version of Gatsby. gatsby-plugin-intl seemed to be the compatible, supported option.
3. **Decision**: Adopted gatsby-plugin-intl due to its compatibility with the current Gatsby version.
4. **Consequences**: The plugin does not support redirection to browser language while maintaining 'en' as the default language at the root path ('/') instead of '/en/'.

## ADR 3: Using Noto Color Emoji for Font Icons

1. **Status**: Accepted
2. **Context**: There was a need for a comprehensive font icon solution, especially for color icons like flags and for displaying emojis in a consistent style.
3. **Decision**: Chose Noto Color Emoji from Google Fonts for its wide range of icons and cross-platform support.
4. **Consequences**: This decision provides a uniform appearance for emojis across various platforms and devices, addressing the need for color icons.

## ADR 4: Utilizing Cloudinary for Media Storage

1. **Status**: Accepted
2. **Context**: The need to explore modern media management solutions and to evaluate their functionality, cost, and convenience. The specific interest was in features like image resizing and optimization.
3. **Decision**: Decided to use Cloudinary for media storage and created a context for delivering media, to test this kind of solution and to explore its functionalities.
4. **Consequences**: This decision allows for easy management and optimization of media, but it involves reliance on an external service and its pricing model.
5. **Alternatives**: The alternatives were using another similar service or managing media on our own VPS. However, this would require additional maintenance, potential configuration, and possibly a self-hosted platform for managing and publishing images, which seemed more complex at this time.
