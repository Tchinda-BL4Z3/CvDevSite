export interface Member {
  id?: number;
  nom: string;
  role: string;
  bio: string;
  competences: string[];
  photo_path: string;
  video_path: string;
  audio_path: string;
  email: string;
  telephone: string;
  linkedin: string;
  created_at: string;
  updated_at: string;
}

export interface MediaEntry {
  id?: number;
  name: string;
  type: string;
  size: number;
  data: Blob;
  uploaded_at: string;
}
