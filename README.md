# Zentala Agency [![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)](https://github.com/emersion/stability-badges#stable)

Welcome to the "[Zentala Agency](http://zentala.agency/)" project repository - my digital showcase for innovation prototyping services. This site serves as a hub for those looking to transform their ideas into tangible, market-ready prototypes.

You can get us know better here:

![Static Badge](https://img.shields.io/badge/visit-ZentalaAgency-purple?logo=curl&link=http%3A%2F%2Fzentala.agency%2F) &nbsp; ![Static Badge](https://img.shields.io/badge/follow-LinkedIn-blue?logo=linkedin&link=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2F101014868%2Fadmin%2Ffeed%2Fposts%2F) &nbsp;

## 🌍Project Overview

The "Zentala Agency" website features (most of them will be coming soon):

- A home page with an introduction to the agency's services, and a CTA to subscribe to the newsletter or book a discovery session call
- Detailed service offering pages
- An e-commerce section for educational products
- A knowledge base
- A blog section
- A portfolio of past works
- An 'About Us' page
- A contact page

## 📊 Code quality status

[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=zentala_zentala.agency&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=zentala_zentala.agency)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=zentala_zentala.agency&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=zentala_zentala.agency)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=zentala_zentala.agency&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=zentala_zentala.agency)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=zentala_zentala.agency&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=zentala_zentala.agency) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=zentala_zentala.agency&metric=bugs)](https://sonarcloud.io/summary/new_code?id=zentala_zentala.agency)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=zentala_zentala.agency&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=zentala_zentala.agency)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=zentala_zentala.agency&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=zentala_zentala.agency) [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=zentala_zentala.agency&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=zentala_zentala.agency) [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=zentala_zentala.agency&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=zentala_zentala.agency)

## 📚 Technical Stack Overview

| Category    | Technology  |
| :---------- | :---------- |
| Environment | ![GitHub](https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white) &nbsp; ![Dotenv](https://img.shields.io/badge/-Dotenv-ECD53F?logo=dotenv&logoColor=black) &nbsp; ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=nodedotjs&logoColor=white) &nbsp; ![npm](https://img.shields.io/badge/-npm-CB3837?logo=npm&logoColor=white) &nbsp; ![EditorConfig](https://img.shields.io/badge/-EditorConfig-FEFEFE?logo=editorconfig&logoColor=black) |
| Front-end   | ![Gatsby](https://img.shields.io/badge/-Gatsby-663399?logo=gatsby&logoColor=white) &nbsp; ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black) &nbsp; ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white) &nbsp; ![Prettier](https://img.shields.io/badge/-Prettier-F7B93E?logo=prettier&logoColor=black) &nbsp; ![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?logo=eslint&logoColor=white) &nbsp; ![Autoprefixer](https://img.shields.io/badge/-Autoprefixer-DD3735?logo=autoprefixer&logoColor=white) |
| Design      | ![Ant Design](https://img.shields.io/badge/-AntDesign-0170FE?logo=antdesign&logoColor=white) &nbsp; ![CSS3](https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white) &nbsp; ![Sass](https://img.shields.io/badge/-Sass-CC6699?logo=sass&logoColor=white) &nbsp; ![JSS](https://img.shields.io/badge/-JSS-F7DF1E?logo=jss&logoColor=black) |
| Content     | ![Strapi](https://img.shields.io/badge/-Strapi-4945FF?logo=strapi&logoColor=white) &nbsp; ![i18next](https://img.shields.io/badge/-i18next-26A69A?logo=i18next&logoColor=white) &nbsp; ![Airtable](https://img.shields.io/badge/-Airtable-18BFFF?logo=airtable&logoColor=white) &nbsp; ![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?logo=graphql&logoColor=white) |
| DevOps      | ![GitHub Pages](https://img.shields.io/badge/-GitHubPages-222222?logo=githubpages&logoColor=white) &nbsp; ![GitHub Actions](https://img.shields.io/badge/-GitHubActions-2088FF?logo=githubactions&logoColor=white) &nbsp; ![SonarCloud](https://img.shields.io/badge/-SonarCloud-F3702A?logo=sonarcloud&logoColor=white) |
| Marketing   | ![Google Analytics](https://img.shields.io/badge/-GoogleAnalytics-E37400?logo=googleanalytics&logoColor=white) |
| IDE         | ![Visual Studio Code](https://img.shields.io/badge/-VisualStudioCode-007ACC?logo=visualstudiocode&logoColor=white) &nbsp; ![gitignore.io](https://img.shields.io/badge/-gitignore.io-204ECF?logo=gitignoredotio&logoColor=white) |

### Additionally:

- **Media Management**: Cloudinary context for media operations.

### Architecture

The "Zentala Agency" site is architected to be a performant and scalable static site, utilizing Gatsby's powerful pre-rendering capabilities and React's component-based architecture. GraphQL is used to query data at build time, and the content is structured to be easily updatable as the service offerings of the agency expand.

### Development Practices

We employ a range of best practices including code formatting with Prettier, adherence to the React+TypeScript best practices, and maintainability through modular code and components.

## 🏗 Development Environment

This project is configured for development with Visual Studio Code (VS Code) and includes a devcontainer setup for a consistent development environment.

### Visual Studio Code

The repository includes recommended extensions and settings for VS Code to enhance the development experience. Open the project in VS Code and you'll be prompted to install the recommended extensions.

### Devcontainer with WSL

For developers using Windows, the project is ready to be used with WSL. The devcontainer configuration automatically sets up the development environment within a Docker container. To start working with it, ensure you have the `Remote - Containers` extension installed in VS Code, then simply open the command palette and select `Remote-Containers: Reopen in Container`.

## 🛠 Getting Started

To get the site running locally:

1. Clone the repository.

```bash
git clone https://github.com/zentala/zentala-agency.git
```

2. Install dependencies.

```bash
cd zentala-agency
nvm use
npm install
```

3. Start the development server.

```bash
npm start
```

This will start the Gatsby development server at http://localhost:8888.

## 🔧 Custom Domain Setup

To access the project using the `zentala.local` domain, you need to set up Avahi and Nginx on your Linux system or WSL on Windows.

### Install Avahi and Nginx

First, update your package list and install Avahi and Nginx using apt-get:

```bash
sudo apt-get update
sudo apt-get install avahi-daemon avahi-discover avahi-utils libnss-mdns mdns-scan nginx
```

### Configure Nginx

Next, set up Nginx to proxy requests to your Gatsby development server. Here's a basic configuration for your site:

```nginx
server {
    listen 80;
    server_name zentala.local;

    location / {
        proxy_pass http://127.0.0.1:8888;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Save this configuration to `/etc/nginx/sites-available/zentala.local` and create a symbolic link to it in the `sites-enabled` directory:

```bash
sudo ln -s /etc/nginx/sites-available/zentala.local /etc/nginx/sites-enabled/
```

Then, test the configuration and restart Nginx:

```bash
sudo nginx -t
sudo systemctl restart nginx
```

### Edit your Hosts File

Add the custom domain to your `hosts` file:

```bash
echo "127.0.0.1 zentala.local" | sudo tee -a /etc/hosts
```

### Additional Configuration for Windows with WSL

If you're using Windows with the Windows Subsystem for Linux (WSL), you'll need to update the Windows `hosts` file as well to ensure the `zentala.local` domain resolves correctly.

1. Open the Windows hosts file located at `C:\Windows\System32\drivers\etc\hosts` in a text editor with administrative privileges.

2. Add the following line to the file:

```lua
127.0.0.1 zentala.local
```

3. Save the file and close the editor.

With this additional step, the `zentala.local`` domain should now work seamlessly in Windows environment.

### Start Avahi Service

Lastly, start the Avahi service to broadcast the new domain on your local network:

```bash
sudo systemctl start avahi-daemon
```

With this setup, your Gatsby site will be available at [http://zentala.local](http://zentala.local) through your browser.

## 🚀 Deployment ![Gatsby Build & Deployment](https://github.com/zentala/zentala.agency/actions/workflows/gatsby.yml/badge.svg)

The site is set up to be deployed on GitHub Pages via GitHub Actions.

## 📜 Scripts

- `npm run start` — Starts the development server on http://localhost:8888
- `npm run develop` — Starts the development server with the custom `http://zentala.local/` domain. Requires the Avahi and Nginx configuration as noted above.
- `npm run format` — Formats code using Prettier
- `npm run build` — Builds the site for production
- `npm run serve` — Serves the production build of the site for testing

## 📚 Versioning

For transparency into our release cycle and in striving to maintain backward compatibility, "Zentala Agency" is maintained under the [Semantic Versioning guidelines](https://semver.org/). Sometimes we screw up, but we'll adhere to those rules whenever possible.

## 🙏 Acknowledgments

A tip of the hat to the numerous open-source projects that make a project like this possible. Specific credits to Gatsby, React, TypeScript, and Ant Design.
