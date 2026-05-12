# CvUpdater — CV Responsive de Groupe (TypeScript)

> **Groupe 9x** — ICT202 Développement Mobile  
> Membres : KENGNE, Benzo-Emmanuelle, [me], Emma-JK, Ulrich, Many, Ariane, Juvenal

---

## 1. Présentation du Projet

Application web responsive permettant d'afficher, modifier et stocker les CVs de tous les membres du groupe.  
**Stack** : TypeScript pur (zero framework), HTML5, CSS3, IndexedDB

---

## 2. Architecture & Arborescence

```
CvUpdater/
├── index.html                 # Entry point
├── style.css                  # Styles globaux responsive
├── app.ts                     # Point d'entrée TypeScript
├── tsconfig.json              # Configuration TypeScript
│
├── components/
│   ├── Header.ts              # Barre de navigation / titre
│   ├── MemberList.ts          # Liste des membres (grille responsive)
│   ├── MemberCard.ts          # Carte individuelles d'un membre
│   ├── CvViewer.ts            # Affichage détaillé du CV
│   ├── CvEditor.ts            # Formulaire de modification de CV
│   └── BioVideoSection.ts     # Section Bio + Video alignée
│
├── models/
│   └── Member.ts              # Interface Member (id, nom, bio, compétences, etc.)
│
├── services/
│   ├── DatabaseService.ts     # Gestion IndexedDB (CvUpdaterDB) — CRUD
│   └── MemberService.ts       # Logique métier des membres
│
├── utils/
│   ├── Validator.ts           # Validation des champs formulaire
│   └── FileHandler.ts         # Gestion upload images/videos/audio
│
├── assets/
│   ├── images/                # Photos des membres
│   ├── videos/                # Vidéos de présentation (Bio-Video)
│   └── audio/                 # Fichiers audio optionnels
│
└── (persistance via IndexedDB dans le navigateur)
```

---

## 3. Modèle de Données (IndexedDB)

### Object Store `members`

| Champ | Type | Description |
|---|---|---|
| `id` | `number` (autoIncrement) | Clé primaire |
| `nom` | `string` | — |
| `role` | `string` | Leader, Co-lead, Membre |
| `bio` | `string` | — |
| `competences` | `string[]` | Tableau JSON ["HTML","CSS","React",...] |
| `photo_path` | `string` | ID du média stocké dans le store `media` |
| `video_path` | `string` | ID du média stocké dans le store `media` |
| `audio_path` | `string` | ID du média stocké dans le store `media` |
| `email` | `string` | Index `unique` |
| `telephone` | `string` | — |
| `linkedin` | `string` | — |
| `created_at` | `string` (ISO) | `new Date().toISOString()` |
| `updated_at` | `string` (ISO) | Mis à jour automatiquement |

### Object Store `media` (fichiers binaires)

| Champ | Type | Description |
|---|---|---|
| `id` | `number` (autoIncrement) | Clé primaire |
| `name` | `string` | Nom du fichier |
| `type` | `string` | MIME type (image/*, video/*, audio/*) |
| `size` | `number` | Taille en octets |
| `data` | `Blob` | Contenu binaire du fichier |
| `uploaded_at` | `string` (ISO) | Date d'upload |

### Indexes sur `members`

| Nom | Champ | Unique |
|---|---|---|
| `nom` | `nom` | Non |
| `role` | `role` | Non |
| `email` | `email` | Oui |

---

## 4. Fonctionnalités Détail

### 4.1 Affichage des CVs
- **Grille responsive** : cartes membres avec photo, nom, rôle
- **Vue détaillée** : clique sur une carte → affichage complet du CV
- **Section Bio-Video** : vidéo de présentation alignée avec les infos du CV (texte à côté, design propre)

### 4.2 Navigation Bio-Video
- Chaque CV contient une vidéo de présentation
- La vidéo est alignée horizontalement avec les informations textuelles du CV
- Layout : `[Info CV (gauche)] [Vidéo (droite)]` sur desktop, empilé sur mobile

### 4.3 Modification de CV
- Bouton "Modifier" sur chaque CV
- Formulaire pré-rempli avec les données existantes
- Champs : nom, rôle, bio, compétences (tags), photo, vidéo, audio, contacts
- Validation des champs avant soumission

### 4.4 Stockage (IndexedDB)
- Base NoSQL côté navigateur asynchrone
- Opérations CRUD complètes via transactions
- Persistance locale garantie (stockée sur disque par le navigateur)
- Store `media` dédié aux fichiers binaires (photos, vidéos, audio)
- API promesses pour une intégration fluide avec TypeScript

### 4.5 Responsive Design
- Breakpoints : mobile (< 768px), tablette (768-1024px), desktop (> 1024px)
- Navigation adaptative
- Images/vidéos redimensionnées

---

## 5. Technologies

| Technologie | Usage |
|---|---|
| TypeScript | Langage principal, typage strict |
| HTML5 | Structure sémantique |
| CSS3 (Flexbox + Grid) | Layout responsive |
| IndexedDB | Base de données NoSQL locale persistante |

---

## 6. Interfaces Utilisateur (Pages)

1. **Accueil** : Liste des membres en grille
2. **Détail CV** : Vue complète d'un membre avec Bio-Video
3. **Éditeur** : Formulaire de modification du CV

---

## 7. Contraintes Techniques

- Aucun framework CSS ou JS (TypeScript pur uniquement)
- L'alignement de la vidéo avec les infos du CV doit être pixel-perfect
- Données persistées via IndexedDB (navigateur)
- 100% responsive (mobile-first)

---

## 8. Planning de Développement

| Phase | Tâche |
|---|---|
| 1 | Initialisation projet + tsconfig.json + structure HTML |
| 2 | Modèle Member + DatabaseService (CRUD IndexedDB) |
| 3 | Composant MemberList + MemberCard (grille responsive) |
| 4 | CvViewer + BioVideoSection (alignement vidéo/infos) |
| 5 | CvEditor avec validation |
| 6 | Upload fichiers (images, vidéos, audio) |
| 7 | Responsive final + tests |
