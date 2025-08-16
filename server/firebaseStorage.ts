import { db, collections } from './firebase';
import { IStorage } from './storage';

export class FirebaseStorage implements IStorage {
  // Projects
  async getProjects() {
    try {
      const snapshot = await db.collection(collections.projects).get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting projects from Firebase:', error);
      throw error;
    }
  }

  async getProject(id: string) {
    try {
      const doc = await db.collection(collections.projects).doc(id).get();
      if (!doc.exists) {
        return null;
      }
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error('Error getting project from Firebase:', error);
      throw error;
    }
  }

  async createProject(project: any) {
    try {
      const docRef = await db.collection(collections.projects).add({
        ...project,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return { id: docRef.id, ...project };
    } catch (error) {
      console.error('Error creating project in Firebase:', error);
      throw error;
    }
  }

  async updateProject(id: string, updates: any) {
    try {
      await db.collection(collections.projects).doc(id).update({
        ...updates,
        updatedAt: new Date()
      });
      return { id, ...updates };
    } catch (error) {
      console.error('Error updating project in Firebase:', error);
      throw error;
    }
  }

  async deleteProject(id: string) {
    try {
      await db.collection(collections.projects).doc(id).delete();
      return true;
    } catch (error) {
      console.error('Error deleting project from Firebase:', error);
      throw error;
    }
  }

  // Analytics
  async getAnalytics() {
    try {
      const projectsSnapshot = await db.collection(collections.projects).get();
      const projects = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Calculate analytics from projects data
      const industryBreakdown: { [key: string]: number } = {};
      const budgetAnalysis: any[] = [];
      const timelineData: any[] = [];
      
      let totalBudget = 0;
      let totalActualCost = 0;
      
      projects.forEach((project: any) => {
        // Industry breakdown
        industryBreakdown[project.industry] = (industryBreakdown[project.industry] || 0) + 1;
        
        // Budget analysis
        totalBudget += project.budget || 0;
        totalActualCost += project.actualCost || project.budget * 0.85; // Default to 85% if no actual cost
        
        budgetAnalysis.push({
          name: project.name?.substring(0, 15) + '...' || 'Unnamed',
          estimated: project.budget || 0,
          actual: project.actualCost || project.budget * 0.85
        });
        
        // Timeline data
        timelineData.push({
          name: project.name?.substring(0, 15) + '...' || 'Unnamed',
          duration: project.duration || 90,
          progress: project.progress || 50
        });
      });

      return {
        industryBreakdown,
        budgetAnalysis: budgetAnalysis.slice(0, 10), // Limit for display
        timelineData: timelineData.slice(0, 10),
        summary: {
          totalProjects: projects.length,
          totalBudget,
          totalActualCost,
          avgProgress: projects.reduce((sum: number, p: any) => sum + (p.progress || 50), 0) / projects.length
        }
      };
    } catch (error) {
      console.error('Error getting analytics from Firebase:', error);
      throw error;
    }
  }

  // Clients (optional)
  async getClients() {
    try {
      const snapshot = await db.collection(collections.clients).get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting clients from Firebase:', error);
      return [];
    }
  }

  async createClient(client: any) {
    try {
      const docRef = await db.collection(collections.clients).add({
        ...client,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return { id: docRef.id, ...client };
    } catch (error) {
      console.error('Error creating client in Firebase:', error);
      throw error;
    }
  }

  // Utility method to seed data
  async seedProjectData(projects: any[]) {
    try {
      const batch = db.batch();
      
      projects.forEach((project) => {
        const docRef = db.collection(collections.projects).doc();
        batch.set(docRef, {
          ...project,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });
      
      await batch.commit();
      console.log(`Successfully seeded ${projects.length} projects to Firebase`);
      return true;
    } catch (error) {
      console.error('Error seeding data to Firebase:', error);
      throw error;
    }
  }
}