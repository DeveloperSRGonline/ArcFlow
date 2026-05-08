

**PRODUCT REQUIREMENTS DOCUMENT**

**ArchFlow**

*The Intelligent Architecture Whiteboard*

**Turn Your Messy Sketches Into Execution-Ready Architecture**

| Version 1.0.0 | Status Final Draft | Date April 2026 | Author Shivam R. |
| :---: | :---: | :---: | :---: |

# **1\. Executive Summary**

ArchFlow is a next-generation, AI-powered collaborative whiteboard built specifically for software engineers, solution architects, and technical teams. Unlike generic whiteboard tools (Miro, FigJam, Excalidraw), ArchFlow treats every drawing as a living, executable architecture document.

The product is built around three breakthrough AI features that differentiate it completely from everything in the market:

* Mess Cleanup — One-click intelligent auto-layout that transforms chaotic, randomly placed shapes, arrows, and text into clean, properly aligned architectural diagrams.

* Architecture Assist — An AI co-pilot that analyzes your diagram and provides actionable suggestions: missing components, scalability concerns, API recommendations, database choices, and best practices.

* Context Layer — Every element on the canvas becomes a rich knowledge node — attach notes, code snippets, API docs, links, and files directly to shapes and connectors.

**ArchFlow is not a drawing tool. It is a thinking environment where architecture decisions are captured, validated, and shared in real time across engineering teams.**

# **2\. Problem Statement**

## **2.1 The Current Whiteboard Problem**

Engineers and architects spend a significant portion of their time in meetings sketching system designs. Existing tools fall short in critical ways:

| Tool | What It Does Well | Critical Gap |
| :---- | :---- | :---- |
| Miro | Rich templates, sticky notes | No AI assist, no architecture intelligence |
| Excalidraw | Lightweight, hand-drawn feel | No context layer, no collaboration at scale |
| FigJam | Design team workflows | Not built for technical diagrams |
| draw.io | Proper diagram shapes | No AI, no real-time collab, no context |
| LucidChart | Enterprise diagrams | No AI suggestions, expensive, complex |

## **2.2 Pain Points We Solve**

* Messy diagrams created in real-time meetings are impossible to understand later — "Mess Cleanup" solves this instantly.

* Architects spend hours reviewing diagrams for missing components — Architecture Assist does this in seconds.

* Context lives in Confluence, Notion, Slack, GitHub — scattered everywhere. Context Layer brings it all onto the canvas.

* Real-time collaboration is broken — people draw over each other, lose work, and diverge. ArchFlow WebSocket sync solves this.

# **3\. Target Users & Personas**

| Persona | Role | Primary Use Case | Key Feature |
| :---- | :---- | :---- | :---- |
| Aryan | Lead Backend Engineer | Design microservices architecture in team calls | Architecture Assist \+ Collab |
| Priya | Solution Architect | Document system designs for stakeholders | Context Layer \+ Export |
| Rahul | Engineering Manager | Review architecture with team, add comments | Mess Cleanup \+ Version History |
| Anjali | Full Stack Developer | Quick sketching before coding | Mess Cleanup \+ Code Snippets |
| Vikram | DevOps Engineer | Draw infra diagrams, link to IaC files | Context Layer \+ File Attach |

# **4\. Design System**

## **4.1 Brand Identity**

* Product Name: ArchFlow

* Tagline: Think. Draw. Execute.

* Brand Voice: Precise, powerful, and developer-first

* Vibe: Dark IDE meets intelligent design tool

## **4.2 Color Tokens**

| Token Name | Hex Value | Usage | Context |
| :---- | :---- | :---- | :---- |
| \--color-bg-primary | \#0F0F0F | Main app background | Canvas outer shell |
| \--color-bg-surface | \#1A1A2E | Sidebar, toolbar panels | All overlay panels |
| \--color-bg-elevated | \#252545 | Modal dialogs, popups | Context Layer panel |
| \--color-accent-primary | \#5B4FE8 | Brand purple, CTAs, active states | Primary interactive |
| \--color-accent-teal | \#00C9A7 | Success, Architecture Assist | AI feature color |
| \--color-accent-amber | \#F5A623 | Warnings, suggestions | Architecture warnings |
| \--color-accent-red | \#E85B5B | Errors, missing components | Critical gaps |
| \--color-text-primary | \#F0F0FF | Main body text | All readable content |
| \--color-text-muted | \#888899 | Secondary labels, hints | Metadata, timestamps |
| \--color-canvas | \#111120 | Canvas infinite background | Drawing surface |
| \--color-grid | \#1E1E35 | Dot grid on canvas | Spatial reference |
| \--color-border | \#2A2A50 | Subtle UI borders | Panel separators |

## **4.3 Typography**

| Token | Font | Size/Weight | Usage |
| :---- | :---- | :---- | :---- |
| \--font-display | Inter | 32px / 700 | Product name, hero headlines |
| \--font-heading | Inter | 20–24px / 600 | Panel headers, diagram labels |
| \--font-body | Inter | 14px / 400 | Body text, descriptions |
| \--font-code | JetBrains Mono | 13px / 400 | Code snippets in Context Layer |
| \--font-label | Inter | 11px / 500 | Element labels, tooltips, badges |
| \--font-canvas-text | Inter | 12–18px / 400 | Text drawn directly on canvas |

