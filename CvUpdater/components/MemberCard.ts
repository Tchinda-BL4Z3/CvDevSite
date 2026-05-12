import { Member } from '../models/Member.js';

export class MemberCard {
  constructor(
    private member: Member,
    private photoUrl: string | undefined,
    private onSelect: (id: number) => void,
  ) {}

  render(): HTMLElement {
    const card = document.createElement('div');
    card.className = 'member-card';

    const img = document.createElement('img');
    img.src = this.photoUrl ?? 'assets/images/default-avatar.png';
    img.alt = this.member.nom;
    img.loading = 'lazy';

    const body = document.createElement('div');
    body.className = 'member-card-body';
    body.innerHTML = `
      <h3>${this.member.nom}</h3>
      <p class="role">${this.member.role}</p>
    `;

    card.appendChild(img);
    card.appendChild(body);
    card.addEventListener('click', () => this.onSelect(this.member.id!));

    return card;
  }
}
