# Architecture & Migration Plan: Integrating the Chatbot

This document outlines the architecture and step-by-step migration plan for refactoring the Flowise chatbot integration.

## 1. Goal & Motivation

Our current implementation uses a Git submodule and a separate build process. This is complex, hinders rapid development, and prevents features like hot-reloading.

The goal is to **migrate the chatbot's SolidJS code directly into our Astro project**. This will:
-   **Eliminate the submodule** and its convoluted workflow.
-   **Enable live hot-reloading** for instant feedback during development.
-   **Unify the codebase**, simplifying dependency management and styling.
-   **Create a true component-based architecture** within Astro.

---

## 2. Proposed File Structure

We will create a self-contained directory for the chatbot's source and remove all legacy files.

### Files/Folders to ADD:
```
src/
└── components/
    ├── solid-chat/       # New home for the chatbot's SolidJS source
    │   ├── assets/
    │   ├── components/
    │   ├── features/
    │   ├── queries/
    │   ├── utils/
    │   └── ... (all other files from the original `chat/src`)
    └── Chatbot.astro       # New Astro wrapper component
```

### Files/Folders to REMOVE:
```
.gitmodules
.vscode/tasks.json         # The "Build and Update Chatbot" task is no longer needed
chat/                      # The entire submodule directory
docs/chat/                 # Old documentation directory
public/chat.js
public/init-chat.js
```
---

## 3. Step-by-Step Implementation Guide

Follow these steps precisely to perform the migration.

### Step 1: Install Astro-SolidJS Integration

First, we need to enable Astro to render SolidJS components.

1.  Run the following command in the project root:
    ```bash
    npx astro add solid-js
    ```
2.  Follow the prompts. This will automatically install the necessary packages and update your `astro.config.mjs` file, adding the SolidJS integration.

### Step 2: Migrate Chatbot Source Code

Copy the chatbot's source code into the main project.

1.  Create a new directory: `src/components/solid-chat`
2.  **Copy the entire contents** of the `chat/src/` directory and paste them into the new `src/components/solid-chat/` directory.

### Step 3: Configure Path Aliases

The SolidJS code uses path aliases (e.g., `from '@/components/...'`). We need to configure `tsconfig.json` to understand them in the new location.

1.  Open `tsconfig.json` in the project root.
2.  Add or modify the `paths` property within `compilerOptions`:

    ```json
    {
      "compilerOptions": {
        // ... other options
        "baseUrl": ".",
        "paths": {
          "@/components/*": ["src/components/*"],
          "@/layouts/*": ["src/layouts/*"],
          "@/assets/*": ["src/assets/*"],
          "@/*": ["src/components/solid-chat/*"] // <-- ADD THIS LINE
        }
      }
    }
    ```
    *This new alias tells TypeScript that any import starting with `@/` should resolve to `src/components/solid-chat/`.*

### Step 4: Create the Astro Wrapper Component

This component will act as the bridge between Astro and SolidJS.

1.  Create a new file: `src/components/Chatbot.astro`
2.  Add the following code to it. This component imports the main `Bubble` component from the SolidJS code and renders it as an "Astro island."

    ```astro
    ---
    // src/components/Chatbot.astro
    import { Bubble } from './solid-chat/features/bubble/components/Bubble';
    
    // Hard-coded props that were previously in init-chat.js
    const chatflowid = 'da2375f4-1ceb-4207-a23c-71caf273778a';
    const apiHost = 'https://flowise.zentala.agency';
    const theme = {
      button: {
        backgroundColor: '#374151',
        right: 20,
        bottom: 20,
        size: 48,
        dragAndDrop: true,
        iconColor: 'white',
        customIconSrc: '/chat.svg',
      },
      chatWindow: {
        welcomeMessage: 'Hi! I am here to help you with your questions about Paul Zentala and his services. How can I assist you?',
        backgroundColor: '#111827',
        height: 700,
        width: 400,
        fontSize: 16,
        botMessage: {
          backgroundColor: '#1f2937',
          textColor: '#f3f4f6',
          showAvatar: false,
        },
        userMessage: {
          backgroundColor: '#374151',
          textColor: '#ffffff',
          showAvatar: false,
        },
        textInput: {
          placeholder: 'Write a message...',
          backgroundColor: '#1f2937',
          textColor: '#f3f4f6',
          sendButtonColor: '#374151',
        },
      },
    };
    ---
    
    <Bubble
      client:idle
      chatflowid={chatflowid}
      apiHost={apiHost}
      theme={theme}
    />
    ```
    *The `client:idle` directive is crucial. It tells Astro to load the component's JavaScript when the browser is idle, making it interactive.*

### Step 5: Integrate into the Main Layout

Now, replace the old script-based method with our new component.