## **4.4 Spacing Scale**

* Base Unit: 4px

* Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px

* Component Padding: 12px (compact), 16px (default), 24px (spacious)

* Canvas Grid: 20px dot grid, snapping to 10px increments

## **4.5 Layout Architecture**

* Layout Type: Three-column dark IDE layout

* Left Panel (240px): Toolbox — shapes, connectors, templates, stickers

* Center: Infinite canvas with dot grid, zoom 10%–400%, pan via spacebar+drag

* Right Panel (320px): Context Layer — element properties, notes, code, links, files

* Top Bar (56px): Board name, collaborator avatars, AI buttons, share, export

* Bottom Bar (40px): Zoom controls, page selector, cursor coordinates

## **4.6 Component Library**

* Buttons: Primary (purple), Secondary (outlined), Ghost (transparent), Danger (red), AI (teal gradient)

* Inputs: Dark-surfaced, single bottom border on focus, purple glow ring

* Modals: Frosted glass dark overlay, 24px border radius, spring animation

* Tooltips: 8px border radius, 180ms delay, dark bg with white text

* Badges: Pill shape, 5 variants — info, success, warning, error, AI

* Canvas Elements: 8px border radius for shapes, 2px stroke, subtle shadow

# **5\. Core Features**

## **5.1 Canvas Engine**

The foundation of ArchFlow is a high-performance infinite canvas built using Fabric.js, rendering to HTML5 Canvas with a virtual DOM-like object model for efficient re-rendering.

### **5.1.1 Drawing Primitives**

* Rectangle — standard box for services, modules, databases

* Circle / Ellipse — actors, external systems

* Diamond — decision nodes in flow diagrams

* Cylinder — database representation

* Parallelogram — I/O blocks

* Hexagon — microservice nodes

* Cloud Shape — cloud infrastructure components

* Arrow (smart) — auto-routing connector that avoids overlapping shapes

* Dashed Arrow — async / event-driven connections

* Bidirectional Arrow — two-way API connections

* Free Draw — pen tool for freehand sketching

* Text Box — standalone text, supports markdown rendering

* Sticky Note — colored note cards, 6 color variants

* Image — paste / upload / drag-drop images onto canvas

* Embed — embed URLs (YouTube, GitHub, Figma) as live iframes

### **5.1.2 Selection & Manipulation**

* Multi-select via drag selection rectangle or Shift+Click

* Group selection — treat multiple elements as a single unit

* Resize handles — 8-point resize with aspect ratio lock (Shift)

* Rotation handle — free rotate with 15-degree snapping

* Snap to grid — 10px increments, smart alignment guides

* Alignment tools — align left, center, right, top, middle, bottom

* Distribution tools — evenly distribute horizontally/vertically

* Z-index controls — bring forward, send back, bring to front, send to back

* Copy/Paste — Ctrl+C/V, paste in-place or offset

* Duplicate — Ctrl+D with auto-offset

* Undo/Redo — 100-level history stack (Ctrl+Z / Ctrl+Y)

### **5.1.3 Canvas Navigation**

* Infinite pan — spacebar drag or middle mouse drag

* Smooth zoom — scroll wheel with focal point zoom, pinch on touch

* Zoom to fit — fit all elements in view (Ctrl+Shift+F)

* Minimap — collapsible minimap in bottom-right corner

* Dot grid background — toggleable, always present at zoom \< 200%

* Focus mode — hide all panels for full-screen drawing

## **5.2 Feature 1 — Mess Cleanup (AI Auto-Layout)**

**▌ Game-Changer Feature \#1**

Mess Cleanup is the most unique feature in ArchFlow. When a user draws rapidly during a meeting — boxes in random places, arrows going in all directions, text floating everywhere — a single click on the Mess Cleanup button transforms the chaos into a clean, professionally structured diagram.

### **5.2.1 How It Works — Algorithm Pipeline**

1. Element Classification — The algorithm first classifies each canvas element by type: Container (boxes, circles), Connector (arrows), Label (standalone text), and Group (visually close elements).

2. Relationship Graph Construction — Using arrow connections, the system builds a directed graph of relationships. If arrow A connects shape X to shape Y, then X → Y is an edge in the graph.

3. Graph Analysis — Topological sort is applied to detect hierarchy levels. Root nodes (no incoming arrows) go to Level 0\. Their children go to Level 1, and so on. Cycle detection handles circular dependencies gracefully.

4. Layout Strategy Selection — Based on graph shape, the system auto-selects: Left-to-Right Hierarchical (for system flows), Top-to-Bottom Tree (for dependency trees), Force-Directed (for non-hierarchical networks), Grid Layout (for parallel services).

5. Position Calculation — Each element gets assigned an (x, y) coordinate on a virtual grid. Equal spacing is enforced: 80px vertical gap, 120px horizontal gap minimum.

6. Animated Transition — Elements fly to their new positions via a smooth spring animation (300ms easing). Users can see the transformation happen in real time.

7. Post-Layout Adjustment — Smart connector re-routing ensures no arrows cross unnecessarily. Arrow waypoints are recalculated to use Manhattan-style orthogonal routing.

### **5.2.2 Cleanup Options**

