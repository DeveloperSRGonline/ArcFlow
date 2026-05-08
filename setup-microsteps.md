# ArchFlow Frontend Setup Microsteps

This document outlines the granular steps to set up the ArchFlow frontend from scratch, following the PRD v1.0.0 and Phase 1/2 requirements.

---

## Phase 1: Foundation

### 1.1 Project Initialization & Core Dependencies
- [*] **1.1.1 Verify Core Environment**
  - Ensure `client/` is initialized with Vite + React + TypeScript.
  - Update `package.json` to include project-specific metadata.
- [*] **1.1.2 Install Development Dependencies**
  - Install SCSS: `npm install -D sass`
  - Install Type definitions: `npm install -D @types/fabric` (if needed for v6)
- [*] **1.1.3 Install Production Dependencies**
  - State Management: `npm install zustand`
  - Canvas Engine: `npm install fabric@latest` (Ensure it's 6.x)
  - Auth: `npm install @clerk/clerk-react`
  - Icons: `npm install lucide-react`
  - Real-time: `npm install socket.io-client`
  - API: `npm install axios@^1.15.1`
- [*] **1.1.4 Directory Structure Setup**
  - Create the following folders in `src/`:
    - `features/canvas`, `features/mess-cleanup`, `features/architecture-assist`, `features/context-layer`, `features/collaboration`, `features/toolbar`
    - `store`, `services`, `components`, `hooks`, `styles`, `types`

### 1.2 Design System & Styling
- [*] **1.2.1 Design Tokens (SCSS)**
  - Create `src/styles/tokens.scss` with CSS Custom Properties from PRD Section 4.2 (Colors) and 4.3 (Typography).
- [*] **1.2.2 Global Styles**
  - Create `src/styles/global.scss` to reset styles and apply the dark theme (`--color-bg-primary`).
  - Import `tokens.scss` and `global.scss` in `src/main.tsx`.
- [*] **1.2.3 Layout Shell**
  - Create `src/components/layout/MainLayout.tsx` with the three-column IDE layout:
    - Left Panel: 240px
    - Center: Infinite Canvas
    - Right Panel: 320px
    - Top/Bottom Bars

### 1.3 Zustand Store Structure
- [*] **1.3.1 Canvas Store**
  - Create `src/store/useCanvasStore.ts` to manage active tool, zoom level, and selected objects.
- [*] **1.3.2 UI Store**
  - Create `src/store/useUIStore.ts` for panel toggles (Sidebar, Context Layer, AI Assist).
- [*] **1.3.3 Collaboration Store**
  - Create `src/store/useCollabStore.ts` for active users and presence data.

### 1.4 Clerk Authentication
- [*] **1.4.1 Clerk Provider Setup**
  - Wrap `App` with `ClerkProvider` in `src/main.tsx`.
- [*] **1.4.2 Auth Pages**
  - Implement Sign-In and Sign-Up routes using Clerk components.
- [*] **1.4.3 Protected Board Route**
  - Create `src/features/auth/ProtectedRoute.tsx` to redirect unauthenticated users.

### 1.5 Canvas Foundation (Fabric.js 6.x)
- [ ] **1.5.1 Canvas Initialization Hook**
  - Create `src/features/canvas/hooks/useFabricCanvas.ts` to initialize `fabric.Canvas`.
- [ ] **1.5.2 Infinite Canvas & Viewport**
  - Implement panning (Space+Drag) and zooming (Mouse Wheel).
- [ ] **1.5.3 Dot Grid Rendering**
  - Implement the background dot grid using a pattern or custom rendering on the canvas.

### 1.6 Drawing Tools (Phase 1.3)
- [ ] **1.6.1 Toolbar Component**
  - Create `src/features/toolbar/components/Toolbar.tsx` with buttons for each tool.
- [ ] **1.6.2 Basic Shapes**
  - Implement functions to add: Rectangle, Circle, Diamond, Cylinder (as per PRD 5.1.1).
- [ ] **1.6.3 Smart Arrows**
  - Implement arrow tool with basic point-to-point drawing.
- [ ] **1.6.4 Text & Sticky Notes**
  - Implement Fabric.js `IText` and colored sticky note components.

### 1.7 Selection & Manipulation (Phase 1.4)
- [ ] **1.7.1 Selection Styling**
  - Customize Fabric.js selection borders/corners to match ArchFlow brand colors.
- [ ] **1.7.2 Object Manipulation**
  - Ensure resize, rotate, and multi-select are functional.
- [ ] **1.7.3 History System (Undo/Redo)**
  - Implement a 100-level history stack in `useCanvasStore`.

### 1.8 Real-time Collaboration (Client-side)
- [ ] **1.8.1 Socket.IO Service**
  - Create `src/services/socket.ts` to handle connection to the backend.
- [ ] **1.8.2 Sync Events**
  - Listen for and emit `element:create`, `element:update`, `element:delete`.
- [ ] **1.8.3 Live Cursors**
  - Implement a layer to render other users' cursors based on `cursor:positions` events.

---

## Phase 2: Game-Changer Features

### 2.1 Context Layer (Rich Annotations)
- [ ] **2.1.1 Right Panel Structure**
  - Create the tabbed interface (Notes, Links, Code, Files).
- [ ] **2.1.2 TipTap Integration**
  - Install: `npm install @tiptap/react @tiptap/starter-kit`
  - Implement the Notes tab with markdown support.
- [ ] **2.1.3 Monaco Editor Integration**
  - Install: `npm install @monaco-editor/react`
  - Implement the Code snippets tab with language selection.
- [ ] **2.1.4 File Upload & Links**
  - Set up basic UI for link management and file list.
- [ ] **2.1.5 Context Indicators**
  - Add logic to render small dots on Fabric.js objects if they have context data.

### 2.2 Mess Cleanup (AI Auto-Layout)
- [ ] **2.2.1 Cleanup Trigger**
  - Add the "Mess Cleanup" button to the top toolbar.
- [ ] **2.2.2 Client-side Graph Logic**
  - Implement helper to convert canvas objects to a adjacency list/graph.
- [ ] **2.2.3 Layout Animation**
  - Implement smooth transition using `fabric.util.animate` to move objects to new positions.

### 2.3 Architecture Assist (AI Co-Pilot)
- [ ] **2.3.1 Assist Panel**
  - Create the UI for AI suggestions and category tabs (Issues, Suggestions, Optimizations).
- [ ] **2.3.2 Canvas Serialization**
  - Implement a service to convert the current canvas state to the JSON schema required by Gemini.
- [ ] **2.3.3 Streaming Integration**
  - Set up SSE (Server-Sent Events) or Socket listener to receive and display AI suggestions.

---

## Summary of Initial Setup Command
```bash
cd client
npm install -D sass @types/fabric
npm install zustand fabric@latest @clerk/clerk-react lucide-react socket.io-client axios @tiptap/react @tiptap/starter-kit @monaco-editor/react
```
