# Cloudflare Chat - Technical Architecture

## Overview

This document provides detailed technical specifications for implementing the expandable chat UI layout. The implementation focuses on creating a robust, performant layout system that integrates seamlessly with the existing grid-based design.

---

## 1. Layout System Architecture

### 1.1 Core Concept

The expandable layout uses **CSS Grid** to create a dynamic 3-column system:

```
Normal state:     [====== Content (100%) ======]
Expanded state:   [== Content ==][Bar][= Chat =]
                       (auto)      30px   400-500px
```

### 1.2 HTML Structure

```html
<body>
  <Header />

  <!-- NEW: Chat trigger - fixed positioning -->
  <ChatTrigger />

  <!-- NEW: Page content wrapper -->
  <div class="page-content" id="page-content">
    <main>
      <slot /> <!-- Existing page content -->
    </main>
  </div>

  <!-- NEW: Chat panel - hidden by default -->
  <div class="chat-panel" id="chat-panel">
    <!-- Chat content placeholder -->
  </div>

  <Footer />
</body>
```

### 1.3 State Management

**CSS Class Toggle Approach:**
```javascript
// Simple class-based state
document.body.classList.toggle('chat-expanded');
```

**States:**
- `body:not(.chat-expanded)` - Normal layout
- `body.chat-expanded` - Expanded layout with chat visible

---

## 2. Component Specifications

### 2.1 ChatTrigger.astro

**Purpose**: Vertical trigger bar that opens/closes the chat panel.

**Technical Details:**
```astro
---
// src/components/chat/ChatTrigger.astro
const isCloudflareChatEnabled = import.meta.env.CLOUDFLARE_CHAT_ENABLED === 'true';
---

{isCloudflareChatEnabled && (
  <div
    class="chat-trigger"
    id="chat-trigger"
    role="button"
    aria-label="Toggle chat"
    aria-expanded="false"
    tabindex="0"
  >
    <div class="chat-trigger__text">
      <span>CHAT</span>
      <span>CHAT</span>
      <span>CHAT</span>
    </div>
  </div>
)}

<style lang="scss">
  @use '../../styles/variables' as *;

  .chat-trigger {
    position: fixed;
    right: 0;
    top: $header-height-desktop;
    bottom: 0;
    width: 30px;
    background: #000;
    border-left: 1px solid $border-color;
    cursor: pointer;
    z-index: $chat-trigger-z-index;
    overflow: hidden;
    transition: background 0.2s ease-in-out;

    &:hover {
      background: #111827;
      border-left-color: $border-color-hover;
    }

    &:focus-visible {
      outline: 2px solid rgba(255, 255, 255, 0.5);
      outline-offset: -2px;
    }

    // Responsive header heights
    @include large {
      top: $header-height-large;
    }

    @include medium {
      top: $header-height-medium;
    }

    @include tablet {
      top: $header-height-tablet;
      width: 24px; // Narrower on mobile
    }

    @include mobile {
      top: $header-height-mobile;
      width: 24px;
    }
  }

  .chat-trigger__text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 40px;
    gap: 80px;

    @include tablet {
      gap: 60px;
      padding-top: 30px;
    }

    span {
      color: rgba(255, 255, 255, 0.3);
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      writing-mode: vertical-rl;
      transform: rotate(180deg);
      user-select: none;
      transition: color 0.2s ease-in-out;

      @include tablet {
        font-size: 10px;
        letter-spacing: 0.15em;
      }
    }
  }

  .chat-trigger:hover span {
    color: rgba(255, 255, 255, 0.6);
  }
</style>

<script>
  const trigger = document.getElementById('chat-trigger');
  const panel = document.getElementById('chat-panel');
  const body = document.body;

  function toggleChat() {
    const isExpanded = body.classList.toggle('chat-expanded');

    // Update ARIA state
    trigger?.setAttribute('aria-expanded', String(isExpanded));

    // Focus management
    if (isExpanded && panel) {
      panel.focus();
    }
  }

  // Click handler
  trigger?.addEventListener('click', toggleChat);

  // Keyboard handler
  trigger?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleChat();
    }
  });

  // Escape to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && body.classList.contains('chat-expanded')) {
      toggleChat();
    }
  });
</script>
```