* Auto (default) — fully automatic layout as described above

* Direction: Left-to-Right / Top-to-Bottom / Radial — user can override direction

* Spacing: Compact (60px gap) / Normal (120px) / Spacious (200px)

* Label Attachment — detached text labels are automatically attached to the nearest shape

* Color Grouping — shapes with same color are clustered together

* Preview Mode — shows a ghost preview before committing the layout

* Undo Support — full undo after Mess Cleanup restores original chaotic layout

### **5.2.3 UI Flow**

8. User draws chaotic diagram

9. Clicks the broom/magic-wand button in top toolbar labeled 'Mess Cleanup'

10. A side panel slides in showing Layout options (Direction, Spacing, Preview toggle)

11. User optionally adjusts settings, sees ghost preview

12. Clicks 'Apply' — animated layout transition executes

13. Toast notification: 'Cleaned up 14 elements into a left-to-right hierarchy'

## **5.3 Feature 2 — Architecture Assist (AI Co-Pilot)**

**▌ Game-Changer Feature \#2**

Architecture Assist is an AI-powered review engine that analyzes the current canvas diagram and provides structured, actionable feedback. It acts as a senior architect sitting beside the user and reviewing their design in real time.

### **5.3.1 What It Analyzes**

* Missing Components — identifies gaps in common patterns (e.g., no API Gateway before microservices, no CDN, no message queue for async operations)

* API Recommendations — suggests REST vs GraphQL vs gRPC based on diagram context

* Database Recommendations — NoSQL vs SQL, read replicas, caching strategy

* Security Gaps — no auth service drawn, no WAF, no rate limiter

* Scalability Issues — single points of failure, no load balancer, stateful services

* Naming Conventions — inconsistent naming of services detected

* Redundancy Suggestions — missing backup services, no failover path

* Best Practice Hints — 12-factor app principles, CQRS patterns, event sourcing

### **5.3.2 AI Backend**

* Model: Google Gemini 2.0 Flash (zero-cost on free tier for MVP)

* Input: Canvas is serialized to a structured JSON schema describing all elements, their types, labels, positions, and connections

* Prompt Strategy: System prompt defines the role as 'Senior Solutions Architect'. User prompt sends the serialized diagram JSON with the instruction to review and suggest improvements

* Output Format: Structured JSON with categories: missing\_components\[\], api\_suggestions\[\], db\_recommendations\[\], security\_gaps\[\], scalability\_issues\[\], improvements\[\]

* Streaming: Suggestions stream in one-by-one using SSE (Server-Sent Events) for fast perceived response

### **5.3.3 Suggestions Panel UI**

* Right panel opens with 'Architecture Assist' header in teal

* Suggestions categorized into tabs: Issues (red badge), Suggestions (amber), Optimizations (teal)

* Each suggestion card shows: icon, title, description, severity badge, and 'Add to Canvas' button

* 'Add to Canvas' button: instantly creates the suggested component as a new shape on the canvas, connected to the relevant element with a dashed arrow

* 'Explain More' button: opens a sub-panel with detailed explanation of why this component is needed

* Filtering by severity: Critical, Warning, Info

* Export Suggestions as PDF or Notion page

### **5.3.4 Context-Aware Mode**

* User can pin a specific element to 'focus' mode — Assist will analyze only that element's context

* 'Ask Assist' text box — user can type specific questions like 'How do I handle 1M concurrent users on this setup?'

* Conversation History — previous Assist responses stored per board session

## **5.4 Feature 3 — Context Layer (Rich Annotations)**

**▌ Game-Changer Feature \#3**

The Context Layer transforms every canvas element from a dumb shape into an intelligent knowledge node. Click any shape to open its Context Panel on the right and attach rich context to it — turning the whiteboard into a living architecture document.

### **5.4.1 Context Panel Tabs**

* Notes Tab — rich text editor (TipTap / ProseMirror) with markdown support, headings, bold, italic, bullet lists, code inline

* Links Tab — add named URLs with favicons auto-fetched. Supports: API docs, GitHub repos, Confluence pages, Notion docs, Jira tickets, Figma files

* Code Tab — full-featured code editor (Monaco Editor, same as VSCode) with syntax highlighting for 40+ languages. Supports multiple code snippets per element

* Files Tab — attach any file up to 20MB per element. Drag-and-drop upload. Preview support for images, PDFs, markdown files

* Comments Tab — threaded discussion. Team members can comment on specific elements. Replies, reactions (emoji), resolve status

* History Tab — timeline of all changes made to this element: position changes, label edits, context additions, with timestamp and author

### **5.4.2 Context Indicator System**

* Elements with context show small indicator dots on their bottom-right corner

* Purple dot \= has notes

* Blue dot \= has links

* Green dot \= has code snippets

* Orange dot \= has attached files

* Red dot \= has unresolved comments

### **5.4.3 Code Snippets in Context**

* Monaco Editor embedded in right panel — full IDE experience

* Language selector dropdown (JavaScript, Python, Go, Java, SQL, YAML, Dockerfile, etc.)

* Syntax highlighting, line numbers, copy button

* Run button (future): Execute JS/Python snippets via sandboxed evaluation

* Multiple named snippets per element: e.g., 'API Handler', 'DB Schema', 'Docker Config'

