export class FileHandler {
  static async readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }

  static async readFileAsBlob(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(new Blob([reader.result as ArrayBuffer]));
      reader.onerror = () => reject(reader.error);
      reader.readAsArrayBuffer(file);
    });
  }

  static revokeUrl(url: string): void {
    URL.revokeObjectURL(url);
  }

  static allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  static allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];
  static allowedAudioTypes = ['audio/mpeg', 'audio/ogg', 'audio/wav'];

  static validateFile(file: File, allowedTypes: string[]): boolean {
    return allowedTypes.includes(file.type);
  }

  static formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} o`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
  }
}