---

### 2.2 ChatPanel.tsx

**Purpose**: Placeholder container for future chat implementation.

```tsx
// src/components/chat/ChatPanel.tsx
import { Component } from 'solid-js';
import './ChatPanel.scss';

export const ChatPanel: Component = () => {
  return (
    <div class="chat-panel-inner">
      <div class="chat-panel-header">
        <h3>Cloudflare Chat</h3>
        <button
          class="chat-panel-close"
          aria-label="Close chat"
          onClick={() => document.body.classList.remove('chat-expanded')}
        >
          ×
        </button>
      </div>

      <div class="chat-panel-content">
        <div class="chat-placeholder">
          <p>Chat panel placeholder</p>
          <p class="text-muted">API integration coming in Task 004</p>
        </div>
      </div>

      <div class="chat-panel-footer">
        <p class="text-sm">Powered by Cloudflare Workers AI</p>
      </div>
    </div>
  );
};
```

**Styling (ChatPanel.scss):**
```scss
@use '../../styles/variables' as *;

.chat-panel-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #000;

  // Grid pattern background
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 50px 50px;
}

.chat-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid $border-color;

  h3 {
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
}

.chat-panel-close {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  transition: color 0.2s;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }

  // Hide on desktop (use trigger bar instead)
  @include medium-up {
    display: none;
  }
}

.chat-panel-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.chat-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);

  p {
    margin: 0.5rem 0;
  }

  .text-muted {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.3);
  }
}

.chat-panel-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid $border-color;
  text-align: center;

  .text-sm {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.3);
    margin: 0;
  }
}
```

---

### 2.3 CloudflareChat.astro (Main Wrapper)

```astro
---
// src/components/chat/CloudflareChat.astro
import { ChatPanel } from './ChatPanel';

const isCloudflareChatEnabled = import.meta.env.CLOUDFLARE_CHAT_ENABLED === 'true';
---

{isCloudflareChatEnabled && (
  <div
    class="chat-panel"
    id="chat-panel"
    tabindex="-1"
  >
    <ChatPanel client:load />
  </div>
)}

<style lang="scss">
  @use '../../styles/variables' as *;

  .chat-panel {
    position: fixed;
    right: 0;
    top: $header-height-desktop;
    bottom: 0;
    width: 500px;
    background: #000;
    border-left: 1px solid $border-color;
    z-index: $chat-panel-z-index;

    // Hidden by default
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;

    @include large {
      top: $header-height-large;
      width: 450px;
    }

    @include medium {
      top: $header-height-medium;
      width: 400px;
    }

    // Mobile: Full screen overlay
    @include tablet {
      top: $header-height-tablet;
      width: 100%;
      z-index: $mobile-chat-panel-z-index;
    }

    @include mobile {
      top: $header-height-mobile;
    }
  }

  // Show when expanded
  body.chat-expanded .chat-panel {
    transform: translateX(0);
  }
</style>
```

---

## 3. Layout Integration

### 3.1 Modified Layout.astro

```astro
---
// src/layouts/Layout.astro
import '../styles/global.scss'
import Footer from '../components/Footer.astro'
import Header from '../components/Header.astro'
import Chatbot from '../components/Chatbot.astro'
import ChatTrigger from '../components/chat/ChatTrigger.astro'
import CloudflareChat from '../components/chat/CloudflareChat.astro'

interface Props {
  title: string
  description?: string
}

const { title, description = '...' } = Astro.props;
const isCloudflareChatEnabled = import.meta.env.CLOUDFLARE_CHAT_ENABLED === 'true';
---

<!doctype html>
<html lang="en">
  <head>
    <!-- ... existing head content ... -->
  </head>
  <body class="min-h-screen overflow-x-hidden bg-black">
    <Header />

    {isCloudflareChatEnabled && <ChatTrigger />}

    <main>
      <slot />
    </main>

    <Footer />

    <Chatbot />
    {isCloudflareChatEnabled && <CloudflareChat />}
  </body>
</html>
```