### **5.4.4 File Attachments**

* Supported file types: PDF, PNG, JPG, SVG, MD, TXT, YAML, JSON, CSV, ZIP

* Storage: Files uploaded to S3-compatible bucket (AWS S3 or Cloudflare R2 for cost efficiency)

* Preview: Images and PDFs render in an inline preview pane

* Max size: 20MB per file, 200MB per board

* File versioning: Each re-upload creates a new version, previous versions accessible

## **5.5 Real-Time Collaboration**

ArchFlow supports true real-time, multi-user collaboration — every change propagates instantly to all collaborators on the same board.

### **5.5.1 Collaboration Features**

* Live Cursors — each collaborator's cursor visible in real-time with their name badge and avatar color

* Presence System — show active collaborators in top bar with avatars. Show who is viewing vs actively editing

* Element Locking — when a user selects an element, it gets a soft lock with their color border, preventing conflicting edits

* Conflict Resolution — Last-Write-Wins (LWW) with operational transforms for text fields

* Follow Mode — click a collaborator's avatar to follow their viewport (great for presentations)

* Multiplayer Annotations — draw temporary pointers/laser dots for presentation-style explanation

* Guest Access — share a link for view-only or comment-only access without requiring signup

### **5.5.2 Room Management**

* Each board is a WebSocket room identified by boardId

* Max concurrent collaborators: 50 per board (enterprise: 200\)

* Persistent rooms — reconnect support with state resync from Redis

* Notification on collaborator join/leave with toast

## **5.6 Additional Features**

### **5.6.1 Template Library**

* 50+ pre-built architecture templates: Microservices, Monolith, Event-Driven, CQRS, CI/CD Pipeline, AWS Architecture, Kubernetes Cluster, GraphQL API, REST API Gateway

* User-created templates — save any board state as a reusable template

* Team templates — share templates within organization

* One-click import — apply any template to a new or existing board

### **5.6.2 Version History**

* Auto-snapshot every 5 minutes of active editing

* Manual snapshots with user-defined labels (e.g., 'v2 \- after team review')

* Visual diff view — overlay two versions to see exactly what changed

* Restore to any snapshot

* History stored for 30 days (free), unlimited (pro)

### **5.6.3 Export Options**

* PNG — high resolution (2x, 4x retina), transparent background option

* SVG — scalable vector export for documentation

* PDF — multi-page support for large boards

* Mermaid.js — convert diagram to Mermaid code for embedding in GitHub README

* Lucid/Visio XML — compatibility export for enterprise tools

* Share Link — public / private link with optional password protection

* Embed Code — iFrame embed for Notion, Confluence, GitHub Wiki

### **5.6.4 Smart Shapes Library**

* AWS Icon Set (200+ official AWS service icons)

* GCP / Azure Icon Sets

* Kubernetes icons

* Database icons (PostgreSQL, MongoDB, Redis, MySQL logos)

* Programming language logos

* Network topology shapes

* BPMN notation shapes

* UML class/sequence shapes

### **5.6.5 Keyboard Shortcuts**

| Shortcut | Action | Context |
| :---- | :---- | :---- |
| Ctrl \+ Z / Y | Undo / Redo | Global |
| Ctrl \+ A | Select All | Canvas |
| Ctrl \+ G | Group Selected | Canvas |
| Ctrl \+ Shift \+ F | Fit to View | Canvas |
| Ctrl \+ M | Trigger Mess Cleanup | Canvas |
| Ctrl \+ Shift \+ A | Open Architecture Assist | Canvas |
| Ctrl \+ K | Context Layer for selected | Canvas |
| Space \+ Drag | Pan Canvas | Canvas |
| Escape | Deselect / Close panels | Global |
| Ctrl \+ / | Command Palette | Global |
| Ctrl \+ E | Export current view | Canvas |
| F2 | Rename selected element | Canvas |

# **6\. Technical Architecture**

## **6.1 Technology Stack**

| Layer | Technology | Reasoning |
| :---- | :---- | :---- |
| Frontend Framework | React 18 \+ Vite | Component model, fast HMR, concurrent mode |
| Canvas Engine | Fabric.js 6.x | Object model on Canvas2D, great serialization, performance |
| State Management | Zustand | Simple, no-boilerplate, perfect for canvas object state |
| Styling | SCSS \+ CSS Custom Properties | Dark theming, token system, component-scoped |
| Real-time | Socket.IO (WebSockets) | Auto-reconnect, rooms, namespaces, fallback to polling |
| Code Editor | Monaco Editor (React) | VSCode engine, syntax highlighting, LSP-ready |
| Rich Text | TipTap (ProseMirror) | Extensible, markdown, collaborative (Yjs-ready) |
| Authentication | Clerk | Auth \+ RBAC out-of-box, organizations, invite system |
| Backend Framework | Express.js \+ Node.js | MERN stack, fast I/O, large ecosystem |
| Primary Database | MongoDB Atlas | Flexible schema for canvas JSON, fast document ops |
| Real-time State | Redis (Upstash) | Pub/Sub for events, canvas state cache, presence |
| File Storage | Cloudflare R2 / AWS S3 | Context Layer file attachments, export storage |
| AI Provider | Google Gemini 2.0 Flash | Architecture Assist, free tier for MVP, fast inference |
| Deployment (FE) | Vercel | Edge CDN, preview deployments, zero-config |
| Deployment (BE) | Railway / Render | Node.js \+ Socket.IO support, persistent connections |
| CI/CD | GitHub Actions | Automated test \+ deploy on push |

