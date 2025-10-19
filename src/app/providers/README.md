# Providers Directory

This directory contains React context providers and other global providers used throughout the application.

## Structure

- `QueryProvider.tsx` - TanStack Query client provider wrapper

## Purpose

Providers allow us to:
- Wrap the application with necessary context providers
- Keep the main layout clean and focused
- Centralize provider configuration
- Follow React best practices for context usage

## Usage

Providers are typically used in the root layout to wrap the entire application:

```tsx
// layout.tsx
import QueryProvider from "./providers/QueryProvider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
```

## Guidelines

When creating providers:

1. **Keep providers focused**: Each provider should handle one specific concern
2. **Use TypeScript**: Properly type all provider props and context values
3. **Handle client-side only code**: Use "use client" directive when needed
4. **Optimize performance**: Use proper memoization and avoid unnecessary re-renders
5. **Document configuration**: Include comments explaining configuration options
6. **Test providers**: Ensure providers work correctly in isolation
