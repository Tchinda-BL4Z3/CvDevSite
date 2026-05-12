import { Member } from '../models/Member.js';
import * as DB from './DatabaseService.js';

function getAll(): Promise<{ member: Member; photoUrl?: string }[]> {
  return DB.getAllMembers().then((members) => {
    return Promise.all(
      members.map(async (member) => {
        let photoUrl: string | undefined;
        if (member.photo_path) {
          const blob = await DB.getMedia(parseInt(member.photo_path));
          if (blob) photoUrl = URL.createObjectURL(blob);
        }
        return { member, photoUrl };
      })
    );
  });
}

function getById(id: number): Promise<Member | undefined> {
  return DB.getMember(id);
}

function getWithMedia(
  id: number
): Promise<{ member: Member; photoUrl?: string; videoUrl?: string } | undefined> {
  return DB.getMember(id).then(async (member) => {
    if (!member) return undefined;

    let photoUrl: string | undefined;
    let videoUrl: string | undefined;

    if (member.photo_path) {
      const blob = await DB.getMedia(parseInt(member.photo_path));
      if (blob) photoUrl = URL.createObjectURL(blob);
    }

    if (member.video_path) {
      const blob = await DB.getMedia(parseInt(member.video_path));
      if (blob) videoUrl = URL.createObjectURL(blob);
    }

    return { member, photoUrl, videoUrl };
  });
}

function update(member: Member): Promise<void> {
  member.updated_at = new Date().toISOString();
  return DB.updateMember(member);
}

function create(member: Omit<Member, 'id'>): Promise<number> {
  return DB.createMember(member);
}

function remove(id: number): Promise<void> {
  return DB.deleteMember(id);
}

export { getAll, getById, getWithMedia, update, create, remove };
