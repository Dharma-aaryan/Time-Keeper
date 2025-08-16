import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { FirebaseStorage } from "./firebaseStorage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { getStorageType } from "./config";
import {
  insertClientSchema,
  insertProjectSchema,
  insertTimeEntrySchema,
  insertTimeOffRequestSchema,
  insertNotificationSchema,
} from "@shared/schema";
import { z } from "zod";

// Firebase disabled temporarily due to authentication issues
const firebaseStorage = null;
const storageType = 'memory';
console.log('Using local storage for data');

export async function registerRoutes(app: Express): Promise<Server> {
  // Real project data routes
  app.get('/api/projects/real-data', async (req, res) => {
    try {
      let projects, stats, summary;
      
      if (firebaseStorage) {
        try {
          // Use Firebase data
          const firebaseProjects = await firebaseStorage.getProjects();
          projects = firebaseProjects;
        
        // Calculate stats from Firebase data
        stats = {};
        summary = {
          total: firebaseProjects.length,
          active: firebaseProjects.filter((p: any) => p.status === 'in-progress').length,
          completed: firebaseProjects.filter((p: any) => p.status === 'completed').length,
          testing: firebaseProjects.filter((p: any) => p.status === 'testing').length,
          planning: firebaseProjects.filter((p: any) => p.status === 'planning').length
        };
        } catch (firebaseError) {
          console.warn('Firebase failed, falling back to local data:', firebaseError);
          // Fallback to local data
          const { realProjects, industryStats } = await import('./data/realProjects');
          projects = realProjects;
          stats = industryStats;
          summary = {
            total: realProjects.length,
            active: realProjects.filter(p => p.status === 'in-progress').length,
            completed: realProjects.filter(p => p.status === 'completed').length,
            testing: realProjects.filter(p => p.status === 'testing').length,
            planning: realProjects.filter(p => p.status === 'planning').length
          };
        }
      } else {
        // Use local data as fallback
        const { realProjects, industryStats } = await import('./data/realProjects');
        projects = realProjects;
        stats = industryStats;
        summary = {
          total: realProjects.length,
          active: realProjects.filter(p => p.status === 'in-progress').length,
          completed: realProjects.filter(p => p.status === 'completed').length,
          testing: realProjects.filter(p => p.status === 'testing').length,
          planning: realProjects.filter(p => p.status === 'planning').length
        };
      }
      
      res.json({ projects, stats, summary });
    } catch (error) {
      console.error('Error loading project data:', error);
      res.status(500).json({ error: 'Failed to load project data' });
    }
  });

  app.get('/api/projects/analytics', async (req, res) => {
    try {
      if (firebaseStorage) {
        try {
          // Use Firebase analytics
          const analytics = await firebaseStorage.getAnalytics();
          res.json(analytics);
        } catch (firebaseError) {
          console.warn('Firebase analytics failed, falling back to local data:', firebaseError);
          // Fallback to local analytics calculation
          const { realProjects } = await import('./data/realProjects');
          
          const industryBreakdown = realProjects.reduce((acc, project) => {
            acc[project.industry] = (acc[project.industry] || 0) + 1;
            return acc;
          }, {} as Record<string, number>);

          const budgetAnalysis = realProjects.map(p => ({
            name: p.name.substring(0, 15) + '...',
            estimated: p.budget,
            actual: p.actualCost,
            efficiency: Math.round((p.actualCost / p.budget) * 100)
          }));

          const timelineData = realProjects.map(p => {
            const start = new Date(p.startDate);
            const end = new Date(p.endDate);
            const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
            return {
              name: p.name.substring(0, 20),
              duration,
              progress: p.progress,
              industry: p.industry
            };
          });

          res.json({
            industryBreakdown,
            budgetAnalysis,
            timelineData,
            summary: {
              totalBudget: realProjects.reduce((sum, p) => sum + p.budget, 0),
              totalActualCost: realProjects.reduce((sum, p) => sum + p.actualCost, 0),
              avgTeamSize: Math.round(realProjects.reduce((sum, p) => sum + p.teamSize, 0) / realProjects.length),
              avgProgress: Math.round(realProjects.reduce((sum, p) => sum + p.progress, 0) / realProjects.length)
            }
          });
        }
      } else {
        // Use local data as fallback
        const { realProjects } = await import('./data/realProjects');
        
        // Calculate analytics from real data
        const industryBreakdown = realProjects.reduce((acc, project) => {
          acc[project.industry] = (acc[project.industry] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const budgetAnalysis = realProjects.map(p => ({
          name: p.name.substring(0, 15) + '...',
          estimated: p.budget,
          actual: p.actualCost,
          efficiency: Math.round((p.actualCost / p.budget) * 100)
        }));

        const timelineData = realProjects.map(p => {
          const start = new Date(p.startDate);
          const end = new Date(p.endDate);
          const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
          return {
            name: p.name.substring(0, 20),
            duration,
            progress: p.progress,
            industry: p.industry
          };
        });

        res.json({
          industryBreakdown,
          budgetAnalysis,
          timelineData,
          summary: {
            totalBudget: realProjects.reduce((sum, p) => sum + p.budget, 0),
            totalActualCost: realProjects.reduce((sum, p) => sum + p.actualCost, 0),
            avgTeamSize: Math.round(realProjects.reduce((sum, p) => sum + p.teamSize, 0) / realProjects.length),
            avgProgress: Math.round(realProjects.reduce((sum, p) => sum + p.progress, 0) / realProjects.length)
          }
        });
      }
    } catch (error) {
      console.error('Error loading analytics data:', error);
      res.status(500).json({ error: 'Failed to load analytics data' });
    }
  });

  // Firebase project management routes
  app.post('/api/projects/firebase', async (req, res) => {
    try {
      if (!firebaseStorage) {
        return res.status(400).json({ error: 'Firebase not configured' });
      }

      const project = await firebaseStorage.createProject(req.body);
      res.json(project);
    } catch (error) {
      console.error('Error creating project in Firebase:', error);
      res.status(500).json({ error: 'Failed to create project' });
    }
  });

  app.put('/api/projects/firebase/:id', async (req, res) => {
    try {
      if (!firebaseStorage) {
        return res.status(400).json({ error: 'Firebase not configured' });
      }

      const project = await firebaseStorage.updateProject(req.params.id, req.body);
      res.json(project);
    } catch (error) {
      console.error('Error updating project in Firebase:', error);
      res.status(500).json({ error: 'Failed to update project' });
    }
  });

  app.delete('/api/projects/firebase/:id', async (req, res) => {
    try {
      if (!firebaseStorage) {
        return res.status(400).json({ error: 'Firebase not configured' });
      }

      await firebaseStorage.deleteProject(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting project from Firebase:', error);
      res.status(500).json({ error: 'Failed to delete project' });
    }
  });

  // Seed data to Firebase (one-time operation)
  app.post('/api/projects/seed-firebase', async (req, res) => {
    try {
      if (!firebaseStorage) {
        return res.status(400).json({ error: 'Firebase not configured' });
      }

      const { realProjects } = await import('./data/realProjects');
      await firebaseStorage.seedProjectData(realProjects);
      res.json({ success: true, message: `Seeded ${realProjects.length} projects to Firebase` });
    } catch (error) {
      console.error('Error seeding data to Firebase:', error);
      res.status(500).json({ error: 'Failed to seed data' });
    }
  });

  // Get storage status
  app.get('/api/storage/status', (req, res) => {
    res.json({
      storageType: getStorageType(),
      firebaseEnabled: !!firebaseStorage,
      message: firebaseStorage ? 'Firebase connected' : 'Using local storage'
    });
  });

  // Manual project creation endpoint
  app.post('/api/projects/manual', async (req, res) => {
    try {
      const { realProjects } = await import('./data/realProjects');
      
      const newProject = {
        id: `USER_${String(Date.now()).slice(-6)}`,
        name: req.body.name,
        industry: req.body.industry,
        domain: req.body.domain || '',
        client: req.body.client,
        status: req.body.status,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        budget: req.body.budget,
        actualCost: req.body.budget * 0.8, // Default to 80% of budget
        teamSize: req.body.teamSize,
        progress: req.body.progress || 0,
        priority: req.body.priority,
        riskLevel: req.body.riskLevel,
        location: req.body.location || '',
        description: req.body.description,
        technologies: req.body.technologies || [],
        phases: []
      };

      // Add to the real projects array (in memory for demo)
      realProjects.push(newProject);
      
      res.json({ 
        success: true, 
        project: newProject,
        totalProjects: realProjects.length 
      });
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(500).json({ error: 'Failed to create project' });
    }
  });



  // Client routes
  app.get('/api/clients', isAuthenticated, async (req, res) => {
    try {
      const clients = await storage.getClients();
      res.json(clients);
    } catch (error) {
      console.error("Error fetching clients:", error);
      res.status(500).json({ message: "Failed to fetch clients" });
    }
  });

  app.post('/api/clients', isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertClientSchema.parse(req.body);
      const client = await storage.createClient(validatedData);
      res.json(client);
    } catch (error) {
      console.error("Error creating client:", error);
      res.status(400).json({ message: "Failed to create client" });
    }
  });

  // Project routes
  app.get('/api/projects', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const projects = await storage.getProjectsByUser(userId);
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.post('/api/projects', isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(400).json({ message: "Failed to create project" });
    }
  });

  // Time entry routes
  app.get('/api/time-entries', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { startDate, endDate } = req.query;
      
      let timeEntries;
      if (startDate && endDate) {
        timeEntries = await storage.getTimeEntriesByDateRange(
          userId,
          new Date(startDate as string),
          new Date(endDate as string)
        );
      } else {
        timeEntries = await storage.getTimeEntries(userId);
      }
      
      res.json(timeEntries);
    } catch (error) {
      console.error("Error fetching time entries:", error);
      res.status(500).json({ message: "Failed to fetch time entries" });
    }
  });

  app.post('/api/time-entries', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertTimeEntrySchema.parse({
        ...req.body,
        userId,
      });
      const timeEntry = await storage.createTimeEntry(validatedData);
      res.json(timeEntry);
    } catch (error) {
      console.error("Error creating time entry:", error);
      res.status(400).json({ message: "Failed to create time entry" });
    }
  });

  app.put('/api/time-entries/:id', isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertTimeEntrySchema.partial().parse(req.body);
      const timeEntry = await storage.updateTimeEntry(id, validatedData);
      res.json(timeEntry);
    } catch (error) {
      console.error("Error updating time entry:", error);
      res.status(400).json({ message: "Failed to update time entry" });
    }
  });

  app.delete('/api/time-entries/:id', isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteTimeEntry(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting time entry:", error);
      res.status(500).json({ message: "Failed to delete time entry" });
    }
  });

  app.post('/api/time-entries/:id/approve', isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const approverId = req.user.claims.sub;
      const timeEntry = await storage.approveTimeEntry(id, approverId);
      res.json(timeEntry);
    } catch (error) {
      console.error("Error approving time entry:", error);
      res.status(500).json({ message: "Failed to approve time entry" });
    }
  });

  app.post('/api/time-entries/:id/reject', isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const approverId = req.user.claims.sub;
      const timeEntry = await storage.rejectTimeEntry(id, approverId);
      res.json(timeEntry);
    } catch (error) {
      console.error("Error rejecting time entry:", error);
      res.status(500).json({ message: "Failed to reject time entry" });
    }
  });

  // Time off routes
  app.get('/api/time-off-requests', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const requests = await storage.getTimeOffRequests(userId);
      res.json(requests);
    } catch (error) {
      console.error("Error fetching time off requests:", error);
      res.status(500).json({ message: "Failed to fetch time off requests" });
    }
  });

  app.post('/api/time-off-requests', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertTimeOffRequestSchema.parse({
        ...req.body,
        userId,
      });
      const request = await storage.createTimeOffRequest(validatedData);
      res.json(request);
    } catch (error) {
      console.error("Error creating time off request:", error);
      res.status(400).json({ message: "Failed to create time off request" });
    }
  });

  // Notification routes
  app.get('/api/notifications', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const notifications = await storage.getNotifications(userId);
      res.json(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  app.post('/api/notifications/:id/read', isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.markNotificationAsRead(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({ message: "Failed to mark notification as read" });
    }
  });

  // Analytics routes
  app.get('/api/stats', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const stats = await storage.getUserStats(userId);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
