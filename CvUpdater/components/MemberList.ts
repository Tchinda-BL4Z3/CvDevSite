import { Member } from '../models/Member.js';
import { MemberCard } from './MemberCard.js';

interface MemberListOptions {
  onSelect: (id: number) => void;
}

export class MemberList {
  constructor(
    private members: { member: Member; photoUrl?: string }[],
    private options: MemberListOptions,
  ) {}

  render(): HTMLElement {
    const grid = document.createElement('div');
    grid.className = 'member-grid';

    for (const item of this.members) {
      const card = new MemberCard(item.member, item.photoUrl, this.options.onSelect);
      grid.appendChild(card.render());
    }

    return grid;
  }
}
