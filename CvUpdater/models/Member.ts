export interface ParcoursItem {
  annee: string;
  titre: string;
}

export interface ProjetItem {
  nom: string;
  description: string;
  photo_path?: string;
  technos?: string[];
}

export interface Member {
  id?: number;
  nom: string;
  role: string;
  bio: string;
  competences: string[];
  specialites: string[];
  langues: string[];
  photo_path: string;
  video_path: string;
  audio_path: string;
  email: string;
  telephone: string;
  linkedin: string;
  github: string;
  parcours_academique: ParcoursItem[];
  parcours_professionnel: ParcoursItem[];
  projets: ProjetItem[];
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
