# Overview

ProjectDash is a comprehensive project management dashboard designed for teams and organizations. The application provides real-time insights into project performance, team productivity, and resource utilization with advanced analytics and visualization features. Built as a full-stack web application, it combines a React frontend with an Express.js backend, featuring interactive charts and comprehensive project analysis tools.

# User Preferences

Preferred communication style: Simple, everyday language.

# Recent Changes (December 2024)

## Dashboard Updates
- Removed "Live Dashboard" button, changed "Export Data" to "Download Data"
- Removed Recent Activity section from dashboard
- Updated Team Performance to use random names (Jane Doe, John Smith, etc.) and removed profile photos
- Added Dataset Overview tab to analytics page

## Real Data Integration
- Connected real project data from 8+ industries with $118M+ in combined budgets
- Added manual project entry form with comprehensive field validation
- Created dataset files documentation for transparency
- Integrated authentic data sources from government databases, clinical trials, and industry datasets

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
- Executive dashboard with project overview widgets
- Advanced analytics with interactive charts
- Project status tracking and timeline visualization
- Team performance monitoring and resource utilization

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
- Users with role-based access (developer, designer, manager, qa)
- Clients and projects for work organization
- Project analytics and performance metrics
- Team collaboration and activity tracking

## Authentication and Authorization

**Simplified Access Model**:

- **Open Access**: Dashboard operates without authentication for demo purposes
- **Mock Data**: Uses sample data for visualization and analytics
- **Role Simulation**: Simulates different user roles for demonstration
- **Security**: Prepared for future authentication integration
- **Data Models**: Maintains user role structure for future expansion

The access system features:
- Immediate dashboard access without login barriers
- Sample project and team data for demonstration
- Role-based UI components ready for authentication
- Prepared infrastructure for future security implementation

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