# Overview

TimeSuite is a comprehensive time tracking and project management application designed for teams and organizations. The application provides professional time tracking capabilities with features for project management, timesheet approval workflows, and comprehensive reporting. Built as a full-stack web application, it combines a React frontend with an Express.js backend, utilizing PostgreSQL for data persistence and Replit's authentication system for user management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built using **React with TypeScript** and follows a component-based architecture:

- **UI Framework**: Uses shadcn/ui components built on top of Radix UI primitives for consistent, accessible design
- **Styling**: Tailwind CSS with a custom design system using CSS variables for theming
- **State Management**: React Query (TanStack Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Build Tool**: Vite for fast development and optimized production builds

The frontend follows a page-based structure with reusable components, implementing features like:
- Dashboard with time tracking widgets
- Project management interface
- Timesheet submission and approval workflows
- Team management and reporting

## Backend Architecture

The backend uses **Express.js with TypeScript** in a RESTful API pattern:

- **Runtime**: Node.js with ES modules
- **API Structure**: Express.js with organized route handlers
- **Database Layer**: Drizzle ORM for type-safe database operations
- **Authentication**: Replit's OpenID Connect (OIDC) authentication system
- **Session Management**: Express sessions with PostgreSQL storage using connect-pg-simple

The server implements a layered architecture with:
- Route handlers for API endpoints
- Storage abstraction layer for database operations
- Authentication middleware for protected routes
- Comprehensive error handling and logging

## Data Storage

**PostgreSQL Database** managed through Drizzle ORM:

- **Schema Design**: Comprehensive schema covering users, clients, projects, time entries, time-off requests, and notifications
- **Database Migrations**: Drizzle Kit for schema migrations and database management
- **Connection**: Neon serverless PostgreSQL with connection pooling
- **Session Storage**: Dedicated sessions table for authentication state

Key entities include:
- Users with role-based access (employee, manager, admin)
- Clients and projects for work organization
- Time entries with approval workflows
- Time-off requests and notifications system

## Authentication and Authorization

**Replit Authentication Integration**:

- **Provider**: Replit's OIDC for seamless platform integration
- **Session Management**: Server-side sessions with PostgreSQL storage
- **User Management**: Automatic user creation and profile synchronization
- **Security**: Secure cookie configuration with HTTPS enforcement
- **Role-Based Access**: User roles determine feature access and permissions

The authentication system handles:
- Automatic user provisioning from Replit accounts
- Session persistence across browser sessions
- Protected API endpoints with middleware
- User profile management and updates

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **WebSocket Support**: For real-time database connections via ws library

## Authentication Services
- **Replit OIDC**: Primary authentication provider for user management
- **OpenID Client**: For OIDC protocol implementation and token handling

## UI and Component Libraries
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography
- **shadcn/ui**: Pre-built component library built on Radix UI

## Development and Build Tools
- **Vite**: Frontend build tool and development server
- **TypeScript**: Type safety across frontend and backend
- **Drizzle Kit**: Database schema management and migrations
- **ESBuild**: Fast JavaScript bundling for production builds

## Data Management
- **TanStack Query**: Server state management and caching for React
- **React Hook Form**: Form state management and validation
- **Zod**: Runtime type validation and schema definition
- **date-fns**: Date manipulation and formatting utilities

## Development Features
- **Replit Integration**: Development mode banner and cartographer plugin for Replit environment
- **Hot Module Replacement**: Vite HMR for fast development iteration
- **Error Overlay**: Runtime error modal for development debugging