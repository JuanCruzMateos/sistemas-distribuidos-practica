# Hooks Directory

This directory contains custom React hooks that encapsulate reusable logic and state management.

## Purpose

Custom hooks allow us to:
- Extract component logic into reusable functions
- Share stateful logic between components
- Keep components clean and focused on rendering
- Centralize data fetching and state management logic

## Structure

Currently empty - hooks will be added as needed for:
- Data fetching with TanStack Query
- State management
- API calls
- Form handling
- Local storage operations

## Naming Conventions

- Use `use` prefix for all hook names
- Use descriptive names that indicate the hook's purpose
- Group related hooks in subdirectories if needed

## Example Structure (Future)

```
hooks/
├── api/
│   ├── usePokemonList.ts
│   ├── usePokemonDetail.ts
│   └── usePokemonSearch.ts
├── state/
│   ├── usePagination.ts
│   └── useFilters.ts
└── ui/
    ├── useModal.ts
    └── useToast.ts
```

## Guidelines

When creating custom hooks:

1. Always start with `use` prefix
2. Return an object with descriptive property names
3. Include proper TypeScript types
4. Handle loading, error, and success states
5. Use TanStack Query for data fetching
6. Keep hooks focused on a single responsibility
7. Include JSDoc comments for complex logic
