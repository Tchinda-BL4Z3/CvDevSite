import { createMemberCard } from './MemberCard.js';
function createMemberList(members, onSelect) {
    const container = document.createElement('div');
    const sectionHeader = document.createElement('div');
    sectionHeader.className = 'section-header';
    sectionHeader.innerHTML = `
    <h2>Membres <span>· ${members.length} personne${members.length > 1 ? 's' : ''}</span></h2>
    <span class="count">${members.length} membre${members.length > 1 ? 's' : ''}</span>
  `;
    container.appendChild(sectionHeader);
    if (members.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'empty-state';
        empty.innerHTML = '<p>Aucun membre pour le moment.</p>';
        container.appendChild(empty);
        return container;
    }
    const grid = document.createElement('div');
    grid.className = 'member-grid';
    for (const item of members) {
        const card = createMemberCard(item.member, item.photoUrl, onSelect);
        grid.appendChild(card);
    }
    container.appendChild(grid);
    return container;
}
export { createMemberList };
