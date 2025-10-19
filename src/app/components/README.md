# Components Directory

This directory contains all the reusable React components used throughout the application.

## Structure

- `PokemonItem.tsx` - Individual Pokemon card component that displays Pokemon information
- `PokemonList.tsx` - Main component that renders the complete Pokemon list page with header, grid, loading states, and pagination
- `PokemonSkeleton.tsx` - Enhanced skeleton component using react-loading-skeleton library with smooth animations
- `PokemonPagination.tsx` - Pagination component with "Load More" functionality

## Usage

These components are designed to be reusable and follow React best practices:

- Each component is properly typed with TypeScript
- Components are exported as default exports
- Props interfaces are defined for type safety
- Components handle their own styling and behavior

## Guidelines

When adding new components to this directory:

1. Use TypeScript for all components
2. Define proper prop interfaces
3. Include JSDoc comments for complex components
4. Follow the existing naming conventions
5. Keep components focused on a single responsibility
6. Use proper error boundaries when necessary
