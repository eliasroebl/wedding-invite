# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Angular 20 application called "WeddingInvite" - a wedding invitation web application. The project uses the standalone component architecture (no NgModule), which is the modern Angular approach.

## Development Commands

### Development Server
```bash
npm start
# or
ng serve
```
Starts the development server on `http://localhost:4200/`

### Build
```bash
npm run build
# or
ng build
```
Builds the application for production in the `dist/` directory

### Testing
```bash
npm test
# or
ng test
```
Runs unit tests using Karma and Jasmine

### Watch Mode
```bash
npm run watch
# or
ng build --watch --configuration development
```
Builds the application in development mode and watches for changes

## Code Architecture

### Application Structure
- **Standalone Components**: The app uses Angular's standalone component architecture (no NgModule)
- **Main Entry Point**: `src/main.ts` bootstraps the application using `bootstrapApplication()`
- **Root Component**: `App` component in `src/app/app.ts` serves as the application root
- **Configuration**: App configuration is centralized in `src/app/app.config.ts`
- **Routing**: Routes are defined in `src/app/app.routes.ts`

### Component Conventions
- Components use the `App` prefix (e.g., `App` for root component)
- Template files use `.html` extension
- Style files use `.css` extension
- Component files use `.ts` extension

### Key Files
- `src/main.ts`: Application bootstrap
- `src/app/app.ts`: Root component
- `src/app/app.config.ts`: Application configuration
- `src/app/app.routes.ts`: Route definitions
- `angular.json`: Angular CLI configuration
- `tsconfig.json`: TypeScript configuration

### Code Generation
Use Angular CLI for generating components:
```bash
ng generate component component-name
```

### Testing Framework
- **Unit Tests**: Jasmine + Karma
- **Test Files**: `*.spec.ts` files
- **Configuration**: `tsconfig.spec.json`

### Build Configuration
- **Development**: Optimized for debugging with source maps
- **Production**: Optimized for performance with bundle budgets:
  - Initial bundle: max 1MB (warning at 500kB)
  - Component styles: max 8kB (warning at 4kB)

## Data Management Guidelines
- **Guest List Synchronization**: 
  * Whenever you add an entry to the guest-list.json, update the guest-list.csv accordingly