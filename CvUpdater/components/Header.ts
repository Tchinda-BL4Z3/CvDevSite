function createHeader(): HTMLElement {
  const header = document.createElement('header');
  header.className = 'header';
  header.innerHTML = `
    <h1>CvUpdater</h1>
    <p>CV interactif du Groupe 9x — ICT202</p>
  `;
  return header;
}

export { createHeader };
