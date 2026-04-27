# Privacy Policy — Video Fill

**Extension:** Video Fill - TheY2T
**Last updated:** 2026-04-27

## Overview

Video Fill is a browser extension that lets you stretch video elements to remove letterboxing and pillarboxing on any webpage. This policy describes what data the extension accesses and how it is handled.

## Data Collection

**This extension does not collect, transmit, or share any personal data.**

No information about you, your browsing activity, or the pages you visit is ever sent to any server or third party.

## Data Stored Locally

The extension stores your chosen fill mode per website hostname in your browser's local storage (`chrome.storage.local`):

| Value               | Purpose                                                                        |
| ------------------- | ------------------------------------------------------------------------------ |
| `[hostname]` → mode | Your selected mode (Off / Fill / Fullscreen) for each site you have configured |

Example stored data:

```json
{
  "twitch.tv": "fullscreen",
  "youtube.com": "fill"
}
```

This data:

- Never leaves your device
- Is not tied to any account or identity
- Only exists for sites where you have changed the default (Off) mode
- Can be cleared at any time by removing the extension or clearing browser storage

## Permissions Used

| Permission                     | Why it is needed                                                                                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `storage`                      | Saves your per-site fill mode so the popup restores your preference when you revisit a site                                                            |
| `activeTab`                    | Identifies the currently focused tab so the popup can read its hostname and send the fill mode command to the content script on that tab               |
| `host_permissions: <all_urls>` | Videos can be embedded on any website; the extension must be able to run on any domain to apply fill styles to `<video>` elements wherever they appear |

## Content Script Behavior

A content script is injected into every webpage you visit. It:

- Reads `chrome.storage.local` on page load to restore your saved mode for that site
- Listens for mode-change commands from the extension popup
- Injects or removes a `<style>` tag that applies CSS to `<video>` elements on the page

The content script reads only the current page's hostname from `window.location.hostname` and the stored mode for that hostname. It does not read page content, form data, cookies, URLs, or any other information.

## Remote Code

This extension does not load or execute any remote code. All logic is bundled locally within the extension package. There are no external API calls, analytics libraries, or tracking scripts.

## Third Parties

This extension has no third-party integrations. No data is shared with or accessible by any third party.

## Changes to This Policy

If this policy is updated, the updated version will be published alongside the extension. The "Last updated" date at the top of this document will reflect when changes were made.

## Contact

For questions or concerns about this privacy policy, please open an issue at the extension's repository or contact the developer directly.
