const TABS = ['tab-videos', 'tab-docs', 'tab-notes', 'tab-info', 'tab-live'];

export function showTab(tabId) {
  TABS.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  const active = document.getElementById(tabId);
  if (active) active.style.display = 'block';
}

export function initUI() {
  window.showTab = showTab;
}