## **6.2 System Architecture Overview**

ArchFlow follows a clean three-tier architecture with a real-time layer separated from the standard REST API layer:

* Client Layer: React SPA served via Vercel CDN. Canvas rendered via Fabric.js on HTML5 Canvas element.

* API Layer: Express REST API handles auth, CRUD operations, AI integration, file uploads. Runs on Railway.

* Real-time Layer: Socket.IO server (can run on same Express server or separately). Uses Redis pub/sub for horizontal scaling across multiple Socket.IO instances.

* AI Layer: Express route proxies requests to Gemini API, serializes canvas to structured JSON, streams response back via SSE.

* Storage Layer: MongoDB for persistent board data. Redis for ephemeral state (cursor positions, presence, locks). R2/S3 for binary files.

## **6.3 Frontend Project Structure**

Strict feature-first folder organization for maintainability:

* src/features/canvas/ — Fabric.js canvas setup, event handlers, serialization

* src/features/mess-cleanup/ — layout algorithm, animation controller

* src/features/architecture-assist/ — AI panel, suggestion cards, streaming

* src/features/context-layer/ — right panel tabs, Monaco, TipTap, file upload

* src/features/collaboration/ — Socket.IO client, cursor overlay, presence

* src/features/toolbar/ — shape tools, connectors, selection tools

* src/store/ — Zustand slices: canvasStore, collaborationStore, uiStore, contextStore

* src/services/ — API client (axios), socket client, AI service

* src/components/ — shared UI: Button, Modal, Panel, Tabs, Badge, Tooltip

* src/hooks/ — useCanvas, useCollaboration, useContextLayer, useSocket

* src/styles/ — tokens.scss, mixins.scss, animations.scss, theme.scss

## **6.4 Backend Project Structure**

* src/routes/ — boards.js, elements.js, collaboration.js, ai.js, files.js, users.js

* src/controllers/ — business logic per route

* src/models/ — Board.js, Element.js, ContextItem.js, User.js

* src/socket/ — socket.js (connection handler), roomManager.js, presenceManager.js

* src/services/ — geminiService.js, redisService.js, s3Service.js, layoutService.js

* src/middleware/ — auth.js (Clerk JWT), rateLimit.js, errorHandler.js, logger.js

* src/utils/ — canvasSerializer.js, graphAnalyzer.js, layoutEngine.js

# **7\. Data Models (MongoDB Schemas)**

## **7.1 Board Model**

The primary document representing a ArchFlow board:

| Field | Type | Description |
| :---- | :---- | :---- |
| \_id | ObjectId | Board unique identifier |
| title | String | Board display name, max 100 chars |
| ownerId | String | Clerk user ID of board creator |
| organizationId | String | Clerk org ID (optional, for team boards) |
| canvas | Object | Serialized Fabric.js canvas JSON (elements, viewport) |
| thumbnail | String | URL of auto-generated board thumbnail (S3) |
| collaborators | Array\<Object\> | \[{userId, role: 'editor'|'viewer'|'commenter', addedAt}\] |
| shareSettings | Object | {isPublic, shareToken, permissions, passwordHash} |
| snapshots | Array\<Object\> | \[{snapshotId, label, canvas, createdAt, createdBy}\] |
| tags | Array\<String\> | User-defined tags for board organization |
| isTemplate | Boolean | Whether board is saved as a template |
| createdAt | Date | Creation timestamp |
| updatedAt | Date | Last modification timestamp |

## **7.2 Element Model**

Each shape on the canvas is stored as a separate document (for efficient partial updates and conflict resolution):

| Field | Type | Description |
| :---- | :---- | :---- |
| \_id | ObjectId | Element unique identifier |
| boardId | ObjectId | Reference to parent Board (indexed) |
| fabricId | String | Fabric.js element ID (uuid, for sync) |
| type | String (Enum) | rect | circle | diamond | arrow | text | sticky | image | embed | freehand |
| label | String | Text content of element |
| position | Object | {left, top, width, height, angle, scaleX, scaleY} |
| style | Object | {fill, stroke, strokeWidth, opacity, fontFamily, fontSize} |
| connections | Array\<String\> | Array of fabricIds this element connects to (for arrows) |
| contextLayer | Object | Embedded context: {notes, links\[\], codeSnippets\[\], fileRefs\[\], comments\[\]} |
| lockedBy | String | userId who has this element locked (transient, also in Redis) |
| zIndex | Number | Rendering order |
| groupId | String | If part of a group, group identifier |
| createdBy | String | userId of creator |
| updatedAt | Date | For sync conflict detection |

## **7.3 Context Layer Sub-Schema**

| Sub-field | Type | Description |
| :---- | :---- | :---- |
| notes | String | TipTap ProseMirror JSON serialized as string |
| links | Array\<Object\> | \[{url, title, favicon, addedBy, addedAt}\] |
| codeSnippets | Array\<Object\> | \[{id, name, language, code, createdBy, updatedAt}\] |
| fileRefs | Array\<Object\> | \[{fileId, name, size, mimeType, s3Key, uploadedBy, uploadedAt}\] |
| comments | Array\<Object\> | \[{id, userId, text, replies\[\], reactions{}, resolved, createdAt}\] |

