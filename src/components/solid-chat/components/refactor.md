# Refactoring Plan: Decomposing `Bot.tsx`

## 1. Goal

The primary goal is to refactor the monolithic `Bot.tsx` component (over 2300 lines) into smaller, single-responsibility modules. This will transform it from a "God Component" into a clean, maintainable, and scalable structure.

## 2. Why Refactor?

- **Maintainability**: Smaller files are easier to understand, debug, and modify.
- **Testability**: Isolating logic into hooks makes it possible to write unit tests for specific functionalities without rendering the entire UI.
- **Reusability**: Specialized hooks (e.g., for file uploads) can potentially be reused in other parts of the application.
- **Readability**: The `Bot.tsx` component will become purely a presentation layer, making the UI structure immediately obvious.
- **Collaboration**: Team members (and AI assistants) can work on different parts of the logic (e.g., `useMessages` vs. `useFileUploads`) without creating merge conflicts.

## 3. New Architecture & File Structure

We will move from a single large file to a structured set of directories and files, placing reusable hooks in a shared, top-level folder.

### Before:

```
src/components/solid-chat/components/
└── Bot.tsx  // <-- Everything is in here
```

### After:

```
src/components/solid-chat/
├── components/
│   ├── Bot.tsx              // The new, lean UI component
│   └── (other components...)
├── hooks/                   // NEW: Centralized hooks directory
│   ├── useChat.ts           // Orchestrator hook
│   ├── useMessages.ts       // Manages the chat message list
│   ├── useFileUploads.ts    // Manages file uploads and previews
│   ├── useEventStream.ts    // Handles server-sent event logic
│   ├── useAudioRecording.ts // Manages audio recording
│   ├── useLeadForm.ts       // Logic for the lead capture form
│   └── useFeedback.ts       // Logic for the feedback dialog
├── dialogs/
│   └── FeedbackDialog.tsx     // Extracted from Bot.tsx
├── inputs/
│   └── FormInputView.tsx      // Extracted from Bot.tsx
└── types/
    └── chat.ts              // NEW: All types related to the chat bot
```

---

## 4. Step-by-Step Implementation Plan

- [x] **Step 1: Create New Files and Directories**
  - _Status: Completed. The new directory structure has been created._

- [x] **Step 2: Extract All Types**
  - _Status: Completed. All types were moved from `Bot.tsx` to `src/components/solid-chat/types/chat.ts`._

- [x] **Step 3: Extract UI Components**
  - [x] **`FeedbackDialog`**: Cut from `Bot.tsx` and moved to `src/components/solid-chat/dialogs/FeedbackDialog.tsx`.
  - [x] **`FormInputView`**: **Skipped**. We discovered this logic was already correctly implemented within `LeadCaptureBubble.tsx` and `useLeadForm.ts`, so a separate component was not necessary.

- [x] **Step 4: Extract Logic into Specialized Hooks**
  - _Status: Completed. All logical blocks have been extracted into the following single-responsibility hooks:_
  - [x] `useMessages.ts`
  - [x] `useFileUploads.ts`
  - [x] `useEventStream.ts`
  - [x] `useAudioRecording.ts`
  - [x] `useLeadForm.ts`
  - [x] `useFeedback.ts`

- [x] **Step 5: Create the `useChat` Orchestrator Hook**
  - _Status: **Completed**. The orchestrator hook is implemented and wires together all specialized hooks. All state and handlers are now provided from one place._

- [~] **Step 6: Refactor `Bot.tsx` to be a Pure UI Component**
  - _Status: **In Progress**. The new UI structure is implemented, but some subcomponents (GuestBubble, LeadCaptureBubble, TextInput, FeedbackDialog) require prop and type fixes to fully integrate with the new orchestrator._
  - [x] `BotBubble` – feedback logic and typy poprawione, UI czysty
  - [ ] `GuestBubble` – do poprawy propsy i typy
  - [ ] `LeadCaptureBubble` – do poprawy propsy i typy
  - [ ] `TextInput` – do poprawy propsy i typy
  - [ ] `FeedbackDialog` – do poprawy propsy i typy

- [ ] **Step 7: Finalize**
  - _Status: **Not Started**. This will be the final step after the `Bot.tsx` rewrite is complete. Will include rigorous testing of all chat features (messages, uploads, audio, lead form, feedback)._

---

## 5. Current Status, Knowledge Dump & Next Steps

### Where we are now

- All logic is in hooks, orchestrator is done, BotBubble is refactored and type-safe.
- We are currently fixing prop and type mismatches in the remaining UI components to finish the new `Bot.tsx`.
- After that, we will test the full chat UI and all features.

### Checklist for UI integration (Step 6):

- [x] BotBubble – done
- [ ] GuestBubble – next
- [ ] LeadCaptureBubble
- [ ] TextInput
- [ ] FeedbackDialog

### Next steps

1. Refactor GuestBubble props and types for new orchestrator.
2. Refactor LeadCaptureBubble props and types.
3. Refactor TextInput props and types.
4. Refactor FeedbackDialog props and types.
5. Test the full chat UI and all features.
