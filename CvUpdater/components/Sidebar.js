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
function getColor(name) {
    return AVATAR_COLORS[hashCode(name) % AVATAR_COLORS.length];
}
function createSidebar(members, activeId, onSelect) {
    const sidebar = document.createElement('aside');
    sidebar.className = 'cv-sidebar';
    const title = document.createElement('div');
    title.className = 'sidebar-title';
    title.innerHTML = '<h3>Membres</h3>';
    sidebar.appendChild(title);
    const list = document.createElement('ul');
    list.className = 'sidebar-list';
    for (const item of members) {
        const isActive = item.member.id === activeId;
        const li = document.createElement('li');
        li.className = `sidebar-item${isActive ? ' active' : ''}`;
        li.tabIndex = 0;
        li.setAttribute('role', 'button');
        const avatar = document.createElement('div');
        avatar.className = 'sidebar-avatar';
        avatar.style.background = getColor(item.member.nom);
        avatar.textContent = getInitials(item.member.nom);
        const displayRole = item.member.specialites?.[0] ?? item.member.role;
        const info = document.createElement('div');
        info.className = 'sidebar-item-info';
        info.innerHTML = `
      <strong>${item.member.nom}</strong>
      <span>${displayRole}</span>
    `;
        li.appendChild(avatar);
        li.appendChild(info);
        li.addEventListener('click', () => onSelect(item.member.id));
        li.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect(item.member.id);
            }
        });
        list.appendChild(li);
    }
    sidebar.appendChild(list);
    return sidebar;
}
export { createSidebar };