1.  Open `src/layouts/Layout.astro`.
2.  Import the new `Chatbot` component at the top.
3.  Remove the old `<script type="module" src="/init-chat.js"></script>`.
4.  Add the `<Chatbot />` component just before the closing `</body>` tag.

    ```astro
    ---
    import '../styles/global.scss'
    import Footer from '../components/Footer.astro'
    import Header from '../components/Header.astro'
    import Chatbot from '../components/Chatbot.astro' // <-- ADD THIS IMPORT

    // ... (rest of the frontmatter)
    ---
    
    <!doctype html>
    <html lang="en">
      <!-- ... (head section) -->
      <body class="min-h-screen overflow-x-hidden bg-black">
        <Header />
        <main>
          <slot />
        </main>
        <Footer />
        <Chatbot /> <!-- <-- ADD THIS COMPONENT -->
        <!-- <script type="module" src="/init-chat.js"></script> --> <!-- REMOVE THIS LINE -->
      </body>
    </html>
    ```

### Step 6: Final Cleanup

The final step is to remove all the now-obsolete files and submodule configuration.

1.  **De-initialize the submodule:** This removes the entry from `.git/config`.
    ```bash
    git submodule deinit -f chat
    ```
2.  **Remove the submodule from Git:**
    ```bash
    git rm -f chat
    ```
3.  **Delete the submodule directory:**
    ```bash
    rm -rf chat
    ```
4.  **Delete the now-empty `.git/modules/chat` directory** if it exists.
5.  **Delete the legacy files:**
    ```bash
    rm public/chat.js
    rm public/init-chat.js
    rm .gitmodules
    ```

---

## 4. New Development Workflow

After this migration, the development process becomes radically simpler:

1.  Run `npm run dev`.
2.  Edit any file inside `src/components/solid-chat/`.
3.  **The browser will hot-reload instantly.**

That's it. No separate build steps, no manual file copying, no VS Code tasks. All styling and logic changes are part of the main Astro development server.

---

## 5. Critical Knowledge & Gotchas (The "Don't Forget" List)

This section contains crucial context. If you forget everything else, remember this.

### 5.1. The Styling Bridge: How CSS Works Here

This is the most important concept to understand. The chatbot's SolidJS code and the main Astro project have **separate styling systems**.

-   **Chatbot (SolidJS):** Uses scoped CSS. The file `src/components/solid-chat/assets/index.css` is imported directly into components as a module (`import styles from '...'`). This means class names are hashed to prevent conflicts, and Tailwind classes from the main project **will not work** inside the `.tsx` files.
-   **Main Site (Astro):** Uses global SCSS and Tailwind.

**How we bridge them:**
The `<Chatbot.astro>` wrapper acts as a **translator**. It takes configuration (like colors, fonts) and passes it down as `props` to the SolidJS `Bubble` component. The SolidJS code then uses these props to set inline styles or CSS variables. **This is our primary method for customization.** Do not try to apply global classes directly to the SolidJS components.

### 5.2. Dependency Management: One `package.json` to Rule Them All

All dependencies for the chatbot must now be declared in the **main, root `package.json`**. The `package.json` from the old `chat/` submodule is irrelevant and will be deleted.

-   The `npx astro add solid-js` command handles the core `solid-js` dependency.
-   **Gotcha:** If you encounter errors like "Cannot find module 'some-library'", it's likely a dependency that was in the old submodule's `package.json`. You must manually add it to the root project: `npm install some-library`.

### 5.3. TypeScript and Path Aliases are Crucial

The alias `"@/*": ["src/components/solid-chat/*"]` in `tsconfig.json` is what makes the chatbot's internal imports work. If you see "Cannot find module `_some-path_`" errors, this alias is the first thing to check. Astro's SolidJS integration correctly handles the `jsx` and `jsxImportSource` settings, so you should not need to touch those.

### 5.4. Environment Variables: The Right Way for Credentials

The plan shows hardcoding `apiHost` and `chatflowid` in `Chatbot.astro` for simplicity. **This is not best practice.**

A better, production-ready approach is to use Astro's environment variables:

1.  Create a `.env` file in the project root:
    ```
    PUBLIC_FLOWISE_HOST="https://flowise.zentala.agency"
    PUBLIC_FLOWISE_CHATFLOWID="da2375f4-1ceb-4207-a23c-71caf273778a"
    ```
2.  Update `Chatbot.astro` to read from them:
    ```astro
    ---
    import { Bubble } from './solid-chat/features/bubble/components/Bubble';

    const chatflowid = import.meta.env.PUBLIC_FLOWISE_CHATFLOWID;
    const apiHost = import.meta.env.PUBLIC_FLOWISE_HOST;
    // ... rest of the theme object
    ---
    <Bubble client:idle chatflowid={chatflowid} apiHost={apiHost} theme={theme} />
    ```
    *This makes the configuration flexible and secure, without hardcoding values in the source code.*

### 5.5. Why the Astro Wrapper (`Chatbot.astro`) is Necessary

You might be tempted to import the SolidJS component directly into the main layout. Don't. The wrapper component serves two key purposes:
1.  **It's the configuration hub:** It gathers all the necessary props, themes, and environment variables in one clean place before passing them to the SolidJS world.
2.  **It controls client-side loading:** The `client:idle` directive is critical for performance. It ensures the chatbot's JavaScript doesn't block the initial page load. The wrapper is the perfect place to manage this directive.
