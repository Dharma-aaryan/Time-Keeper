import {
  users,
  clients,
  projects,
  timeEntries,
  timeOffRequests,
  notifications,
  type User,
  type UpsertUser,
  type Client,
  type InsertClient,
  type Project,
  type InsertProject,
  type TimeEntry,
  type InsertTimeEntry,
  type TimeOffRequest,
  type InsertTimeOffRequest,
  type Notification,
  type InsertNotification,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, gte, lte, sql } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Client operations
  getClients(): Promise<Client[]>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: string, client: Partial<InsertClient>): Promise<Client>;
  deleteClient(id: string): Promise<void>;
  
  // Project operations
  getProjects(): Promise<Project[]>;
  getProjectsByUser(userId: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: string): Promise<void>;
  
  // Time entry operations
  getTimeEntries(userId: string): Promise<TimeEntry[]>;
  getTimeEntriesByDateRange(userId: string, startDate: Date, endDate: Date): Promise<TimeEntry[]>;
  createTimeEntry(timeEntry: InsertTimeEntry): Promise<TimeEntry>;
  updateTimeEntry(id: string, timeEntry: Partial<InsertTimeEntry>): Promise<TimeEntry>;
  deleteTimeEntry(id: string): Promise<void>;
  approveTimeEntry(id: string, approverId: string): Promise<TimeEntry>;
  rejectTimeEntry(id: string, approverId: string): Promise<TimeEntry>;
  
  // Time off operations
  getTimeOffRequests(userId: string): Promise<TimeOffRequest[]>;
  createTimeOffRequest(request: InsertTimeOffRequest): Promise<TimeOffRequest>;
  updateTimeOffRequest(id: string, request: Partial<InsertTimeOffRequest>): Promise<TimeOffRequest>;
  approveTimeOffRequest(id: string, approverId: string): Promise<TimeOffRequest>;
  rejectTimeOffRequest(id: string, approverId: string): Promise<TimeOffRequest>;
  
  // Notification operations
  getNotifications(userId: string): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationAsRead(id: string): Promise<void>;
  
  // Analytics operations
  getUserStats(userId: string): Promise<{
    todayHours: number;
    weekHours: number;
    billableHours: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations (mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Client operations
  async getClients(): Promise<Client[]> {
    return await db.select().from(clients).orderBy(desc(clients.createdAt));
  }

  async createClient(client: InsertClient): Promise<Client> {
    const [newClient] = await db.insert(clients).values(client).returning();
    return newClient;
  }

  async updateClient(id: string, client: Partial<InsertClient>): Promise<Client> {
    const [updatedClient] = await db
      .update(clients)
      .set({ ...client, updatedAt: new Date() })
      .where(eq(clients.id, id))
      .returning();
    return updatedClient;
  }

  async deleteClient(id: string): Promise<void> {
    await db.delete(clients).where(eq(clients.id, id));
  }

  // Project operations
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(desc(projects.createdAt));
  }

  async getProjectsByUser(userId: string): Promise<Project[]> {
    // For now, return all active projects. In a real app, you'd filter by user assignments
    return await db
      .select()
      .from(projects)
      .where(eq(projects.isActive, true))
      .orderBy(desc(projects.createdAt));
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project> {
    const [updatedProject] = await db
      .update(projects)
      .set({ ...project, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return updatedProject;
  }

  async deleteProject(id: string): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }

  // Time entry operations
  async getTimeEntries(userId: string): Promise<TimeEntry[]> {
    return await db
      .select()
      .from(timeEntries)
      .where(eq(timeEntries.userId, userId))
      .orderBy(desc(timeEntries.date));
  }

  async getTimeEntriesByDateRange(userId: string, startDate: Date, endDate: Date): Promise<TimeEntry[]> {
    return await db
      .select()
      .from(timeEntries)
      .where(
        and(
          eq(timeEntries.userId, userId),
          gte(timeEntries.date, startDate),
          lte(timeEntries.date, endDate)
        )
      )
      .orderBy(desc(timeEntries.date));
  }

  async createTimeEntry(timeEntry: InsertTimeEntry): Promise<TimeEntry> {
    const [newTimeEntry] = await db.insert(timeEntries).values(timeEntry).returning();
    return newTimeEntry;
  }

  async updateTimeEntry(id: string, timeEntry: Partial<InsertTimeEntry>): Promise<TimeEntry> {
    const [updatedTimeEntry] = await db
      .update(timeEntries)
      .set({ ...timeEntry, updatedAt: new Date() })
      .where(eq(timeEntries.id, id))
      .returning();
    return updatedTimeEntry;
  }

  async deleteTimeEntry(id: string): Promise<void> {
    await db.delete(timeEntries).where(eq(timeEntries.id, id));
  }

  async approveTimeEntry(id: string, approverId: string): Promise<TimeEntry> {
    const [approvedEntry] = await db
      .update(timeEntries)
      .set({
        status: "approved",
        approvedBy: approverId,
        approvedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(timeEntries.id, id))
      .returning();
    return approvedEntry;
  }

  async rejectTimeEntry(id: string, approverId: string): Promise<TimeEntry> {
    const [rejectedEntry] = await db
      .update(timeEntries)
      .set({
        status: "rejected",
        approvedBy: approverId,
        approvedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(timeEntries.id, id))
      .returning();
    return rejectedEntry;
  }

  // Time off operations
  async getTimeOffRequests(userId: string): Promise<TimeOffRequest[]> {
    return await db
      .select()
      .from(timeOffRequests)
      .where(eq(timeOffRequests.userId, userId))
      .orderBy(desc(timeOffRequests.createdAt));
  }

  async createTimeOffRequest(request: InsertTimeOffRequest): Promise<TimeOffRequest> {
    const [newRequest] = await db.insert(timeOffRequests).values(request).returning();
    return newRequest;
  }

  async updateTimeOffRequest(id: string, request: Partial<InsertTimeOffRequest>): Promise<TimeOffRequest> {
    const [updatedRequest] = await db
      .update(timeOffRequests)
      .set({ ...request, updatedAt: new Date() })
      .where(eq(timeOffRequests.id, id))
      .returning();
    return updatedRequest;
  }

  async approveTimeOffRequest(id: string, approverId: string): Promise<TimeOffRequest> {
    const [approvedRequest] = await db
      .update(timeOffRequests)
      .set({
        status: "approved",
        approvedBy: approverId,
        approvedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(timeOffRequests.id, id))
      .returning();
    return approvedRequest;
  }

  async rejectTimeOffRequest(id: string, approverId: string): Promise<TimeOffRequest> {
    const [rejectedRequest] = await db
      .update(timeOffRequests)
      .set({
        status: "rejected",
        approvedBy: approverId,
        approvedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(timeOffRequests.id, id))
      .returning();
    return rejectedRequest;
  }

  // Notification operations
  async getNotifications(userId: string): Promise<Notification[]> {
    return await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt))
      .limit(10);
  }

  async createNotification(notification: InsertNotification): Promise<Notification> {
    const [newNotification] = await db.insert(notifications).values(notification).returning();
    return newNotification;
  }

  async markNotificationAsRead(id: string): Promise<void> {
    await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.id, id));
  }

  // Analytics operations
  async getUserStats(userId: string): Promise<{
    todayHours: number;
    weekHours: number;
    billableHours: number;
  }> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekStart.setHours(0, 0, 0, 0);

    // Today's hours
    const [todayResult] = await db
      .select({
        total: sql<number>`COALESCE(SUM(${timeEntries.duration}), 0)`,
      })
      .from(timeEntries)
      .where(
        and(
          eq(timeEntries.userId, userId),
          gte(timeEntries.date, today)
        )
      );

    // Week hours
    const [weekResult] = await db
      .select({
        total: sql<number>`COALESCE(SUM(${timeEntries.duration}), 0)`,
      })
      .from(timeEntries)
      .where(
        and(
          eq(timeEntries.userId, userId),
          gte(timeEntries.date, weekStart)
        )
      );

    // Billable hours this week
    const [billableResult] = await db
      .select({
        total: sql<number>`COALESCE(SUM(${timeEntries.duration}), 0)`,
      })
      .from(timeEntries)
      .where(
        and(
          eq(timeEntries.userId, userId),
          gte(timeEntries.date, weekStart),
          eq(timeEntries.isBillable, true)
        )
      );

    return {
      todayHours: Math.round((todayResult.total / 60) * 10) / 10,
      weekHours: Math.round((weekResult.total / 60) * 10) / 10,
      billableHours: Math.round((billableResult.total / 60) * 10) / 10,
    };
  }
}

export const storage = new DatabaseStorage();
