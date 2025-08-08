import { sql, relations } from "drizzle-orm";
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  decimal,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role").default("employee"), // employee, manager, admin
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const clients = pgTable("clients", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  email: varchar("email"),
  phone: varchar("phone"),
  address: text("address"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  description: text("description"),
  clientId: varchar("client_id").references(() => clients.id),
  color: varchar("color").default("#3b82f6"),
  budget: decimal("budget", { precision: 10, scale: 2 }),
  hourlyRate: decimal("hourly_rate", { precision: 10, scale: 2 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const timeEntryStatusEnum = pgEnum("time_entry_status", [
  "draft",
  "submitted",
  "approved",
  "rejected",
]);

export const timeEntries = pgTable("time_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  projectId: varchar("project_id").notNull().references(() => projects.id),
  description: text("description"),
  startTime: timestamp("start_time"),
  endTime: timestamp("end_time"),
  duration: integer("duration"), // in minutes
  date: timestamp("date").notNull(),
  isBillable: boolean("is_billable").default(true),
  status: timeEntryStatusEnum("status").default("draft"),
  approvedBy: varchar("approved_by").references(() => users.id),
  approvedAt: timestamp("approved_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const timeOffTypeEnum = pgEnum("time_off_type", [
  "vacation",
  "sick",
  "personal",
  "holiday",
]);

export const timeOffStatusEnum = pgEnum("time_off_status", [
  "pending",
  "approved",
  "rejected",
]);

export const timeOffRequests = pgTable("time_off_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  type: timeOffTypeEnum("type").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  reason: text("reason"),
  status: timeOffStatusEnum("status").default("pending"),
  approvedBy: varchar("approved_by").references(() => users.id),
  approvedAt: timestamp("approved_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  title: varchar("title").notNull(),
  message: text("message").notNull(),
  type: varchar("type").default("info"), // info, warning, success, error
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  timeEntries: many(timeEntries),
  timeOffRequests: many(timeOffRequests),
  notifications: many(notifications),
  approvedTimeEntries: many(timeEntries, { relationName: "approver" }),
  approvedTimeOffRequests: many(timeOffRequests, { relationName: "approver" }),
}));

export const clientsRelations = relations(clients, ({ many }) => ({
  projects: many(projects),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  client: one(clients, {
    fields: [projects.clientId],
    references: [clients.id],
  }),
  timeEntries: many(timeEntries),
}));

export const timeEntriesRelations = relations(timeEntries, ({ one }) => ({
  user: one(users, {
    fields: [timeEntries.userId],
    references: [users.id],
  }),
  project: one(projects, {
    fields: [timeEntries.projectId],
    references: [projects.id],
  }),
  approver: one(users, {
    fields: [timeEntries.approvedBy],
    references: [users.id],
    relationName: "approver",
  }),
}));

export const timeOffRequestsRelations = relations(timeOffRequests, ({ one }) => ({
  user: one(users, {
    fields: [timeOffRequests.userId],
    references: [users.id],
  }),
  approver: one(users, {
    fields: [timeOffRequests.approvedBy],
    references: [users.id],
    relationName: "approver",
  }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertClientSchema = createInsertSchema(clients).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTimeEntrySchema = createInsertSchema(timeEntries).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  approvedBy: true,
  approvedAt: true,
});

export const insertTimeOffRequestSchema = createInsertSchema(timeOffRequests).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  approvedBy: true,
  approvedAt: true,
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Client = typeof clients.$inferSelect;
export type InsertClient = z.infer<typeof insertClientSchema>;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type TimeEntry = typeof timeEntries.$inferSelect;
export type InsertTimeEntry = z.infer<typeof insertTimeEntrySchema>;

export type TimeOffRequest = typeof timeOffRequests.$inferSelect;
export type InsertTimeOffRequest = z.infer<typeof insertTimeOffRequestSchema>;

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
