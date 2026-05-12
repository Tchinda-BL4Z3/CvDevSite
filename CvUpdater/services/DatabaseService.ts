import { Member, MediaEntry } from '../models/Member.js';

const DB_NAME = 'CvUpdaterDB';
const DB_VERSION = 1;

let db: IDBDatabase | null = null;

function ensureOpen(): Promise<IDBDatabase> {
  if (db) return Promise.resolve(db);
  return open();
}

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;

      const memberStore = database.createObjectStore('members', {
        keyPath: 'id',
        autoIncrement: true,
      });

      memberStore.createIndex('nom', 'nom', { unique: false });
      memberStore.createIndex('role', 'role', { unique: false });
      memberStore.createIndex('email', 'email', { unique: true });

      database.createObjectStore('media', {
        keyPath: 'id',
        autoIncrement: true,
      });
    };

    request.onsuccess = (event) => {
      db = (event.target as IDBOpenDBRequest).result;
      resolve(db!);
    };

    request.onerror = () => reject(request.error);
  });
}

function createMember(member: Omit<Member, 'id'>): Promise<number> {
  return ensureOpen().then((database) => {
    return new Promise((resolve, reject) => {
      const tx = database.transaction('members', 'readwrite');
      const store = tx.objectStore('members');
      const request = store.add(member);
      request.onsuccess = () => resolve(request.result as number);
      request.onerror = () => reject(request.error);
    });
  });
}

function getAllMembers(): Promise<Member[]> {
  return ensureOpen().then((database) => {
    return new Promise((resolve, reject) => {
      const tx = database.transaction('members', 'readonly');
      const store = tx.objectStore('members');
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  });
}

function getMember(id: number): Promise<Member | undefined> {
  return ensureOpen().then((database) => {
    return new Promise((resolve, reject) => {
      const tx = database.transaction('members', 'readonly');
      const store = tx.objectStore('members');
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  });
}

function updateMember(member: Member): Promise<void> {
  return ensureOpen().then((database) => {
    return new Promise((resolve, reject) => {
      const tx = database.transaction('members', 'readwrite');
      const store = tx.objectStore('members');
      store.put(member);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  });
}

function deleteMember(id: number): Promise<void> {
  return ensureOpen().then((database) => {
    return new Promise((resolve, reject) => {
      const tx = database.transaction('members', 'readwrite');
      const store = tx.objectStore('members');
      store.delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  });
}

function saveMedia(file: File): Promise<number> {
  return ensureOpen().then((database) => {
    return new Promise((resolve, reject) => {
      const tx = database.transaction('media', 'readwrite');
      const store = tx.objectStore('media');
      const entry: Omit<MediaEntry, 'id'> = {
        name: file.name,
        type: file.type,
        size: file.size,
        data: file,
        uploaded_at: new Date().toISOString(),
      };
      const request = store.add(entry);
      request.onsuccess = () => resolve(request.result as number);
      request.onerror = () => reject(request.error);
    });
  });
}

function getMedia(id: number): Promise<Blob | undefined> {
  return ensureOpen().then((database) => {
    return new Promise((resolve, reject) => {
      const tx = database.transaction('media', 'readonly');
      const store = tx.objectStore('media');
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result?.data);
      request.onerror = () => reject(request.error);
    });
  });
}

export {
  open,
  createMember,
  getAllMembers,
  getMember,
  updateMember,
  deleteMember,
  saveMedia,
  getMedia,
};
