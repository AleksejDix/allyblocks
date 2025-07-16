# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

@aleksejdix/allyblocks is an accessible React component library built on top of shadcn/ui with comprehensive Storybook integration. The library uses React 19, TypeScript, Vite, and Tailwind CSS v4.

## Key Commands

### Development
- `npm run dev` - Start Vite dev server
- `npm run storybook` - Start Storybook on port 6006

### Testing
- `npm test` - Run all tests (unit + Storybook tests)
- `npm test -- src/components/atoms/Button/Button.stories.tsx` - Run tests for a specific component
- `npm run test:storybook` - Run only Storybook interaction tests
- `npm run test:unit` - Run only unit tests
- `npm run test:coverage` - Run all tests with coverage
- `npm run test:related` - Run tests related to changed files

### Building & Quality
- `npm run build` - Build the library for production
- `npm run lint` - Run OXlint (fast Rust-based linter)
- `npm run lint:format` - Format code with Prettier
- `npm run check:bundle` - Analyze bundle size with visualizer

## Architecture

### Component Structure
Components follow Atomic Design principles:
- **atoms/** - Basic building blocks (Button, Input, Label)
- **molecules/** - Composed components (Form fields, Card, Dialog)
- **organisms/** - Complex components (DataGrid, AuthForm, Accordion)
- **templates/** - Page-level compositions
- **pages/** - Full page implementations

Each component typically has:
- `Component.tsx` - Main component implementation
- `Component.stories.tsx` - Storybook stories with interaction tests
- `Component.types.ts` - TypeScript interfaces
- `Component.variants.ts` - CVA (class-variance-authority) style variants
- `index.ts` - Public exports

### Testing Architecture
The project uses Vitest with two test workspaces:
1. **Storybook tests** - Browser-based interaction tests using Playwright
   - Tests run in real browser environment (Chromium)
   - Locale set to 'de-DE' for i18n testing
   - Tests use Testing Library patterns
2. **Unit tests** - Node-based unit tests for utilities

### Key Technologies
- **Styling**: Tailwind CSS v4 with CVA for variant management
- **State**: React Hook Form, Tanstack Query, nuqs (URL state)
- **UI Primitives**: Radix UI components for accessibility
- **Icons**: Lucide React
- **i18n**: i18next with react-i18next
- **Bundling**: Vite with library mode

### Important Patterns
1. **Portal Rendering**: Many components (Dialog, Select, Dropdown) render in portals. Use `screen` from Testing Library instead of `within(canvasElement)` for portal content.

2. **Component Composition**: Components use compound pattern with context:
   ```tsx
   <Dialog>
     <DialogTrigger />
     <DialogContent>
       <DialogHeader />
       <DialogBody />
     </DialogContent>
   </Dialog>
   ```

3. **Accessibility**: All components follow ARIA patterns and include keyboard navigation support.

4. **CVA Variants**: Style variants are defined using class-variance-authority:
   ```tsx
   const buttonVariants = cva('base-classes', {
     variants: {
       size: { sm: '...', md: '...' },
       variant: { primary: '...', secondary: '...' }
     }
   })
   ```

## Project Vision
This library aims to provide a more complete set of accessible components than Radix UI. Key differentiators:
- **Listbox Component**: Custom implementation filling a gap in Radix UI's offerings
- **Complete Accessibility**: Full ARIA pattern implementations
- **Better Developer Experience**: Comprehensive TypeScript support and consistent APIs

## Known Issues & In Progress
- **Listbox component**: Currently incomplete - needs to be built as a full-featured alternative to missing Radix component
  - 3 failing tests related to keyboard navigation
  - Requires implementation of ARIA 1.2 listbox pattern
  - Should support single/multi-select, keyboard navigation, typeahead
- CSS custom properties testing is unreliable in test environment
- Some components use `data-disabled` instead of `disabled` attribute

## Testing Best Practices
1. Always run tests after making changes
2. For portal-rendered content, use `screen` instead of `within(canvasElement)`
3. When multiple elements have the same role, use `getAllByRole` and index
4. For exact text matching in forms, use `findByText` with exact strings
5. Use `tripleClick` for selecting all text in inputs (not `selectAll`)

## File Imports
The project uses TypeScript path alias `@/` for `src/` directory:
```tsx
import { Button } from '@/components/atoms/Button'
import { cn } from '@/lib/utils'
```