import './popup.css';

type Mode = 'off' | 'fill' | 'fullscreen';

const HINTS: Record<Mode, string> = {
  off: 'No changes applied.',
  fill: 'object-fit stretched to fill container.',
  fullscreen: 'Video pinned to cover the full viewport.',
};

let currentHostname = '';
let currentTabId: number | undefined;

function el<T extends HTMLElement>(id: string): T {
  return document.getElementById(id) as T;
}

function setActiveButton(mode: Mode): void {
  document.querySelectorAll<HTMLElement>('.mode-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
  el('hint').textContent = HINTS[mode];
}

function showError(msg: string): void {
  el('error-msg').textContent = msg;
  el('error-msg').classList.remove('hidden');
  el('controls').classList.add('hidden');
}

function showControls(): void {
  el('controls').classList.remove('hidden');
  el('error-msg').classList.add('hidden');
}

async function applyMode(mode: Mode): Promise<void> {
  setActiveButton(mode);
  await chrome.storage.local.set({ [currentHostname]: mode });
  try {
    await chrome.tabs.sendMessage(currentTabId!, { type: 'SET_MODE', mode });
  } catch {
    // Content script may not be injected on restricted pages
  }
}

async function init(): Promise<void> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  currentTabId = tab.id;

  let hostname = '';
  try {
    hostname = new URL(tab.url ?? '').hostname;
  } catch {
    // invalid URL (e.g. chrome:// pages)
  }

  if (!hostname) {
    showError('Video Fill does not work\non browser internal pages.');
    return;
  }

  currentHostname = hostname;
  el('hostname').textContent = hostname;
  showControls();

  const stored = await chrome.storage.local.get(hostname);
  const mode = (stored[hostname] as Mode | undefined) ?? 'off';
  setActiveButton(mode);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll<HTMLElement>('.mode-btn').forEach((btn) => {
    btn.addEventListener('click', () => applyMode(btn.dataset.mode as Mode));
  });
  init();
});
