# Bitcoin Supply Dashboard

## Overview

A real-time Bitcoin dashboard application that tracks Bitcoin's circulating supply, live price, and key milestones. The application is built as a full-stack web application with mobile support through Capacitor, allowing it to run as both a web app and a native Android application.

The dashboard fetches live Bitcoin data from external APIs (CoinGecko, Blockchain.info, CoinDesk) and presents it in an interactive, visually appealing interface with charts and progress indicators.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack Query (React Query) for server state and data fetching
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Styling**: Tailwind CSS v4 with custom theme configuration
- **Build Tool**: Vite for fast development and optimized production builds

**Key Design Patterns**:
- Component-based architecture with reusable UI components in `client/src/components/ui/`
- Custom hooks for shared logic (e.g., `use-mobile`, `use-toast`)
- Separation of concerns: pages in `client/src/pages/`, components in `client/src/components/`
- TypeScript for type safety across the application

**Mobile Support**:
- Capacitor integration for Android native app deployment
- PWA manifest for installable web app experience
- Responsive design with mobile-first approach
- Mobile-optimized meta tags and viewport settings

### Backend Architecture

**Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Development Server**: Includes Vite middleware for hot module replacement
- **Production Server**: Serves pre-built static assets from `dist/public`

**Storage Strategy**:
- In-memory storage implementation (`MemStorage`) as the default
- Storage interface (`IStorage`) designed for easy swapping to persistent storage
- Prepared for database integration via Drizzle ORM with PostgreSQL schema defined

**Key Design Patterns**:
- Separation of development (`index-dev.ts`) and production (`index-prod.ts`) server configurations
- Middleware-based request handling with logging
- CRUD operations abstracted through storage interface
- RESTful API design (routes prefixed with `/api`)

### Database Schema

**ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Location**: `shared/schema.ts`
- **Migrations**: Configured to output to `./migrations` directory

**Current Schema**:
- Users table with UUID primary keys, username, and password fields
- Zod schemas for validation of user inputs

**Note**: The application currently uses in-memory storage but is architected to easily migrate to PostgreSQL when the `DATABASE_URL` environment variable is provided.

### Build and Deployment

**Build Process**:
1. Vite builds the React frontend to `dist/public`
2. esbuild bundles the Express server to `dist/index.js`
3. Capacitor syncs web assets to Android project for mobile builds

**Development vs Production**:
- Development: Vite dev server with HMR, Replit-specific plugins (cartographer, dev banner)
- Production: Static file serving with optimized bundles

**Platform Support**:
- Web: Standard deployment via Node.js server
- Android: Native app via Capacitor with Android Studio builds

## External Dependencies

### Third-Party APIs
- **CoinGecko API**: Primary source for Bitcoin circulating supply and current price
- **Blockchain.info API**: Fallback for Bitcoin supply data
- **CoinDesk API**: Fallback for Bitcoin price data

**Fallback Strategy**: The application implements a graceful degradation strategy, attempting CoinGecko first, then falling back to alternative APIs if rate limits are reached or requests fail.

### UI Component Libraries
- **Radix UI**: Unstyled, accessible component primitives for building the UI
- **shadcn/ui**: Pre-built component library built on Radix UI
- **Lucide React**: Icon library for consistent iconography

### Data Visualization
- **Recharts**: Charting library for rendering Bitcoin data visualizations (Area charts)
- **date-fns**: Date manipulation and formatting for time-based data

### Mobile Platform
- **Capacitor**: Cross-platform native runtime for building the Android app
- Includes core platform packages and Android-specific tooling
- Configuration in `capacitor.config.ts` for app metadata and build options

### Development Tools
- **Replit Plugins**: Development-specific tooling (vite-plugin-runtime-error-modal, cartographer, dev-banner)
- **Custom Vite Plugin**: `metaImagesPlugin` for updating OpenGraph images with correct deployment URLs

### Database (Configured but Not Active)
- **Drizzle ORM**: TypeScript ORM for PostgreSQL
- **@neondatabase/serverless**: Neon database driver for serverless PostgreSQL
- **Drizzle Kit**: Migration and schema management tooling