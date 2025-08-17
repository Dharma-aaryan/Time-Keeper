import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

console.log('Using local storage for project data');

export async function registerRoutes(app: Express): Promise<Server> {
  // Real project data routes
  app.get('/api/projects/real-data', async (req, res) => {
    try {
      // Use authentic project data from realProjects
      const { realProjects, industryStats } = await import('./data/realProjects');
      
      const summary = {
        total: realProjects.length,
        active: realProjects.filter(p => p.status === 'in-progress').length,
        completed: realProjects.filter(p => p.status === 'completed').length,
        testing: realProjects.filter(p => p.status === 'testing').length,
        planning: realProjects.filter(p => p.status === 'planning').length
      };
      
      res.json({
        projects: realProjects,
        stats: industryStats,
        summary
      });
    } catch (error) {
      console.error('Error loading project data:', error);
      res.status(500).json({ error: 'Failed to load project data' });
    }
  });

  app.get('/api/projects/analytics', async (req, res) => {
    try {
      // Use authentic project data for analytics
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
    } catch (error) {
      console.error('Error loading analytics data:', error);
      res.status(500).json({ error: 'Failed to load analytics data' });
    }
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

  // Simplified client routes
  app.get('/api/clients', async (req, res) => {
    try {
      const clients = await storage.getClients();
      res.json(clients);
    } catch (error) {
      console.error("Error fetching clients:", error);
      res.status(500).json({ message: "Failed to fetch clients" });
    }
  });

  app.post('/api/clients', async (req, res) => {
    try {
      const client = await storage.createClient(req.body);
      res.json(client);
    } catch (error) {
      console.error("Error creating client:", error);
      res.status(400).json({ message: "Failed to create client" });
    }
  });

  // Simplified project routes
  app.get('/api/projects', async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Simplified time entry routes
  app.get('/api/time-entries', async (req, res) => {
    try {
      const userId = 'demo-user'; // Demo user for local development
      const timeEntries = await storage.getTimeEntries(userId);
      res.json(timeEntries);
    } catch (error) {
      console.error("Error fetching time entries:", error);
      res.status(500).json({ message: "Failed to fetch time entries" });
    }
  });

  app.post('/api/time-entries', async (req, res) => {
    try {
      const userId = 'demo-user'; // Demo user for local development
      const timeEntry = await storage.createTimeEntry({
        ...req.body,
        userId,
      });
      res.json(timeEntry);
    } catch (error) {
      console.error("Error creating time entry:", error);
      res.status(400).json({ message: "Failed to create time entry" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}