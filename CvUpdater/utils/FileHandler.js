function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}
function readFileAsBlob(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(new Blob([reader.result]));
        reader.onerror = () => reject(reader.error);
        reader.readAsArrayBuffer(file);
    });
}
function revokeUrl(url) {
    URL.revokeObjectURL(url);
}
const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];
const allowedAudioTypes = ['audio/mpeg', 'audio/ogg', 'audio/wav'];
function validateFileType(file, allowedTypes) {
    return allowedTypes.includes(file.type);
}
function formatFileSize(bytes) {
    if (bytes < 1024)
        return `${bytes} o`;
    if (bytes < 1024 * 1024)
        return `${(bytes / 1024).toFixed(1)} Ko`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}
export { readFileAsDataURL, readFileAsBlob, revokeUrl, allowedImageTypes, allowedVideoTypes, allowedAudioTypes, validateFileType, formatFileSize, };
