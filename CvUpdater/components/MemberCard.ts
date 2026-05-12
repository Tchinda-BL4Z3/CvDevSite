import { Member } from '../models/Member.js';

function createMemberCard(
  member: Member,
  photoUrl: string | undefined,
  onSelect: (id: number) => void
): HTMLElement {
  const card = document.createElement('div');
  card.className = 'member-card';

  const img = document.createElement('img');
  img.src = photoUrl ?? 'assets/images/default-avatar.png';
  img.alt = member.nom;
  img.loading = 'lazy';

  const body = document.createElement('div');
  body.className = 'member-card-body';
  body.innerHTML = `
    <h3>${member.nom}</h3>
    <p class="role">${member.role}</p>
  `;

  card.appendChild(img);
  card.appendChild(body);
  card.addEventListener('click', () => onSelect(member.id!));

  return card;
}

export { createMemberCard };
