# Services Directory

This directory contains service functions that handle API calls and external data fetching.

## Purpose

Services provide a clean abstraction layer for:
- Making HTTP requests to external APIs
- Handling API response formatting
- Managing API endpoints and configurations
- Centralizing data transformation logic

## Structure

Currently empty - services will be added as needed for:
- Pokemon API calls
- Data transformation
- Error handling
- Request/response interceptors

## Naming Conventions

- Use descriptive function names that indicate the action
- Group related services in subdirectories
- Use TypeScript for all service functions
- Include proper error handling

## Example Structure (Future)

```
services/
├── api/
│   ├── pokemonService.ts
│   ├── userService.ts
│   └── baseApi.ts
├── utils/
│   ├── dataTransformers.ts
│   └── validators.ts
└── constants/
    ├── apiEndpoints.ts
    └── apiConfig.ts
```

## Guidelines

When creating service functions:

1. Use async/await for API calls
2. Include proper TypeScript types for requests and responses
3. Handle errors gracefully with try/catch
4. Return consistent response formats
5. Use environment variables for API URLs
6. Include JSDoc comments for complex functions
7. Keep services pure and testable
8. Use proper HTTP status code handling

## Example Service Function

```typescript
// services/api/pokemonService.ts
export interface Pokemon {
  id: number;
  name: string;
  // ... other properties
}

export async function fetchPokemonList(limit: number, offset: number): Promise<Pokemon[]> {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    throw error;
  }
}
```
