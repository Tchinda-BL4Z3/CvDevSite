import { Member } from '../models/Member.js';
import { BioVideoSection } from './BioVideoSection.js';

interface CvViewerOptions {
  onBack: () => void;
  onEdit: () => void;
}

export class CvViewer {
  constructor(
    private data: { member: Member; photoUrl?: string; videoUrl?: string },
    private options: CvViewerOptions,
  ) {}

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'cv-viewer';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← Retour à la liste';
    backBtn.addEventListener('click', this.options.onBack);

    const editBtn = document.createElement('button');
    editBtn.className = 'back-btn';
    editBtn.textContent = '✎ Modifier';
    editBtn.style.marginLeft = '1rem';
    editBtn.addEventListener('click', this.options.onEdit);

    const headerRow = document.createElement('div');
    headerRow.appendChild(backBtn);
    headerRow.appendChild(editBtn);
    container.appendChild(headerRow);

    const bioSection = new BioVideoSection(this.data.member, {
      videoUrl: this.data.videoUrl,
    });
    container.appendChild(bioSection.render());

    return container;
  }
}
