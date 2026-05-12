import { Member } from '../models/Member.js';
import { createBioVideoSection } from './BioVideoSection.js';

function createCvViewer(
  data: { member: Member; photoUrl?: string; videoUrl?: string },
  onBack: () => void,
  onEdit: () => void
): HTMLElement {
  const container = document.createElement('div');
  container.className = 'cv-viewer';

  const backBtn = document.createElement('button');
  backBtn.className = 'back-btn';
  backBtn.textContent = '← Retour à la liste';
  backBtn.addEventListener('click', onBack);

  const editBtn = document.createElement('button');
  editBtn.className = 'back-btn';
  editBtn.textContent = '✎ Modifier';
  editBtn.style.marginLeft = '1rem';
  editBtn.addEventListener('click', onEdit);

  const headerRow = document.createElement('div');
  headerRow.appendChild(backBtn);
  headerRow.appendChild(editBtn);
  container.appendChild(headerRow);

  const bioSection = createBioVideoSection(data.member, data.videoUrl);
  container.appendChild(bioSection);

  return container;
}

export { createCvViewer };
