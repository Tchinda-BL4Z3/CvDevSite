import { Member } from '../models/Member.js';

interface BioVideoSectionOptions {
  videoUrl?: string;
}

export class BioVideoSection {
  constructor(
    private member: Member,
    private options: BioVideoSectionOptions,
  ) {}

  render(): HTMLElement {
    const section = document.createElement('div');
    section.className = 'bio-video-section';

    const info = document.createElement('div');
    info.className = 'cv-info';
    info.innerHTML = `
      <h2>${this.member.nom}</h2>
      <p class="role">${this.member.role}</p>
      <p>${this.member.bio}</p>
      <h3>Compétences</h3>
      <ul>${this.member.competences.map(c => `<li>${c}</li>`).join('')}</ul>
      <h3>Contact</h3>
      <p>Email : ${this.member.email}</p>
      <p>Tél : ${this.member.telephone}</p>
      ${this.member.linkedin ? `<p><a href="${this.member.linkedin}" target="_blank">LinkedIn</a></p>` : ''}
    `;

    const videoWrapper = document.createElement('div');
    videoWrapper.className = 'video-wrapper';
    if (this.options.videoUrl) {
      const video = document.createElement('video');
      video.src = this.options.videoUrl;
      video.controls = true;
      videoWrapper.appendChild(video);
    }

    section.appendChild(info);
    section.appendChild(videoWrapper);

    return section;
  }
}
