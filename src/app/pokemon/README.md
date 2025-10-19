# Pokemon Directory

This directory contains the Pokemon-related pages and routes in the application.

## Structure

- `[id]/` - Dynamic route for individual Pokemon detail pages

## Route Structure

The Pokemon directory follows Next.js App Router conventions:

- `pokemon/[id]/page.tsx` - Server-side rendered Pokemon detail page
- `pokemon/[id]/loading.tsx` - Loading state for Pokemon detail page
- `pokemon/[id]/not-found.tsx` - 404 page for Pokemon not found

## Features

### Pokemon Detail Page (`[id]/page.tsx`)
- Server-side rendered for better SEO and performance
- Fetches Pokemon data from PokeAPI
- Displays comprehensive Pokemon information including:
  - Basic stats (name, ID, height, weight)
  - Sprites and images
  - Types and abilities
  - Base stats
  - Evolution chain information

### Loading State (`[id]/loading.tsx`)
- Shows skeleton loading animation while Pokemon data is being fetched
- Provides better user experience during data loading
- Automatically displayed by Next.js during server-side rendering

### Error Handling (`[id]/not-found.tsx`)
- Custom 404 page for Pokemon that don't exist
- User-friendly error message
- Navigation back to Pokemon list

## Usage

Navigate to a Pokemon detail page using:
```
/pokemon/{pokemon-id}
```

Example:
- `/pokemon/1` - Shows details for Bulbasaur
- `/pokemon/25` - Shows details for Pikachu

## Technical Details

- Uses Next.js dynamic routing with `[id]` parameter
- Server Components for optimal performance
- TypeScript for type safety
- Responsive design for mobile and desktop
- Error boundaries for graceful error handling

## Future Enhancements

- Add Pokemon comparison feature
- Implement Pokemon search functionality
- Add favorite Pokemon feature
- Include Pokemon evolution chain visualization