# **8\. API Design (REST Endpoints)**

| Method | Route | Auth | Description |
| :---- | :---- | :---- | :---- |
| GET | /api/boards | Required | List all boards for current user |
| POST | /api/boards | Required | Create new board, optionally from template |
| GET | /api/boards/:id | Required | Get full board including canvas JSON |
| PUT | /api/boards/:id | Required | Update board metadata (title, tags, share settings) |
| DELETE | /api/boards/:id | Owner only | Soft delete board |
| GET | /api/boards/:id/elements | Required | Get all elements for board (paginated) |
| POST | /api/boards/:id/elements | Editor | Create new element (also via Socket) |
| PUT | /api/boards/:id/elements/:eid | Editor | Update element (position, style, label) |
| DELETE | /api/boards/:id/elements/:eid | Editor | Delete element from board |
| PUT | /api/boards/:id/elements/:eid/context | Editor | Update Context Layer for element |
| POST | /api/boards/:id/snapshots | Editor | Create manual snapshot |
| GET | /api/boards/:id/snapshots | Required | List all snapshots for board |
| POST | /api/boards/:id/snapshots/:sid/restore | Editor | Restore board to snapshot |
| POST | /api/ai/architecture-assist | Required | Analyze canvas JSON with Gemini |
| POST | /api/ai/mess-cleanup | Required | Run layout algorithm on element set |
| POST | /api/files/upload | Required | Upload file for Context Layer, returns S3 URL |
| DELETE | /api/files/:fileId | Required | Delete attached file |
| GET | /api/templates | Public | List public and user templates |
| POST | /api/templates | Required | Save board as template |

# **9\. WebSocket Events (Socket.IO)**

## **9.1 Connection & Room Events**

| Event Name | Direction | Payload & Purpose |
| :---- | :---- | :---- |
| board:join | Client → Server | {boardId, userId, userName, avatarColor} — join board room |
| board:joined | Server → Client | {boardId, collaborators\[\], canvasState} — confirm join \+ initial state |
| board:left | Server → Room | {userId} — broadcast when user disconnects |
| board:leave | Client → Server | {boardId} — explicit leave |

## **9.2 Canvas Sync Events**

| Event Name | Direction | Payload & Purpose |
| :---- | :---- | :---- |
| element:create | Client → Room | {element, boardId, userId, timestamp} — new element added |
| element:update | Client → Room | {fabricId, changes, boardId, userId, timestamp} — position/style update |
| element:delete | Client → Room | {fabricId, boardId, userId} — element removed |
| element:lock | Client → Room | {fabricId, lockedBy: userId} — element selected, soft lock |
| element:unlock | Client → Room | {fabricId} — element deselected, lock released |
| canvas:clear | Client → Room | {boardId, userId} — full canvas clear (with confirmation) |
| canvas:save | Server → Client | {savedAt} — acknowledgment of server-side save |

## **9.3 Presence Events**

| Event Name | Direction | Payload & Purpose |
| :---- | :---- | :---- |
| cursor:move | Client → Room | {userId, x, y, boardId} — throttled to 30fps |
| cursor:positions | Server → Client | {cursors: \[{userId, x, y, userName, color}\]} — batch update |
| viewport:change | Client → Room | {userId, viewport: {x, y, zoom}} — for Follow Mode |
| user:typing | Client → Room | {userId, elementId, isTyping} — show typing indicator |
| context:update | Client → Room | {fabricId, contextPatch, userId} — Context Layer change |

## **9.4 Redis Architecture for Real-Time State**

* Key Pattern: board:{boardId}:elements — Hash of all element states, field \= fabricId, value \= element JSON

* Key Pattern: board:{boardId}:cursors — Hash of cursor positions, field \= userId, value \= {x, y, timestamp}

* Key Pattern: board:{boardId}:presence — Set of active userId values

* Key Pattern: board:{boardId}:locks — Hash of element locks, field \= fabricId, value \= userId (TTL: 30s)

* Pub/Sub Channel: board:{boardId}:events — All events published here for horizontal scaling (multiple Socket.IO server nodes subscribe)

* Session TTL: Board state in Redis expires after 2 hours of inactivity. Persistent state is always in MongoDB.

* Redis as Cache: Initial canvas load served from Redis if available (\< 2hr old), otherwise load from MongoDB and hydrate Redis.

# **10\. Scalability & Maintainability**

## **10.1 Scalability Principles**

* Stateless API Servers: All Express API servers are stateless. Session state lives in Redis. Any API instance can handle any request. Scale horizontally with load balancer.

* Socket.IO Horizontal Scaling: Use Redis Pub/Sub adapter (socket.io-redis) so multiple Socket.IO nodes can broadcast to rooms. A client on Node A and client on Node B both get the same events.

* Canvas as Delta Updates: Never send the full canvas on every change. Only send delta operations (element:create, element:update with only changed fields). Reduces bandwidth by 95%.

* CDN for Static Assets: All shape icons, fonts, static UI served via Vercel Edge CDN. Canvas thumbnails served via Cloudflare CDN.

