import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK
let firebaseApp;

if (getApps().length === 0) {
  // For development with service account key
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      firebaseApp = initializeApp({
        credential: cert(serviceAccount),
        projectId: process.env.FIREBASE_PROJECT_ID
      });
    } catch (error) {
      console.error('Error parsing Firebase service account key:', error);
      throw new Error('Invalid Firebase service account key format');
    }
  } 
  // For production with individual environment variables
  else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
    let privateKey = process.env.FIREBASE_PRIVATE_KEY;
    
    // Check if private key needs PEM formatting
    if (!privateKey.includes('-----BEGIN') && !privateKey.includes('-----END')) {
      // Add PEM headers if missing
      privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----`;
    }
    
    firebaseApp = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: privateKey.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
      projectId: process.env.FIREBASE_PROJECT_ID
    });
  }
  else {
    throw new Error('Firebase credentials not found. Please provide either FIREBASE_SERVICE_ACCOUNT_KEY or individual Firebase environment variables.');
  }
} else {
  firebaseApp = getApps()[0];
}

// Get Firestore instance
export const db = getFirestore(firebaseApp);

// Collection references
export const collections = {
  projects: 'projects',
  clients: 'clients',
  users: 'users',
  analytics: 'analytics'
};

export default firebaseApp;