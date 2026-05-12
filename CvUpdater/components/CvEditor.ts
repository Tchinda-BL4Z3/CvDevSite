import { Member } from '../models/Member.js';

function createCvEditor(
  member: Member,
  onSave: (member: Member) => void,
  onCancel: () => void
): HTMLElement {
  const container = document.createElement('div');
  container.className = 'cv-editor';

  const title = document.createElement('h2');
  title.textContent = `Modifier le CV — ${member.nom}`;

  const form = document.createElement('form');
  form.innerHTML = `
    <div class="form-group">
      <label for="nom">Nom</label>
      <input type="text" id="nom" value="${member.nom}" required>
    </div>
    <div class="form-group">
      <label for="role">Rôle</label>
      <select id="role">
        <option value="Leader" ${member.role === 'Leader' ? 'selected' : ''}>Leader</option>
        <option value="Co-lead" ${member.role === 'Co-lead' ? 'selected' : ''}>Co-lead</option>
        <option value="Membre" ${member.role === 'Membre' ? 'selected' : ''}>Membre</option>
      </select>
    </div>
    <div class="form-group">
      <label for="bio">Bio</label>
      <textarea id="bio" rows="4">${member.bio}</textarea>
    </div>
    <div class="form-group">
      <label for="competences">Compétences (séparées par des virgules)</label>
      <input type="text" id="competences" value="${member.competences.join(', ')}">
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
      <input type="email" id="email" value="${member.email}">
    </div>
    <div class="form-group">
      <label for="telephone">Téléphone</label>
      <input type="tel" id="telephone" value="${member.telephone}">
    </div>
    <div class="form-group">
      <label for="linkedin">LinkedIn</label>
      <input type="url" id="linkedin" value="${member.linkedin}">
    </div>
    <div class="actions">
      <button type="submit" class="btn-primary">Enregistrer</button>
      <button type="button" class="btn-secondary" id="cancel-btn">Annuler</button>
    </div>
  `;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const updated: Member = {
      ...member,
      nom: (form.querySelector('#nom') as HTMLInputElement).value,
      role: (form.querySelector('#role') as HTMLSelectElement).value,
      bio: (form.querySelector('#bio') as HTMLTextAreaElement).value,
      competences: (form.querySelector('#competences') as HTMLInputElement).value.split(',').map(s => s.trim()).filter(Boolean),
      email: (form.querySelector('#email') as HTMLInputElement).value,
      telephone: (form.querySelector('#telephone') as HTMLInputElement).value,
      linkedin: (form.querySelector('#linkedin') as HTMLInputElement).value,
      updated_at: new Date().toISOString(),
    };
    onSave(updated);
  });

  form.querySelector('#cancel-btn')!.addEventListener('click', onCancel);

  container.appendChild(title);
  container.appendChild(form);

  return container;
}

export { createCvEditor };
