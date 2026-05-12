function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function readFileAsBlob(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(new Blob([reader.result as ArrayBuffer]));
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
}

function revokeUrl(url: string): void {
  URL.revokeObjectURL(url);
}

const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];
const allowedAudioTypes = ['audio/mpeg', 'audio/ogg', 'audio/wav'];

function validateFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type);
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

export {
  readFileAsDataURL,
  readFileAsBlob,
  revokeUrl,
  allowedImageTypes,
  allowedVideoTypes,
  allowedAudioTypes,
  validateFileType,
  formatFileSize,
};
