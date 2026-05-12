const AVATAR_COLORS = [
    '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b',
    '#10b981', '#06b6d4', '#f97316', '#6366f1',
];
function getInitials(name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1)
        return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}
function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}
function getAvatarColor(name) {
    const index = hashCode(name) % AVATAR_COLORS.length;
    return AVATAR_COLORS[index];
}
function createAvatarPlaceholder(name) {
    const el = document.createElement('div');
    el.className = 'avatar-placeholder';
    el.style.background = getAvatarColor(name);
    el.textContent = getInitials(name);
    return el;
}
function createMemberCard(member, photoUrl, onSelect) {
    const card = document.createElement('div');
    card.className = 'member-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Voir le CV de ${member.nom}`);
    const maxSkills = 4;
    const visibleSkills = member.competences.slice(0, maxSkills);
    const extraCount = member.competences.length - maxSkills;
    const imgWrap = document.createElement('div');
    imgWrap.className = 'member-card-img-wrap';
    if (photoUrl) {
        const img = document.createElement('img');
        img.src = photoUrl;
        img.alt = member.nom;
        img.loading = 'lazy';
        imgWrap.appendChild(img);
    }
    else {
        const placeholder = createAvatarPlaceholder(member.nom);
        imgWrap.appendChild(placeholder);
    }
    const roleBadge = document.createElement('div');
    roleBadge.className = 'member-card-role';
    roleBadge.textContent = member.role;
    imgWrap.appendChild(roleBadge);
    const body = document.createElement('div');
    body.className = 'member-card-body';
    const contacts = document.createElement('div');
    contacts.className = 'member-card-contacts';
    if (member.email) {
        const emailSpan = document.createElement('span');
        emailSpan.textContent = `✉ ${member.email}`;
        contacts.appendChild(emailSpan);
    }
    const skills = document.createElement('div');
    skills.className = 'member-card-skills';
    for (const skill of visibleSkills) {
        const tag = document.createElement('span');
        tag.className = 'skill-tag';
        tag.textContent = skill;
        skills.appendChild(tag);
    }
    if (extraCount > 0) {
        const more = document.createElement('span');
        more.className = 'skill-tag more';
        more.textContent = `+${extraCount}`;
        skills.appendChild(more);
    }
    const btn = document.createElement('button');
    btn.className = 'card-btn';
    btn.textContent = 'Voir le CV →';
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        onSelect(member.id);
    });
    const proRole = member.specialites?.[0] ?? member.role;
    body.innerHTML = `<h3>${member.nom}</h3><p class="member-card-role-text">${proRole}</p>`;
    body.appendChild(contacts);
    body.appendChild(skills);
    body.appendChild(btn);
    card.appendChild(imgWrap);
    card.appendChild(body);
    card.addEventListener('click', () => onSelect(member.id));
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(member.id);
        }
    });
    return card;
}
export { createMemberCard };
