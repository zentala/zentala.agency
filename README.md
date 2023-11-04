# Zentala Agency

Welcome to the "Zentala Agency" project repository - my digital showcase for innovation prototyping services. This site serves as a hub for those looking to transform their ideas into tangible, market-ready prototypes.


## Project Overview

The "Zentala Agency" website features (most of them will be coming soon):
- A home page with an introduction to the agency's services, and a CTA to subscribe to the newsletter or book a discovery session call
- Detailed service offering pages
- An e-commerce section for educational products
- A knowledge base
- A blog section
- A portfolio of past works
- An 'About Us' page
- A contact page


## Development Environment

This project is configured for development with Visual Studio Code (VS Code) and includes a devcontainer setup for a consistent development environment.

### Visual Studio Code

The repository includes recommended extensions and settings for VS Code to enhance the development experience. Open the project in VS Code and you'll be prompted to install the recommended extensions.

### Devcontainer with WSL

For developers using Windows, the project is ready to be used with WSL. The devcontainer configuration automatically sets up the development environment within a Docker container. To start working with it, ensure you have the `Remote - Containers` extension installed in VS Code, then simply open the command palette and select `Remote-Containers: Reopen in Container`.


## Getting Started

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


## Custom Domain Setup

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


## Deployment
The site is set up to be deployed on GitHub Pages. 


## Scripts
* `npm run start` — Starts the development server on http://localhost:8888
* `npm run develop` — Starts the development server with the custom `http://zentala.local/` domain. Requires the Avahi and Nginx configuration as noted above.
* `npm run format` — Formats code using Prettier
* `npm run build` — Builds the site for production
* `npm run serve` — Serves the production build of the site for testing


## Versioning
For transparency into our release cycle and in striving to maintain backward compatibility, "Zentala Agency" is maintained under the [Semantic Versioning guidelines](https://semver.org/). Sometimes we screw up, but we'll adhere to those rules whenever possible.


## Acknowledgments
A tip of the hat to the numerous open-source projects that make a project like this possible. Specific credits to Gatsby, React, TypeScript, and Ant Design.