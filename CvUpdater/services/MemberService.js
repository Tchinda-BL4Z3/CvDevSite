import * as DB from './DatabaseService.js';
function getAll() {
    return DB.getAllMembers().then((members) => {
        return Promise.all(members.map(async (member) => {
            let photoUrl;
            if (member.photo_path) {
                const blob = await DB.getMedia(parseInt(member.photo_path));
                if (blob)
                    photoUrl = URL.createObjectURL(blob);
            }
            return { member, photoUrl };
        }));
    });
}
function getById(id) {
    return DB.getMember(id);
}
function getWithMedia(id) {
    return DB.getMember(id).then(async (member) => {
        if (!member)
            return undefined;
        let photoUrl;
        let videoUrl;
        let audioUrl;
        if (member.photo_path) {
            const blob = await DB.getMedia(parseInt(member.photo_path));
            if (blob)
                photoUrl = URL.createObjectURL(blob);
        }
        if (member.video_path) {
            const blob = await DB.getMedia(parseInt(member.video_path));
            if (blob)
                videoUrl = URL.createObjectURL(blob);
        }
        if (member.audio_path) {
            const blob = await DB.getMedia(parseInt(member.audio_path));
            if (blob)
                audioUrl = URL.createObjectURL(blob);
        }
        return { member, photoUrl, videoUrl, audioUrl };
    });
}
function update(member) {
    member.updated_at = new Date().toISOString();
    return DB.updateMember(member);
}
function create(member) {
    return DB.createMember(member);
}
function remove(id) {
    return DB.deleteMember(id);
}
export { getAll, getById, getWithMedia, update, create, remove };
