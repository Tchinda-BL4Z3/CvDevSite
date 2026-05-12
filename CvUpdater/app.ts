import { Member } from './models/Member.js';
import * as DB from './services/DatabaseService.js';
import * as MemberService from './services/MemberService.js';
import { createHeader } from './components/Header.js';
import { createMemberList } from './components/MemberList.js';
import { createCvPage } from './components/CvPage.js';
import { createCvEditor } from './components/CvEditor.js';
import { createFooter } from './components/Footer.js';

type View = 'list' | 'detail' | 'edit';

const heroRoot = document.getElementById('hero-root')!;
const appRoot = document.getElementById('app')!;
const footerRoot = document.getElementById('footer-root')!;
let currentView: View = 'list';
let currentMemberId: number | null = null;

let cachedMembers: { member: Member; photoUrl?: string }[] = [];

function render(): void {
  heroRoot.innerHTML = '';
  appRoot.innerHTML = '';
  footerRoot.innerHTML = '';

  const member = currentMemberId
    ? cachedMembers.find(m => m.member.id === currentMemberId)
    : undefined;

  if (currentView === 'list') {
    heroRoot.appendChild(createHeader({
      badge: 'ICT202 — Développement Mobile',
      title: 'Notre',
      highlight: 'Équipe',
      subtitle: 'Découvrez les profils, compétences et parcours des membres du Groupe 9x',
      stats: [
        { value: String(cachedMembers.length), label: 'Membres' },
        { value: 'Groupe', label: '9x' },
        { value: '2026', label: 'Promotion' },
      ],
    }));
    renderList();
  } else if (member) {
    heroRoot.appendChild(createHeader({
      badge: 'CV Détail',
      title: member.member.nom,
      subtitle: member.member.specialites?.[0] ?? member.member.role,
      photoUrl: member.photoUrl,
    }));
    if (currentView === 'detail') renderDetail(currentMemberId!);
    else if (currentView === 'edit') renderEdit(currentMemberId!);
  }

  footerRoot.appendChild(createFooter());
}

async function renderList(): Promise<void> {
  const members = cachedMembers;
  const list = createMemberList(members, (id) => {
    currentMemberId = id;
    currentView = 'detail';
    render();
  });
  appRoot.appendChild(list);
}

async function init(): Promise<void> {
  await DB.open();
  await DB.seedIfEmpty();
  cachedMembers = await MemberService.getAll();
  render();
}

async function renderDetail(id: number): Promise<void> {
  const result = await MemberService.getWithMedia(id);
  if (!result) {
    currentView = 'list';
    render();
    return;
  }
  const page = createCvPage(
    cachedMembers,
    result,
    (navigateId) => {
      currentMemberId = navigateId;
      render();
    },
    () => { currentView = 'list'; render(); },
    () => { currentView = 'edit'; render(); }
  );
  appRoot.appendChild(page);
}

async function renderEdit(id: number): Promise<void> {
  const member = await MemberService.getById(id);
  if (!member) {
    currentView = 'list';
    render();
    return;
  }
  const editor = createCvEditor(
    member,
    async (data) => {
      await MemberService.update(data);
      cachedMembers = await MemberService.getAll();
      currentView = 'detail';
      render();
    },
    () => { currentView = 'detail'; render(); }
  );
  appRoot.appendChild(editor);
}

init();
