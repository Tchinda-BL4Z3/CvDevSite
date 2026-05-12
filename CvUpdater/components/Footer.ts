function createFooter(): HTMLElement {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <strong>CvUpdater</strong> — Groupe 9x · ICT202 Développement Mobile
    <br>
    <span>✦</span> Propulsé par TypeScript pur · IndexedDB · HTML/CSS <span>✦</span>
  `;
  return footer;
}

export { createFooter };
