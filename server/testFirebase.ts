// Test Firebase connection
import { db } from './firebase';

export async function testFirebaseConnection() {
  try {
    // Try to access Firestore
    const testCollection = db.collection('test');
    const testDoc = await testCollection.add({ test: true, timestamp: new Date() });
    console.log('✅ Firebase connected successfully! Test document ID:', testDoc.id);
    
    // Clean up test document
    await testDoc.delete();
    console.log('✅ Test document cleaned up');
    
    return true;
  } catch (error) {
    console.error('❌ Firebase connection failed:', error);
    return false;
  }
}