# Types Directory

This directory contains TypeScript type definitions and interfaces used throughout the application.

## Purpose

Type definitions provide:
- Type safety across the application
- Better IDE support and autocompletion
- Documentation for data structures
- Consistency in data handling
- Easier refactoring and maintenance

## Structure

- `pokemon.ts` - Type definitions related to Pokemon data structures

## Naming Conventions

- Use PascalCase for type and interface names
- Use descriptive names that clearly indicate the purpose
- Group related types in the same file
- Use generic types when appropriate
- Export types that are used in multiple files

## Guidelines

When creating type definitions:

1. **Be specific**: Use precise types instead of `any`
2. **Use interfaces for objects**: Prefer `interface` over `type` for object shapes
3. **Use union types for variants**: When a value can be one of several types
4. **Use generics for reusability**: When types can be parameterized
5. **Document complex types**: Add JSDoc comments for complex type definitions
6. **Group related types**: Keep related types in the same file
7. **Use consistent naming**: Follow established naming patterns

## Example Type Definitions

```typescript
// Basic interface
export interface Pokemon {
  id: number;
  name: string;
  sprites: PokemonSprites;
  types: PokemonType[];
}

// Union type
export type PokemonStatus = 'loading' | 'success' | 'error';

// Generic type
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Utility type
export type PokemonList = Pokemon[];
```

## File Organization

Group types by domain or feature:
- `pokemon.ts` - Pokemon-related types
- `api.ts` - API response types
- `ui.ts` - UI component prop types
- `common.ts` - Shared utility types
