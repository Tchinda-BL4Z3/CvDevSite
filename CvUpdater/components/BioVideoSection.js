function createBioVideoSection(member, videoUrl) {
    const section = document.createElement('div');
    section.className = 'bio-video-section';
    const info = document.createElement('div');
    info.className = 'cv-info';
    const roles = member.role.split(',').map(r => r.trim()).filter(Boolean);
    info.innerHTML = `
    <h2>${member.nom}</h2>
    <div class="cv-roles">${roles.map(r => `<span class="role-tag">${r}</span>`).join('')}</div>
    <div class="cv-bio">${member.bio}</div>
    <h3>Compétences</h3>
    <ul>${member.competences.map(c => `<li>${c}</li>`).join('')}</ul>
    <h3>Contact</h3>
    <p>Email : ${member.email}</p>
    <p>Tél : ${member.telephone}</p>
    ${member.linkedin ? `<p><a href="${member.linkedin}" target="_blank">LinkedIn</a></p>` : ''}
  `;
    const videoWrapper = document.createElement('div');
    videoWrapper.className = 'video-wrapper';
    if (videoUrl) {
        const video = document.createElement('video');
        video.src = videoUrl;
        video.controls = true;
        videoWrapper.appendChild(video);
    }
    section.appendChild(info);
    section.appendChild(videoWrapper);
    return section;
}
export { createBioVideoSection };
