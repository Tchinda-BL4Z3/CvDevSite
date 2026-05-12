import { Member, MediaEntry } from '../models/Member.js';

const DB_NAME = 'CvUpdaterDB';
const DB_VERSION = 1;

export class DatabaseService {
  private db: IDBDatabase | null = null;

  async open(): Promise<IDBDatabase> {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        const memberStore = db.createObjectStore('members', {
          keyPath: 'id',
          autoIncrement: true,
        });

        memberStore.createIndex('nom', 'nom', { unique: false });
        memberStore.createIndex('role', 'role', { unique: false });
        memberStore.createIndex('email', 'email', { unique: true });

        db.createObjectStore('media', {
          keyPath: 'id',
          autoIncrement: true,
        });
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve(this.db!);
      };

      request.onerror = () => reject(request.error);
    });
  }

  private async ensureOpen(): Promise<IDBDatabase> {
    return this.db ?? this.open();
  }

  async createMember(member: Omit<Member, 'id'>): Promise<number> {
    const db = await this.ensureOpen();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('members', 'readwrite');
      const store = tx.objectStore('members');
      const request = store.add(member);
      request.onsuccess = () => resolve(request.result as number);
      request.onerror = () => reject(request.error);
    });
  }

  async getAllMembers(): Promise<Member[]> {
    const db = await this.ensureOpen();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('members', 'readonly');
      const store = tx.objectStore('members');
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getMember(id: number): Promise<Member | undefined> {
    const db = await this.ensureOpen();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('members', 'readonly');
      const store = tx.objectStore('members');
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async updateMember(member: Member): Promise<void> {
    const db = await this.ensureOpen();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('members', 'readwrite');
      const store = tx.objectStore('members');
      store.put(member);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async deleteMember(id: number): Promise<void> {
    const db = await this.ensureOpen();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('members', 'readwrite');
      const store = tx.objectStore('members');
      store.delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async saveMedia(file: File): Promise<number> {
    const db = await this.ensureOpen();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('media', 'readwrite');
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
  }

  async getMedia(id: number): Promise<Blob | undefined> {
    const db = await this.ensureOpen();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('media', 'readonly');
      const store = tx.objectStore('media');
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result?.data);
      request.onerror = () => reject(request.error);
    });
  }
}
