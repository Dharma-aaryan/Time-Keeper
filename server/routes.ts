import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import {
  insertClientSchema,
  insertProjectSchema,
  insertTimeEntrySchema,
  insertTimeOffRequestSchema,
  insertNotificationSchema,
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Real project data routes
  app.get('/api/projects/real-data', async (req, res) => {
    try {
      const { realProjectsData, industryStats } = await import('./data/realProjects');
      res.json({
        projects: realProjectsData,
        stats: industryStats,
        summary: {
          total: realProjectsData.length,
          active: realProjectsData.filter(p => p.status === 'in-progress').length,
          completed: realProjectsData.filter(p => p.status === 'completed').length,
          testing: realProjectsData.filter(p => p.status === 'testing').length,
          planning: realProjectsData.filter(p => p.status === 'planning').length
        }
      });
    } catch (error) {
      console.error('Error loading project data:', error);
      res.status(500).json({ error: 'Failed to load project data' });
    }
  });

  app.get('/api/projects/analytics', async (req, res) => {
    try {
      const { realProjectsData } = await import('./data/realProjects');
      
      // Calculate analytics from real data
      const industryBreakdown = realProjectsData.reduce((acc, project) => {
        acc[project.industry] = (acc[project.industry] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const budgetAnalysis = realProjectsData.map(p => ({
        name: p.name.substring(0, 15) + '...',
        estimated: p.budget,
        actual: p.actualCost,
        efficiency: Math.round((p.actualCost / p.budget) * 100)
      }));

      const timelineData = realProjectsData.map(p => {
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
          totalBudget: realProjectsData.reduce((sum, p) => sum + p.budget, 0),
          totalActualCost: realProjectsData.reduce((sum, p) => sum + p.actualCost, 0),
          avgTeamSize: Math.round(realProjectsData.reduce((sum, p) => sum + p.teamSize, 0) / realProjectsData.length),
          avgProgress: Math.round(realProjectsData.reduce((sum, p) => sum + p.progress, 0) / realProjectsData.length)
        }
      });
    } catch (error) {
      console.error('Error calculating analytics:', error);
      res.status(500).json({ error: 'Failed to calculate analytics' });
    }
  });

  // Manual project entry routes
  app.post('/api/projects/manual', async (req, res) => {
    try {
      const projectData = req.body;
      // For now, store in memory (can be extended to use database)
      const newProject = {
        id: `MANUAL_${Date.now()}`,
        ...projectData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // In a real implementation, save to database
      res.json({ success: true, project: newProject });
    } catch (error) {
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
