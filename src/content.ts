type Mode = 'off' | 'fill' | 'fullscreen';

type IncomingMessage = { type: 'SET_MODE'; mode: Mode };

const STYLE_ID = 'vf-injected-styles';

const MODE_STYLES: Record<Exclude<Mode, 'off'>, string> = {
  fill: `video { object-fit: fill !important; }`,
  fullscreen: `video {
    object-fit: fill !important;
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    z-index: 2147483647 !important;
  }`,
};

function applyMode(mode: Mode): void {
  document.getElementById(STYLE_ID)?.remove();
  if (mode === 'off') return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = MODE_STYLES[mode];
  document.documentElement.appendChild(style);
}

// Restore stored mode on page load
(async () => {
  const hostname = window.location.hostname;
  if (!hostname) return;
  const stored = await chrome.storage.local.get(hostname);
  const mode = (stored[hostname] as Mode | undefined) ?? 'off';
  applyMode(mode);
})();

chrome.runtime.onMessage.addListener((msg: IncomingMessage, _sender, sendResponse) => {
  if (msg.type === 'SET_MODE') {
    applyMode(msg.mode);
    sendResponse({ ok: true });
  }
  return true;
});
