import { createSidebar } from './Sidebar.js';
function createCvPage(allMembers, activeData, onNavigate, onBack, onEdit) {
    const { member, photoUrl, videoUrl, audioUrl } = activeData;
    const page = document.createElement('div');
    page.className = 'cv-page';
    const sidebar = createSidebar(allMembers, member.id, onNavigate);
    // ── Top Bar (dans la sidebar) ──
    const topBar = document.createElement('div');
    topBar.className = 'cv-topbar';
    topBar.innerHTML = `
    <button class="topbar-btn">← Retour</button>
    <button class="topbar-btn topbar-btn-primary">✎ Modifier le CV</button>
  `;
    topBar.querySelector('button:first-child').addEventListener('click', onBack);
    topBar.querySelector('button:last-child').addEventListener('click', onEdit);
    sidebar.insertBefore(topBar, sidebar.firstChild);
    const main = document.createElement('main');
    main.className = 'cv-page-main';
    const sheet = document.createElement('div');
    sheet.className = 'cv-sheet';
    // ── Personal Header ──
    const header = document.createElement('div');
    header.className = 'cv-personal-header';
    header.innerHTML = `
    <div class="cv-photo-large">
      ${photoUrl ? `<img src="${photoUrl}" alt="${member.nom}">` : `<div class="cv-avatar-initials">${member.nom.split(' ').map(n => n[0]).join('')}</div>`}
    </div>
    <div class="cv-personal-info">
      <h1>${member.nom}</h1>
      <span class="cv-role-text">${member.role}</span>
      <div class="cv-specialites">${(member.specialites ?? []).map(s => `<span class="cv-spec-tag">${s}</span>`).join('')}</div>
      <div class="cv-personal-contacts">
        ${member.email ? `<span>✉ ${member.email}</span>` : ''}
        ${member.telephone ? `<span>📞 ${member.telephone}</span>` : ''}
        ${member.linkedin ? `<span><a href="${member.linkedin}" target="_blank">in LinkedIn</a></span>` : ''}
        ${member.github ? `<span><a href="${member.github}" target="_blank">⌨ GitHub</a></span>` : ''}
      </div>
    </div>
  `;
    sheet.appendChild(header);
    // ── Bio + Video (tabs) ──
    {
        const bioSection = document.createElement('div');
        bioSection.className = 'cv-section';
        const title = document.createElement('h2');
        title.className = 'cv-section-title';
        title.textContent = '📋 Bio & Présentation';
        bioSection.appendChild(title);
        const tabs = document.createElement('div');
        tabs.className = 'cv-bio-tabs';
        const tabBio = document.createElement('button');
        tabBio.className = 'cv-bio-tab active';
        tabBio.textContent = '📝 Parcours : Bio';
        const tabVideo = document.createElement('button');
        tabVideo.className = 'cv-bio-tab';
        tabVideo.textContent = '🎬 Présentation : Vidéo';
        tabs.appendChild(tabBio);
        tabs.appendChild(tabVideo);
        bioSection.appendChild(tabs);
        const content = document.createElement('div');
        content.className = 'cv-bio-content';
        const bioPanel = document.createElement('div');
        bioPanel.className = 'cv-bio-panel active';
        if (member.bio) {
            const bioP = document.createElement('p');
            bioP.className = 'cv-bio-text';
            bioP.textContent = member.bio;
            bioPanel.appendChild(bioP);
        }
        else {
            bioPanel.innerHTML = '<p class="cv-bio-text cv-bio-empty">Aucune biographie renseignée.</p>';
        }
        content.appendChild(bioPanel);
        const videoPanel = document.createElement('div');
        videoPanel.className = 'cv-bio-panel';
        if (videoUrl) {
            videoPanel.innerHTML = `
        <div class="cv-video-wrapper">
          <video src="${videoUrl}" controls></video>
        </div>`;
        }
        else {
            videoPanel.innerHTML = `
        <div class="cv-video-wrapper cv-video-empty">
          <div class="cv-video-placeholder">
            <span class="cv-video-placeholder-icon">🎬</span>
            <span class="cv-video-placeholder-text">Aucune vidéo de présentation</span>
            <span class="cv-video-placeholder-sub">Ajoutez une vidéo pour apparaître ici</span>
          </div>
        </div>`;
        }
        content.appendChild(videoPanel);
        bioSection.appendChild(content);
        tabBio.addEventListener('click', () => {
            tabBio.classList.add('active');
            tabVideo.classList.remove('active');
            bioPanel.classList.add('active');
            videoPanel.classList.remove('active');
        });
        tabVideo.addEventListener('click', () => {
            tabVideo.classList.add('active');
            tabBio.classList.remove('active');
            videoPanel.classList.add('active');
            bioPanel.classList.remove('active');
        });
        sheet.appendChild(bioSection);
    }
    // ── Audio ──
    {
        const audioSection = document.createElement('div');
        audioSection.className = 'cv-section';
        const title = document.createElement('h2');
        title.className = 'cv-section-title';
        title.textContent = '🎵 Présentation Audio';
        audioSection.appendChild(title);
        if (audioUrl) {
            const audioW = document.createElement('div');
            audioW.className = 'cv-audio-wrapper';
            audioW.innerHTML = `<audio src="${audioUrl}" controls></audio>`;
            audioSection.appendChild(audioW);
        }
        else {
            const placeholder = document.createElement('div');
            placeholder.className = 'cv-audio-placeholder';
            placeholder.innerHTML = `
        <span class="cv-audio-placeholder-icon">🎵</span>
        <span class="cv-audio-placeholder-text">Aucun fichier audio</span>
        <span class="cv-audio-placeholder-sub">Ajoutez un audio pour apparaître ici</span>
      `;
            audioSection.appendChild(placeholder);
        }
        sheet.appendChild(audioSection);
    }
    // ── Parcours Académique ──
    if (member.parcours_academique && member.parcours_academique.length > 0) {
        const acad = document.createElement('div');
        acad.className = 'cv-section';
        acad.innerHTML = `<h2 class="cv-section-title">🎓 Parcours Académique</h2>`;
        const timeline = document.createElement('div');
        timeline.className = 'cv-timeline';
        for (const item of member.parcours_academique) {
            const entry = document.createElement('div');
            entry.className = 'cv-timeline-item';
            entry.innerHTML = `
        <span class="tl-year">${item.annee}</span>
        <span class="tl-dot"></span>
        <span class="tl-text">${item.titre}</span>
      `;
            timeline.appendChild(entry);
        }
        acad.appendChild(timeline);
        sheet.appendChild(acad);
    }
    // ── Parcours Professionnel ──
    if (member.parcours_professionnel && member.parcours_professionnel.length > 0) {
        const pro = document.createElement('div');
        pro.className = 'cv-section';
        pro.innerHTML = `<h2 class="cv-section-title">💼 Parcours Professionnel</h2>`;
        const timeline = document.createElement('div');
        timeline.className = 'cv-timeline';
        for (const item of member.parcours_professionnel) {
            const entry = document.createElement('div');
            entry.className = 'cv-timeline-item';
            entry.innerHTML = `
        <span class="tl-year">${item.annee}</span>
        <span class="tl-dot"></span>
        <span class="tl-text">${item.titre}</span>
      `;
            timeline.appendChild(entry);
        }
        pro.appendChild(timeline);
        sheet.appendChild(pro);
    }
    // ── Compétences ──
    if (member.competences && member.competences.length > 0) {
        const skills = document.createElement('div');
        skills.className = 'cv-section';
        skills.innerHTML = `<h2 class="cv-section-title">🛠 Compétences</h2>`;
        const grid = document.createElement('div');
        grid.className = 'cv-skills-grid';
        for (const skill of member.competences) {
            const tag = document.createElement('span');
            tag.className = 'cv-skill-tag';
            tag.textContent = skill;
            grid.appendChild(tag);
        }
        skills.appendChild(grid);
        sheet.appendChild(skills);
    }
    // ── Langues ──
    if (member.langues && member.langues.length > 0) {
        const langSection = document.createElement('div');
        langSection.className = 'cv-section';
        langSection.innerHTML = `<h2 class="cv-section-title">🌍 Langues</h2>`;
        const langGrid = document.createElement('div');
        langGrid.className = 'cv-lang-grid';
        for (const lang of member.langues) {
            const tag = document.createElement('span');
            tag.className = 'cv-lang-tag';
            tag.textContent = lang;
            langGrid.appendChild(tag);
        }
        langSection.appendChild(langGrid);
        sheet.appendChild(langSection);
    }
    // ── Projets ──
    if (member.projets && member.projets.length > 0) {
        const proj = document.createElement('div');
        proj.className = 'cv-section';
        proj.innerHTML = `<h2 class="cv-section-title">📁 Projets Réalisés</h2>`;
        const projGrid = document.createElement('div');
        projGrid.className = 'cv-projects-grid';
        for (const p of member.projets) {
            const card = document.createElement('div');
            card.className = 'cv-project-card';
            card.innerHTML = `
        ${p.photo_path ? `<div class="cv-project-img"><img src="${p.photo_path}" alt="${p.nom}"></div>` : ''}
        <div class="cv-project-body">
          <h3>${p.nom}</h3>
          <p>${p.description}</p>
          ${p.technos ? `<div class="cv-project-technos">${p.technos.map(t => `<span>${t}</span>`).join('')}</div>` : ''}
        </div>
      `;
            projGrid.appendChild(card);
        }
        proj.appendChild(projGrid);
        sheet.appendChild(proj);
    }
    // ── Contact ──
    const contact = document.createElement('div');
    contact.className = 'cv-section';
    contact.innerHTML = `<h2 class="cv-section-title">📞 Contact</h2>`;
    const contactGrid = document.createElement('div');
    contactGrid.className = 'cv-contact-grid';
    const contactItems = [
        { icon: '✉', label: 'Email', value: member.email, href: `mailto:${member.email}` },
        { icon: '📞', label: 'Téléphone', value: member.telephone, href: `tel:${member.telephone}` },
        { icon: 'in', label: 'LinkedIn', value: member.linkedin || 'Non renseigné', href: member.linkedin || '' },
        { icon: '⌨', label: 'GitHub', value: member.github || 'Non renseigné', href: member.github || '' },
    ];
    for (const c of contactItems) {
        const card = document.createElement('a');
        card.className = 'cv-contact-card';
        card.href = c.href || '#';
        card.target = '_blank';
        card.innerHTML = `
      <span class="contact-icon">${c.icon}</span>
      <span class="contact-label">${c.label}</span>
      <span class="contact-value">${c.value}</span>
    `;
        contactGrid.appendChild(card);
    }
    contact.appendChild(contactGrid);
    sheet.appendChild(contact);
    main.appendChild(sheet);
    page.appendChild(sidebar);
    page.appendChild(main);
    return page;
}
export { createCvPage };