* AI Request Queue: Architecture Assist requests are queued via Redis Queue (bull) to prevent Gemini API rate-limit overruns and ensure fair usage per board.

* Database Indexing: MongoDB indexes on boardId (all element queries), userId, organizationId, updatedAt (for sync conflict detection), fabricId (for element lookup).

* Connection Pooling: Mongoose connection pool configured for peak load. Redis uses single shared connection per server instance.

## **10.2 Performance Targets**

| Metric | Target | Strategy |
| :---- | :---- | :---- |
| Board Load Time | \< 500ms (P95) | Redis cache \+ CDN assets |
| Real-time Event Latency | \< 80ms (P95) | Redis pub/sub, delta updates |
| Canvas FPS (200 elements) | \> 60fps | Fabric.js object model, deferred re-renders |
| Mess Cleanup (50 elements) | \< 300ms | Client-side layout algorithm, no server call |
| Architecture Assist Response | \< 3s (streaming) | Gemini Flash, SSE streaming, request queue |
| Concurrent Boards (server) | 500 active boards | Horizontal scaling \+ Redis adapter |
| File Upload (20MB) | \< 5s | Direct-to-S3 presigned URL upload |

## **10.3 Maintainability Principles**

* Feature Flags: New features (especially AI features) hidden behind feature flags in environment variables. Zero-downtime feature rollouts.

* Strict Folder Separation: Features are fully encapsulated. A feature folder contains its own components, hooks, services, store slice, and styles. No cross-feature imports except through shared/ or store/.

* TypeScript: Full TypeScript throughout frontend and backend. Strict mode enabled. Explicit types for all API payloads, WebSocket events, and MongoDB documents.

* No Inline CSS: Standardize all styling using SCSS and CSS Custom Properties. Inline styles are strictly forbidden to ensure theme consistency and maintainability. Any existing inline styles must be refactored into proper SCSS files.

* API Versioning: All routes prefixed with /api/v1/. Version 2 routes can be introduced in parallel without breaking existing clients.

* Error Handling: Centralized error handler middleware. All async Express routes wrapped in asyncHandler. Structured error responses: {error: {code, message, field?}}.

* Logging: Winston structured JSON logging. Log levels: error, warn, info, debug. Correlation IDs on all requests for tracing.

* Testing Strategy: Unit tests for layout algorithm (Jest). Integration tests for API routes (Supertest). E2E tests for critical flows (Playwright).

* Environment Configuration: Strict .env schema validation on startup via Zod. App refuses to start with invalid environment — no silent config failures.

## **10.4 Engineering & Workflow Standards**

* **Git Branching Strategy (Git Flow):**
    - `main`: Production-ready, stable code only.
    - `develop`: Primary integration branch for active development.
    - `feature/*`: Specific tasks or features. Created from `develop`, merged back via PR.
    - `hotfix/*`: Critical production fixes. Created from `main`, merged into `main` and `develop`.

* **Commit Message Convention:**
    - Use Conventional Commits: `type(scope): description`
    - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.
    - Example: `feat(canvas): implement zoom and pan controls`.

* **Styling & UI:**
    - **Strictly No Inline CSS**: All styles must reside in `.scss` files or use CSS Custom Properties.
    - Use Design Tokens for colors, spacing, and typography to maintain consistency.

* **Code Review & Pull Requests:**
    - No direct commits to `main` or `develop` (except initial setup).
    - Every feature must be merged via a Pull Request (PR) from a `feature/*` branch into `develop`.
    - PRs should be small, focused, and include relevant tests.

* **Testing & Validation:**
    - All complex algorithms (Mess Cleanup, serialization) must have unit tests.
    - Critical user flows must be covered by Playwright E2E tests before major releases.

# **11\. Security Architecture**

## **11.1 Authentication & Authorization**

* Auth Provider: Clerk handles all authentication — signup, login, OAuth (Google, GitHub), MFA, session management.

* JWT Validation: All API routes validate Clerk JWT token via @clerk/express middleware. No auth \= 401 immediately.

* RBAC on Boards: Three roles — Owner (full control), Editor (draw, edit, context), Viewer (read-only), Commenter (add comments only).

* Invitation System: Collaborators can only be added via email invitation. No join-by-default even with shared link.

* Organization Boards: Team boards scoped to Clerk Organization. Only org members can access.

## **11.2 Data Security**

* Context Layer Encryption: Sensitive code snippets and notes can be encrypted client-side (AES-256-GCM) before storage — zero-knowledge option for Pro users.

* File Security: Presigned S3 URLs expire in 15 minutes. All file access goes through auth check before presigned URL generation.

* Rate Limiting: Express rate limiter (express-rate-limit) — 100 req/15min per IP for public routes, 1000 req/15min for authenticated routes. AI routes: 10 req/min per user.

* CORS: Strict whitelist — only frontend domain allowed. No wildcard CORS in production.

* Input Sanitization: All user inputs sanitized via validator.js. Canvas JSON validated against schema before storage to prevent injection.

* HTTPS Only: Strict HTTPS in production. HSTS headers. No mixed content.

* WebSocket Auth: Socket.IO middleware validates Clerk JWT on every connection before joining any room.

# **12\. Development Roadmap**

