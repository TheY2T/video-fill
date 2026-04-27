# Video Fill - TheY2T

A Chrome extension that removes letterboxing and pillarboxing from any video by stretching it to fill the screen.

## Features

- **Three modes per site** — Off, Fill, and Fullscreen, remembered independently per domain
- **Fill mode** — sets `object-fit: fill` on video elements, eliminating black bars caused by aspect ratio padding
- **Fullscreen mode** — pins the video to cover the entire viewport using `position: fixed`, overriding any container constraints
- **Per-domain persistence** — your setting for each site is saved and automatically restored on your next visit
- **Works anywhere** — any site with a `<video>` element: Twitch, YouTube, Netflix, Plex, sports streams, and more
- **No tracking, no data collection** — all storage is local to your browser

## Installation

### Chrome Web Store

_(Link will be added once published)_

### Load locally (development)

1. Clone this repository and build (see [Development](#development))
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer mode** (top right)
4. Click **Load unpacked** and select the `dist/` folder

## Usage

1. Navigate to any page with a video
2. Click the **Video Fill** icon in your toolbar
3. The current site's hostname is shown at the top
4. Select a mode:
   - **Off** — no changes; video renders normally
   - **Fill** — stretches the video within its container (`object-fit: fill`)
   - **Fullscreen** — forces the video to cover the full browser viewport

Your choice is saved per site and restored automatically on your next visit.

## Permissions

| Permission                     | Reason                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------ |
| `storage`                      | Saves your fill mode per site so preferences persist between visits            |
| `activeTab`                    | Reads the current tab's hostname and sends mode commands to the content script |
| `host_permissions: <all_urls>` | Videos appear on any domain; the extension must be able to run everywhere      |

No browsing history, page content, or personal data is ever read or transmitted. See [PRIVACY_POLICY.md](./PRIVACY_POLICY.md) for full details.

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- [pnpm](https://pnpm.io/) 9 or later (`npm install -g pnpm`)

### Setup

```bash
pnpm install
```

### Build

```bash
pnpm build
```

Output is written to `dist/`. Load it unpacked in Chrome to test.

### Project structure

```
video-fill/
├── images/              # Extension icons (16, 48, 128, 2048 px PNG)
├── screenshots/         # Chrome Web Store listing screenshots
├── scripts/
│   └── copy-assets.js   # Copies manifest + images into dist/
├── src/
│   ├── content.ts       # Content script: applies CSS to <video> elements
│   ├── popup.ts         # Popup UI logic
│   └── popup.css        # Popup styles (dark theme)
├── dist/                # Build output (gitignored)
├── manifest.json        # MV3 manifest
├── popup.html           # Popup HTML shell
├── vite.config.ts       # Popup build
├── vite.content.config.ts # Content script build (IIFE)
├── tsconfig.json
├── package.json
└── pnpm-workspace.yaml
```

### How it works

The extension has two parts:

**Content script** (`content.js`) — injected into every page at `document_idle`. On load it reads `chrome.storage.local` for the current hostname and applies the stored mode. It listens for `SET_MODE` messages from the popup and injects or removes a `<style>` tag targeting all `<video>` elements on the page.

**Popup** (`popup.html`) — queries the active tab's URL to get the hostname, reads the stored mode, and renders three mode buttons. Clicking a button writes the new mode to storage and sends `SET_MODE` to the content script.

No background service worker is required.

## Tech stack

| Tool       | Version | Role               |
| ---------- | ------- | ------------------ |
| TypeScript | ^5.7    | Language           |
| Vite       | ^6.3    | Build tool         |
| pnpm       | 9.15.4  | Package manager    |
| Chrome MV3 | —       | Extension platform |

## Icons

Place your icon files in `images/` before building:

| File            | Size                                  |
| --------------- | ------------------------------------- |
| `icon-16.png`   | 16 × 16 px                            |
| `icon-48.png`   | 48 × 48 px                            |
| `icon-128.png`  | 128 × 128 px                          |
| `icon-2048.png` | 2048 × 2048 px (for Chrome Web Store) |

## License

[MIT](./LICENSE) © TheY2T
