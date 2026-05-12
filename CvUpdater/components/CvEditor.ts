import { Member } from '../models/Member.js';

interface CvEditorOptions {
  onSave: (member: Member) => void;
  onCancel: () => void;
}

export class CvEditor {
  private formData: Member;

  constructor(
    private member: Member,
    private options: CvEditorOptions,
  ) {
    this.formData = { ...member };
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'cv-editor';

    const title = document.createElement('h2');
    title.textContent = `Modifier le CV — ${this.member.nom}`;

    const form = document.createElement('form');
    form.innerHTML = `
      <div class="form-group">
        <label for="nom">Nom</label>
        <input type="text" id="nom" value="${this.member.nom}" required>
      </div>
      <div class="form-group">
        <label for="role">Rôle</label>
        <select id="role">
          <option value="Leader" ${this.member.role === 'Leader' ? 'selected' : ''}>Leader</option>
          <option value="Co-lead" ${this.member.role === 'Co-lead' ? 'selected' : ''}>Co-lead</option>
          <option value="Membre" ${this.member.role === 'Membre' ? 'selected' : ''}>Membre</option>
        </select>
      </div>
      <div class="form-group">
        <label for="bio">Bio</label>
        <textarea id="bio" rows="4">${this.member.bio}</textarea>
      </div>
      <div class="form-group">
        <label for="competences">Compétences (séparées par des virgules)</label>
        <input type="text" id="competences" value="${this.member.competences.join(', ')}">
      </div>
      <div class="form-group">
        <label for="photo">Photo</label>
        <input type="file" id="photo" accept="image/*">
      </div>
      <div class="form-group">
        <label for="video">Vidéo de présentation</label>
        <input type="file" id="video" accept="video/*">
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" value="${this.member.email}">
      </div>
      <div class="form-group">
        <label for="telephone">Téléphone</label>
        <input type="tel" id="telephone" value="${this.member.telephone}">
      </div>
      <div class="form-group">
        <label for="linkedin">LinkedIn</label>
        <input type="url" id="linkedin" value="${this.member.linkedin}">
      </div>
      <div class="actions">
        <button type="submit" class="btn-primary">Enregistrer</button>
        <button type="button" class="btn-secondary" id="cancel-btn">Annuler</button>
      </div>
    `;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const updated: Member = {
        ...this.member,
        nom: (form.querySelector('#nom') as HTMLInputElement).value,
        role: (form.querySelector('#role') as HTMLSelectElement).value,
        bio: (form.querySelector('#bio') as HTMLTextAreaElement).value,
        competences: (form.querySelector('#competences') as HTMLInputElement).value.split(',').map(s => s.trim()).filter(Boolean),
        email: (form.querySelector('#email') as HTMLInputElement).value,
        telephone: (form.querySelector('#telephone') as HTMLInputElement).value,
        linkedin: (form.querySelector('#linkedin') as HTMLInputElement).value,
        updated_at: new Date().toISOString(),
      };
      this.options.onSave(updated);
    });

    form.querySelector('#cancel-btn')!.addEventListener('click', this.options.onCancel);

    container.appendChild(title);
    container.appendChild(form);

    return container;
  }
}
