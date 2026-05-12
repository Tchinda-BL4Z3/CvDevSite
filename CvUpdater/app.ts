import { DatabaseService } from './services/DatabaseService.js';
import { MemberService } from './services/MemberService.js';
import { Header } from './components/Header.js';
import { MemberList } from './components/MemberList.js';
import { CvViewer } from './components/CvViewer.js';
import { CvEditor } from './components/CvEditor.js';

type View = 'list' | 'detail' | 'edit';

const db = new DatabaseService();
const memberService = new MemberService(db);

const app = document.getElementById('app')!;
const header = new Header();

let currentView: View = 'list';
let currentMemberId: number | null = null;

function render(): void {
  app.innerHTML = '';

  app.appendChild(header.render());

  switch (currentView) {
    case 'list':
      renderList();
      break;
    case 'detail':
      if (currentMemberId !== null) renderDetail(currentMemberId);
      break;
    case 'edit':
      if (currentMemberId !== null) renderEdit(currentMemberId);
      break;
  }
}

async function renderList(): Promise<void> {
  const members = await memberService.getAll();
  const list = new MemberList(members, {
    onSelect: (id) => {
      currentMemberId = id;
      currentView = 'detail';
      render();
    },
  });
  app.appendChild(list.render());
}

async function renderDetail(id: number): Promise<void> {
  const result = await memberService.getWithMedia(id);
  if (!result) {
    currentView = 'list';
    render();
    return;
  }
  const viewer = new CvViewer(result, {
    onBack: () => {
      currentView = 'list';
      render();
    },
    onEdit: () => {
      currentView = 'edit';
      render();
    },
  });
  app.appendChild(viewer.render());
}

async function renderEdit(id: number): Promise<void> {
  const member = await memberService.getById(id);
  if (!member) {
    currentView = 'list';
    render();
    return;
  }
  const editor = new CvEditor(member, {
    onSave: async (data) => {
      await memberService.update(data);
      currentView = 'detail';
      render();
    },
    onCancel: () => {
      currentView = 'detail';
      render();
    },
  });
  app.appendChild(editor.render());
}

async function init(): Promise<void> {
  await db.open();
  render();
}

init();
