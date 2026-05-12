import * as DB from './services/DatabaseService.js';
import * as MemberService from './services/MemberService.js';
import { createHeader } from './components/Header.js';
import { createMemberList } from './components/MemberList.js';
import { createCvViewer } from './components/CvViewer.js';
import { createCvEditor } from './components/CvEditor.js';

type View = 'list' | 'detail' | 'edit';

const appRoot = document.getElementById('app')!;
let currentView: View = 'list';
let currentMemberId: number | null = null;

function render(): void {
  appRoot.innerHTML = '';
  appRoot.appendChild(createHeader());

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
  const members = await MemberService.getAll();
  const list = createMemberList(members, (id) => {
    currentMemberId = id;
    currentView = 'detail';
    render();
  });
  appRoot.appendChild(list);
}

async function renderDetail(id: number): Promise<void> {
  const result = await MemberService.getWithMedia(id);
  if (!result) {
    currentView = 'list';
    render();
    return;
  }
  const viewer = createCvViewer(
    result,
    () => { currentView = 'list'; render(); },
    () => { currentView = 'edit'; render(); }
  );
  appRoot.appendChild(viewer);
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
      currentView = 'detail';
      render();
    },
    () => { currentView = 'detail'; render(); }
  );
  appRoot.appendChild(editor);
}

async function init(): Promise<void> {
  await DB.open();
  render();
}

init();
