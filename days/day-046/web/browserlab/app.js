'use strict';
const $ = (selector) => document.querySelector(selector);
const urlForm = $('#url-form');
const searchInput = $('#search');
const viewInput = $('#view');
const urlOutput = $('#url-output');
function readUrl() {
  const url = new URL(window.location.href);
  searchInput.value = url.searchParams.get('q') ?? '';
  const view = url.searchParams.get('view') ?? 'all';
  viewInput.value = ['all', 'active', 'archived'].includes(view) ? view : 'all';
  urlOutput.textContent = `Path: ${url.pathname}\nQuery: ${url.search || '(none)'}\nHistory length: ${history.length}`;
}
function writeUrl(method) {
  const url = new URL(window.location.href);
  const q = searchInput.value.trim();
  if (q) url.searchParams.set('q', q);
  else url.searchParams.delete('q');
  if (viewInput.value !== 'all') url.searchParams.set('view', viewInput.value);
  else url.searchParams.delete('view');
  history[method]({ source: 'browserlab' }, '', url);
  readUrl();
}
urlForm.addEventListener('submit', (event) => {
  event.preventDefault();
  writeUrl('pushState');
});
$('#replace-url').addEventListener('click', () => writeUrl('replaceState'));
$('#clear-url').addEventListener('click', () => {
  searchInput.value = '';
  viewInput.value = 'all';
  writeUrl('pushState');
});
window.addEventListener('popstate', readUrl);
readUrl();

const preferenceKey = 'day46-browserlab-preference';
const storageOutput = $('#storage-output');
function cookieValue() {
  const entry = document.cookie.split('; ').find((part) => part.startsWith(`${preferenceKey}=`));
  if (!entry) return null;
  try {
    return decodeURIComponent(entry.slice(preferenceKey.length + 1));
  } catch {
    return null;
  }
}
function operateStorage(action) {
  const kind = $('#storage-kind').value;
  const value = $('#preference').value.trim();
  try {
    if (kind === 'cookie') {
      if (action === 'save')
        document.cookie = `${preferenceKey}=${encodeURIComponent(value)}; Path=/; SameSite=Lax; Max-Age=3600`;
      if (action === 'remove')
        document.cookie = `${preferenceKey}=; Path=/; SameSite=Lax; Max-Age=0`;
      storageOutput.textContent = `Cookie (${action}): ${cookieValue() ?? '(not found)'}`;
    } else {
      const store = kind === 'local' ? localStorage : sessionStorage;
      if (action === 'save') store.setItem(preferenceKey, value);
      if (action === 'remove') store.removeItem(preferenceKey);
      storageOutput.textContent = `${kind}Storage (${action}): ${store.getItem(preferenceKey) ?? '(not found)'}`;
    }
  } catch (error) {
    storageOutput.textContent = `Storage error: ${error.message}`;
  }
}
$('#save-pref').addEventListener('click', () => operateStorage('save'));
$('#read-pref').addEventListener('click', () => operateStorage('read'));
$('#remove-pref').addEventListener('click', () => operateStorage('remove'));

const eventLog = $('#event-log');
function logEvent(message) {
  const item = document.createElement('li');
  item.textContent = message;
  eventLog.append(item);
}
for (const name of ['outer', 'middle', 'inner']) {
  const element = $(`#${name}`);
  element.addEventListener('click', () => logEvent(`${name}: capture`), true);
  element.addEventListener('click', (event) => {
    logEvent(`${name}: bubble listener (phase ${event.eventPhase})`);
    if (name === 'inner' && $('#stop-propagation').checked) event.stopPropagation();
  });
}
$('#clear-events').addEventListener('click', () => eventLog.replaceChildren());

const corsOutput = $('#cors-output');
async function testCors(path, options) {
  corsOutput.textContent = 'Sending request...';
  try {
    const response = await fetch(`http://localhost:5505${path}`, options);
    const body = await response.json();
    corsOutput.textContent = `HTTP ${response.status}\n${JSON.stringify(body, null, 2)}`;
  } catch (error) {
    corsOutput.textContent = `Request blocked or server unavailable: ${error.message}\nOpen DevTools Console + Network to distinguish CORS from connectivity errors.`;
  }
}
$('#cors-denied').addEventListener('click', () => testCors('/denied'));
$('#cors-allowed').addEventListener('click', () => testCors('/allowed'));
$('#cors-preflight').addEventListener('click', () =>
  testCors('/preflight', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Lab-Request': 'demo' },
    body: JSON.stringify({ lesson: 46 }),
  }),
);
