// Configuration for storage backend
export const config = {
  // Set to 'firebase' to use Firebase, 'memory' for in-memory storage, 'postgres' for PostgreSQL
  storageType: process.env.STORAGE_TYPE || 'firebase',
  
  // Firebase configuration
  firebase: {
    enabled: !!(process.env.FIREBASE_PROJECT_ID || process.env.FIREBASE_SERVICE_ACCOUNT_KEY),
    projectId: process.env.FIREBASE_PROJECT_ID,
    serviceAccountKey: process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }
};

export function getStorageType(): 'firebase' | 'memory' | 'postgres' {
  if (config.firebase.enabled && config.storageType === 'firebase') {
    return 'firebase';
  }
  
  if (config.storageType === 'postgres') {
    return 'postgres';
  }
  
  return 'memory';
}