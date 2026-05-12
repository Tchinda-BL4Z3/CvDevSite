import { seedMembers } from '../data/seed.js';
const DB_NAME = 'CvUpdaterDB';
const DB_VERSION = 3;
let db = null;
function ensureOpen() {
    if (db)
        return Promise.resolve(db);
    return open();
}
function open() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = (event) => {
            const database = event.target.result;
            while (database.objectStoreNames.length > 0) {
                database.deleteObjectStore(database.objectStoreNames[0]);
            }
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
            db = event.target.result;
            resolve(db);
        };
        request.onerror = () => reject(request.error);
    });
}
function createMember(member) {
    return ensureOpen().then((database) => {
        return new Promise((resolve, reject) => {
            const tx = database.transaction('members', 'readwrite');
            const store = tx.objectStore('members');
            const request = store.add(member);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    });
}
function getAllMembers() {
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
function getMember(id) {
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
function updateMember(member) {
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
function deleteMember(id) {
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
function getMemberCount() {
    return ensureOpen().then((database) => {
        return new Promise((resolve, reject) => {
            const tx = database.transaction('members', 'readonly');
            const store = tx.objectStore('members');
            const request = store.count();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    });
}
function seedIfEmpty() {
    return getMemberCount().then((count) => {
        if (count > 0)
            return;
        return ensureOpen().then((database) => {
            return new Promise((resolve, reject) => {
                const tx = database.transaction('members', 'readwrite');
                const store = tx.objectStore('members');
                for (const member of seedMembers) {
                    store.add(member);
                }
                tx.oncomplete = () => resolve();
                tx.onerror = () => reject(tx.error);
            });
        });
    });
}
function saveMedia(file) {
    return ensureOpen().then((database) => {
        return new Promise((resolve, reject) => {
            const tx = database.transaction('media', 'readwrite');
            const store = tx.objectStore('media');
            const entry = {
                name: file.name,
                type: file.type,
                size: file.size,
                data: file,
                uploaded_at: new Date().toISOString(),
            };
            const request = store.add(entry);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    });
}
function getMedia(id) {
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
export { open, createMember, getAllMembers, getMember, updateMember, deleteMember, getMemberCount, seedIfEmpty, saveMedia, getMedia, };
