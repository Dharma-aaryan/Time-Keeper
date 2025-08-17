// Simple in-memory storage without database dependencies

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
}

export interface TimeEntry {
  id: string;
  userId: string;
  projectId: string;
  description: string;
  hours: number;
  date: string;
}

// Simple storage interface
export interface IStorage {
  // User operations
  getUser?(id: string): Promise<User | undefined>;
  upsertUser?(user: any): Promise<User>;
  
  // Client operations
  getClients?(): Promise<Client[]>;
  createClient?(client: any): Promise<Client>;
  
  // Project operations
  getProjects(): Promise<any[]>;
  
  // Time entry operations
  getTimeEntries(userId: string): Promise<TimeEntry[]>;
  createTimeEntry(timeEntry: any): Promise<TimeEntry>;
}

// In-memory storage implementation
export class MemoryStorage implements IStorage {
  private users: User[] = [];
  private clients: Client[] = [];
  private timeEntries: TimeEntry[] = [];

  async getUser(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async upsertUser(userData: any): Promise<User> {
    const existingIndex = this.users.findIndex(user => user.id === userData.id);
    const user: User = {
      id: userData.id,
      email: userData.email || '',
      name: userData.name || '',
      avatar: userData.avatar
    };

    if (existingIndex >= 0) {
      this.users[existingIndex] = user;
    } else {
      this.users.push(user);
    }
    return user;
  }

  async getClients(): Promise<Client[]> {
    return [...this.clients];
  }

  async createClient(clientData: any): Promise<Client> {
    const client: Client = {
      id: Date.now().toString(),
      name: clientData.name,
      email: clientData.email,
      company: clientData.company
    };
    this.clients.push(client);
    return client;
  }

  async getProjects(): Promise<any[]> {
    // Return authentic project data from realProjects
    const { realProjects } = await import('./data/realProjects');
    return realProjects;
  }

  async getTimeEntries(userId: string): Promise<TimeEntry[]> {
    return this.timeEntries.filter(entry => entry.userId === userId);
  }

  async createTimeEntry(timeEntryData: any): Promise<TimeEntry> {
    const timeEntry: TimeEntry = {
      id: Date.now().toString(),
      userId: timeEntryData.userId,
      projectId: timeEntryData.projectId,
      description: timeEntryData.description,
      hours: timeEntryData.hours,
      date: timeEntryData.date
    };
    this.timeEntries.push(timeEntry);
    return timeEntry;
  }
}

// Export storage instance
export const storage = new MemoryStorage();