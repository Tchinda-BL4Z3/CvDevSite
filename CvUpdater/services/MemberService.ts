import { Member } from '../models/Member.js';
import { DatabaseService } from './DatabaseService.js';

export class MemberService {
  constructor(private db: DatabaseService) {}

  async getAll(): Promise<{ member: Member; photoUrl?: string }[]> {
    const members = await this.db.getAllMembers();
    const result: { member: Member; photoUrl?: string }[] = [];

    for (const member of members) {
      let photoUrl: string | undefined;
      if (member.photo_path) {
        const blob = await this.db.getMedia(parseInt(member.photo_path));
        if (blob) photoUrl = URL.createObjectURL(blob);
      }
      result.push({ member, photoUrl });
    }

    return result;
  }

  async getById(id: number): Promise<Member | undefined> {
    return this.db.getMember(id);
  }

  async getWithMedia(id: number): Promise<{ member: Member; photoUrl?: string; videoUrl?: string } | undefined> {
    const member = await this.db.getMember(id);
    if (!member) return undefined;

    let photoUrl: string | undefined;
    let videoUrl: string | undefined;

    if (member.photo_path) {
      const blob = await this.db.getMedia(parseInt(member.photo_path));
      if (blob) photoUrl = URL.createObjectURL(blob);
    }

    if (member.video_path) {
      const blob = await this.db.getMedia(parseInt(member.video_path));
      if (blob) videoUrl = URL.createObjectURL(blob);
    }

    return { member, photoUrl, videoUrl };
  }

  async update(member: Member): Promise<void> {
    member.updated_at = new Date().toISOString();
    return this.db.updateMember(member);
  }

  async create(member: Omit<Member, 'id'>): Promise<number> {
    return this.db.createMember(member);
  }

  async delete(id: number): Promise<void> {
    return this.db.deleteMember(id);
  }
}