---

## 4. Styling System

### 4.1 Chat Layout SCSS

```scss
// src/styles/components/_chat-layout.scss
@use '../variables' as *;

// =======================================
// EXPANDABLE CHAT LAYOUT
// =======================================

// Desktop layout adjustments when chat is expanded
body.chat-expanded {

  // Adjust main content to make room for chat
  // (Not using margin, using transform for better performance)
  @include medium-up {

    // Container adjustments
    .container-bordered {
      transition: border-color 0.3s ease-in-out;

      // Remove right border when chat is visible
      border-right-color: transparent;
    }

    // Grid sections remain full width
    .section-grid {
      // Grid pattern continues behind chat
    }
  }

  // Mobile: Add backdrop
  @include tablet {
    &::before {
      content: '';
      position: fixed;
      top: $header-height-tablet;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      z-index: 39; // Below chat panel
      backdrop-filter: blur(4px);
    }
  }

  @include mobile {
    &::before {
      top: $header-height-mobile;
    }
  }
}
```

### 4.2 Import into Global Styles

```scss
// src/styles/global.scss
@use 'tailwindcss/base';
@use 'tailwindcss/components';
@use 'tailwindcss/utilities';
@use './variables' as *;

// Import component styles
@use './components/containers';
@use './components/grids';
@use './components/typography';
@use './components/links';
@use './components/navigation';
@use './components/spacing';
@use './components/cards';
@use './components/home';
@use './components/chat-layout'; // <-- ADD THIS
```

### 4.3 Z-Index Variables

```scss
// src/styles/variables.scss (additions)

// =======================================
// CHAT SYSTEM Z-INDEX
// =======================================

$chat-trigger-z-index: 40;
$chat-panel-z-index: 40;
$mobile-chat-panel-z-index: 45;
$mobile-chat-backdrop-z-index: 39;

// Header remains highest
$header-z-index: 50;
$mobile-nav-z-index: 1100;
$mobile-overlay-z-index: 40;
```

---

## 5. Feature Flag System

### 5.1 Environment Variables

**.env.example:**
```bash
# Chatbot integration
FLOWISE_CHAT_ENABLED=false
CLOUDFLARE_CHAT_ENABLED=false

# Cloudflare Chat configuration (for future Task 004)
CLOUDFLARE_CHAT_API=https://bot.zentala.io/api
```

**.env (local):**
```bash
FLOWISE_CHAT_ENABLED=false
CLOUDFLARE_CHAT_ENABLED=true  # Enable for development
```

### 5.2 Feature Flag Logic

```astro
---
// src/components/Chatbot.astro (modified)
import { Bubble } from './solid-chat/features/bubble/components/Bubble'

const isFlowiseChatEnabled = import.meta.env.FLOWISE_CHAT_ENABLED === 'true';
const isCloudflareChatEnabled = import.meta.env.CLOUDFLARE_CHAT_ENABLED === 'true';

// Priority: Show only one chat at a time
// If both enabled, Cloudflare takes priority
const showFlowiseChat = isFlowiseChatEnabled && !isCloudflareChatEnabled;
const showCloudflareChat = isCloudflareChatEnabled;

// Existing Flowise chat config...
---

{showFlowiseChat && (
  <Bubble
    client:only="solid-js"
    botId={chatflowid}
    apiHost={apiHost}
    theme={theme}
  />
)}

<!-- Cloudflare chat is handled separately in Layout.astro -->
```

---

## 6. Performance Considerations

### 6.1 Lazy Loading

```astro
<!-- Load chat panel only when needed -->
<ChatPanel client:load />  <!-- Loads on page load -->

<!-- Alternative: Load on interaction -->
<ChatPanel client:visible />  <!-- Loads when scrolled into view -->
```

### 6.2 CSS Optimization

```scss
// Use transform instead of width changes for better performance
.chat-panel {
  transform: translateX(100%);
  will-change: transform;
}

body.chat-expanded .chat-panel {
  transform: translateX(0);
}
```

### 6.3 CSS Containment

