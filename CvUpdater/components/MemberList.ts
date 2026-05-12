import { Member } from '../models/Member.js';
import { createMemberCard } from './MemberCard.js';

function createMemberList(
  members: { member: Member; photoUrl?: string }[],
  onSelect: (id: number) => void
): HTMLElement {
  const grid = document.createElement('div');
  grid.className = 'member-grid';

  for (const item of members) {
    const card = createMemberCard(item.member, item.photoUrl, onSelect);
    grid.appendChild(card);
  }

  return grid;
}

export { createMemberList };