## **Phase 1 — Foundation (Weeks 1–3)**

**▌ Goal: Working canvas with basic drawing and real-time sync**

14. Setup: Vite \+ React 18 \+ SCSS tokens \+ Zustand store structure \+ Clerk auth

15. Canvas: Fabric.js setup, infinite canvas, dot grid background, zoom/pan

16. Shapes: Rectangle, Circle, Arrow, Text, Sticky Note drawing tools

17. Selection: Multi-select, resize, rotate, delete, copy/paste, undo/redo

18. Backend: Express \+ MongoDB models (Board, Element), REST CRUD APIs

19. Real-time: Socket.IO setup, board:join/leave, element:create/update/delete sync

20. Redis: Board state cache, cursor positions, presence

21. Auth: Clerk integration, protected routes, board ownership

## **Phase 2 — Game-Changer Features (Weeks 4–6)**

**▌ Goal: Mess Cleanup \+ Architecture Assist \+ Context Layer**

22. Mess Cleanup: Graph construction, topological sort, layout algorithm, spring animation

23. Mess Cleanup UI: Options panel, preview mode, direction/spacing controls

24. Architecture Assist: Gemini 2.0 Flash integration, canvas serializer, prompt engineering

25. Architecture Assist UI: Suggestions panel, category tabs, 'Add to Canvas' action

26. Context Layer: Right panel structure, TipTap notes editor, link manager

27. Code Snippets: Monaco Editor integration, language selector, multi-snippet support

28. File Attachments: S3/R2 upload, presigned URLs, file preview, file list

29. Context Indicators: Element dots showing context presence

## **Phase 3 — Collaboration & Polish (Weeks 7–8)**

**▌ Goal: Full collaboration, templates, version history**

30. Live Cursors: Real-time cursor positions with name badges and avatar colors

31. Element Locking: Soft locks with colored borders when element is selected

32. Follow Mode: Click collaborator avatar to follow their viewport

33. Version History: Auto-snapshots, manual snapshots, restore functionality

34. Template Library: 20 pre-built templates, save-as-template feature

35. Export: PNG, SVG, PDF export. Mermaid.js code export

36. Smart Shapes: AWS, GCP icons, database icons, Kubernetes icons

37. Keyboard Shortcuts: Full shortcut system, command palette

## **Phase 4 — Pro Features & Launch (Weeks 9–10)**

**▌ Goal: Monetization features, polish, production readiness**

38. Embedding: iFrame embed code generator, public board view

39. Comments: Threaded comments on elements, resolve status, mentions

40. Advanced Assist: Context-aware mode, Ask Assist text input, conversation history

41. CI/CD: GitHub Actions pipeline, automated tests, preview deployments

42. Analytics: Board view counts, collaboration metrics, AI usage tracking

43. Landing Page: Product landing page, waitlist, pricing page

44. Documentation: User guide, API docs (Swagger), developer docs

## **12.1 Monetization Model**

| Tier | Price | Features |
| :---- | :---- | :---- |
| Free | ₹0 / month | 3 boards, 3 collaborators/board, 50 Assist credits/month, 100MB storage |
| Pro | ₹499 / month | Unlimited boards, 10 collaborators/board, 500 Assist credits, 5GB storage, version history |
| Team | ₹1999 / month | Everything in Pro, unlimited collaborators, org boards, RBAC, 20GB storage, SSO |
| Enterprise | Custom | Custom AI models, self-hosted option, SLA, audit logs, dedicated support |

# **13\. Success Metrics (KPIs)**

| Metric | Month 1 Target | Month 3 Target | Measurement |
| :---- | :---- | :---- | :---- |
| Daily Active Users | 100 DAU | 1,000 DAU | Auth sessions |
| Boards Created / Day | 50 | 500 | MongoDB count |
| Mess Cleanup Usage Rate | 60% of users | 75% of users | Event tracking |
| Arch Assist Clicks / Board | 2 per session | 4 per session | Event tracking |
| Context Layer Adoption | 30% of elements | 50% of elements | Elements with context |
| Avg Session Duration | 15 min | 25 min | Session analytics |
| Collaborative Sessions | 20% of boards | 40% of boards | Multi-user boards |
| Pro Conversion Rate | 5% | 8% | Payment events |
| NPS Score | \> 40 | \> 60 | In-app survey |

# **14\. Open Questions & Future Considerations**

* Yjs Integration: For truly conflict-free concurrent text editing in Context Layer notes, Yjs CRDTs can replace the current LWW strategy.

* Offline Support: Service Worker \+ IndexedDB for offline canvas editing. Sync delta queue when connection restores.

* Mobile App: React Native with Skia canvas renderer for iPad/tablet native experience.

* Plugin System: Allow third-party plugins to add custom shapes, context tab types, or Assist modules.

* AI Model Choice: Allow Pro users to bring their own API key for OpenAI GPT-4o or Claude Sonnet for Architecture Assist.

* Mermaid-to-Canvas: Import Mermaid.js code and auto-render as ArchFlow elements.

* GitHub Integration: Link diagram elements to GitHub repos, auto-fetch README and show in Context Layer.

* Jira Integration: Link elements to Jira tickets, show ticket status badge on canvas element.

*ArchFlow PRD v1.0.0  •  Think. Draw. Execute.*