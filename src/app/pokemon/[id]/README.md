# Pokemon Detail Route (`[id]`)

This directory contains the dynamic route for individual Pokemon detail pages.

## Files

### `page.tsx`
The main Pokemon detail page component that:
- Receives the Pokemon ID as a dynamic parameter
- Fetches Pokemon data from PokeAPI on the server
- Renders comprehensive Pokemon information
- Handles server-side rendering for optimal SEO and performance

**Key Features:**
- Server Component (no "use client" directive)
- Async function for data fetching
- TypeScript with proper type definitions
- Error handling for invalid Pokemon IDs
- Responsive design

### `loading.tsx`
Loading state component that:
- Displays while the Pokemon data is being fetched
- Shows skeleton loading animation
- Automatically used by Next.js during server-side rendering
- Provides smooth user experience

**Features:**
- Skeleton loading animation
- Matches the layout of the actual Pokemon detail page
- Responsive design
- Fast loading state

### `not-found.tsx`
Error page component that:
- Displays when a Pokemon with the given ID doesn't exist
- Provides user-friendly error message
- Includes navigation back to the Pokemon list
- Handles 404 errors gracefully

**Features:**
- Custom 404 page design
- Clear error messaging
- Navigation options
- Consistent styling with the rest of the app

## Route Parameters

The `[id]` parameter accepts:
- Numeric Pokemon IDs (1, 2, 3, etc.)
- String representations of numbers
- Invalid IDs will trigger the `not-found.tsx` page

## Data Fetching

The page fetches data from:
- **Primary API**: PokeAPI (https://pokeapi.co/api/v2/pokemon/{id})
- **Method**: Server-side fetching with `fetch()`
- **Caching**: Uses Next.js built-in caching for performance

## Error Handling

1. **Invalid Pokemon ID**: Shows `not-found.tsx`
2. **API Errors**: Handled gracefully with error boundaries
3. **Network Issues**: Fallback to error state
4. **Type Errors**: TypeScript prevents many runtime errors

## Performance Optimizations

- Server-side rendering for faster initial load
- Automatic code splitting
- Image optimization with Next.js Image component
- Efficient data fetching patterns
- Proper error boundaries

## Usage Examples

```
/pokemon/1     → Bulbasaur details
/pokemon/25    → Pikachu details
/pokemon/999   → Invalid ID → not-found page
```
