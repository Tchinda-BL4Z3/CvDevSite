import * as DB from '../services/DatabaseService.js';
function createCvEditor(member, onSave, onCancel) {
    const container = document.createElement('div');
    container.className = 'cv-editor';
    const title = document.createElement('h2');
    title.textContent = `Modifier le CV — ${member.nom}`;
    const form = document.createElement('form');
    form.innerHTML = `
    <div class="form-group">
      <label for="nom">Nom</label>
      <input type="text" id="nom" value="${member.nom.replace(/"/g, '&quot;')}" required>
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
      <label for="langues">Langues (séparées par des virgules)</label>
      <input type="text" id="langues" value="${(member.langues ?? []).join(', ')}">
    </div>
    <div class="form-group">
      <label>Photo actuelle</label>
      <div class="editor-media-preview" id="photo-preview">
        ${member.photo_path ? 'Fichier enregistré' : 'Aucune photo'}
      </div>
      <label for="photo">Nouvelle photo</label>
      <input type="file" id="photo" accept="image/*">
    </div>
    <div class="form-group">
      <label>Vidéo actuelle</label>
      <div class="editor-media-preview" id="video-preview">
        ${member.video_path ? 'Fichier enregistré' : 'Aucune vidéo'}
      </div>
      <label for="video">Nouvelle vidéo</label>
      <input type="file" id="video" accept="video/*">
    </div>
    <div class="form-group">
      <label>Audio actuel</label>
      <div class="editor-media-preview" id="audio-preview">
        ${member.audio_path ? 'Fichier enregistré' : 'Aucun audio'}
      </div>
      <label for="audio">Nouvel audio</label>
      <input type="file" id="audio" accept="audio/*">
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
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const updated = {
            ...member,
            nom: form.querySelector('#nom').value,
            role: form.querySelector('#role').value,
            bio: form.querySelector('#bio').value,
            competences: form.querySelector('#competences').value.split(',').map(s => s.trim()).filter(Boolean),
            langues: form.querySelector('#langues').value.split(',').map(s => s.trim()).filter(Boolean),
            email: form.querySelector('#email').value,
            telephone: form.querySelector('#telephone').value,
            linkedin: form.querySelector('#linkedin').value,
            updated_at: new Date().toISOString(),
        };
        const photoInput = form.querySelector('#photo');
        const videoInput = form.querySelector('#video');
        const audioInput = form.querySelector('#audio');
        if (photoInput.files && photoInput.files.length > 0) {
            const mediaId = await DB.saveMedia(photoInput.files[0]);
            updated.photo_path = String(mediaId);
        }
        if (videoInput.files && videoInput.files.length > 0) {
            const mediaId = await DB.saveMedia(videoInput.files[0]);
            updated.video_path = String(mediaId);
        }
        if (audioInput.files && audioInput.files.length > 0) {
            const mediaId = await DB.saveMedia(audioInput.files[0]);
            updated.audio_path = String(mediaId);
        }
        onSave(updated);
    });
    form.querySelector('#cancel-btn').addEventListener('click', onCancel);
    container.appendChild(title);
    container.appendChild(form);
    return container;
}
export { createCvEditor };