```scss
.chat-panel-inner {
  contain: layout style paint;
}

.chat-panel-content {
  contain: strict;
}
```

---

## 7. Accessibility

### 7.1 ARIA Attributes

```html
<!-- Trigger button -->
<div
  role="button"
  aria-label="Toggle chat"
  aria-expanded="false"
  aria-controls="chat-panel"
  tabindex="0"
>

<!-- Chat panel -->
<div
  id="chat-panel"
  role="dialog"
  aria-modal="true"
  aria-labelledby="chat-panel-title"
  tabindex="-1"
>
```

### 7.2 Keyboard Navigation

- **Tab**: Focus trigger button
- **Enter / Space**: Toggle chat
- **Escape**: Close chat (when expanded)
- **Tab**: Trap focus inside chat panel when open

### 7.3 Focus Management

```javascript
// Focus trap for mobile overlay
if (isExpanded && isMobile) {
  const focusableElements = panel.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  // Focus first element
  focusableElements[0]?.focus();
}
```

---

## 8. Browser Compatibility

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Fallbacks
- `writing-mode: vertical-rl` - Supported in all modern browsers
- CSS Grid - Supported in all target browsers
- `transform` animations - Hardware accelerated

---

## 9. Testing Checklist

### Visual Testing
- [ ] Trigger bar positioned correctly on right edge
- [ ] Text rotated 90° with proper spacing
- [ ] Chat panel slides in smoothly (300ms)
- [ ] Grid pattern visible in chat background
- [ ] Border adjustments correct when expanded
- [ ] No layout shift or content jump

### Responsive Testing
- [ ] Desktop (>1000px): Side panel layout
- [ ] Tablet (771-1000px): Full-screen overlay
- [ ] Mobile (<771px): Full-screen overlay
- [ ] Trigger bar width: 30px desktop, 24px mobile

### Interaction Testing
- [ ] Click trigger opens/closes chat
- [ ] Keyboard Enter/Space toggles chat
- [ ] Escape key closes chat
- [ ] Close button works on mobile
- [ ] Multiple toggle cycles work smoothly

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## 10. Troubleshooting

### Issue: Trigger bar not visible
**Solution**: Check feature flag is enabled and z-index hierarchy

### Issue: Chat panel doesn't slide
**Solution**: Verify `.chat-expanded` class is being toggled on `<body>`

### Issue: Layout shifts when expanding
**Solution**: Use `transform` instead of `width` changes

### Issue: Grid pattern not showing
**Solution**: Check background-image syntax and background-size (50px 50px)

### Issue: Mobile overlay not full screen
**Solution**: Verify responsive breakpoints and z-index values

---

## 11. File Structure Summary

```
src/
├── components/
│   ├── chat/
│   │   ├── ChatTrigger.astro          # Vertical trigger bar
│   │   ├── ChatPanel.tsx              # Chat panel component
│   │   ├── ChatPanel.scss             # Panel styling
│   │   └── CloudflareChat.astro       # Main wrapper
│   └── Chatbot.astro                  # Modified with feature flags
├── layouts/
│   └── Layout.astro                   # Modified to include chat
└── styles/
    ├── components/
    │   └── _chat-layout.scss          # Expandable layout styles
    ├── variables.scss                 # Added chat z-index variables
    └── global.scss                    # Import chat-layout

.env
├── CLOUDFLARE_CHAT_ENABLED=false      # Feature flag
└── CLOUDFLARE_CHAT_API=...            # For future use
```

---

## 12. Code Review Checklist

- [ ] All new files follow existing naming conventions
- [ ] SCSS uses mixins from `variables.scss`
- [ ] No hardcoded breakpoints (use @include mixins)
- [ ] Z-index values from variables, not hardcoded
- [ ] Accessibility attributes present (ARIA, tabindex)
- [ ] Feature flag checks consistent across components
- [ ] No duplicate code between Flowise and Cloudflare chat
- [ ] Comments explain non-obvious logic
- [ ] TypeScript types defined (if using .tsx)

---

**Document Version**: 1.0
**Last Updated**: 2025-10-03
**Author**: System Architect