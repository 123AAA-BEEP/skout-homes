# Design System

**IMPORTANT: This document defines our core design tokens and components styles.**

## Color System

### Brand Colors
```typescript
const colors = {
  primary: {
    50: '#f8fafc',   // Lightest - backgrounds
    100: '#f1f5f9',  // Light - hover states
    200: '#e2e8f0',  // Borders
    500: '#0f172a',  // Main - buttons, text
    600: '#0f172a',  // Darker - hover states
    700: '#020617',  // Darkest - active states
  },
  accent: {
    500: '#2563eb',  // Blue accent for CTAs
    600: '#1d4ed8',  // Hover state
  },
  neutral: {
    50: '#ffffff',   // White
    100: '#f8fafc',  // Off-white
    200: '#e2e8f0',  // Light gray
    300: '#cbd5e1',  // Borders
    600: '#475569',  // Body text
    700: '#334155',  // Strong text
    800: '#1e293b',  // Headings
  },
  success: '#16a34a',
  error: '#dc2626',
  warning: '#ca8a04',
}
```

## Typography

### Font Family
```typescript
const typography = {
  fontFamily: {
    sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'], // Modern, professional font
    display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
  }
}
```

### Type Scale
```typescript
const typeScale = {
  text: {
    xs: ['0.75rem', '1rem'],     // 12px
    sm: ['0.875rem', '1.25rem'], // 14px
    base: ['1rem', '1.5rem'],    // 16px
    lg: ['1.125rem', '1.75rem'], // 18px
    xl: ['1.25rem', '1.75rem'],  // 20px
  },
  display: {
    sm: ['1.5rem', '2rem'],      // 24px
    base: ['1.875rem', '2.25rem'],// 30px
    lg: ['2.25rem', '2.5rem'],   // 36px
    xl: ['3rem', '3rem'],        // 48px
  }
}
```

## Spacing

### System
```typescript
const spacing = {
  0: '0',
  1: '0.25rem',    // 4px
  2: '0.5rem',     // 8px
  3: '0.75rem',    // 12px
  4: '1rem',       // 16px
  6: '1.5rem',     // 24px
  8: '2rem',       // 32px
  12: '3rem',      // 48px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
}
```

## Component Styles

### Buttons
```typescript
const buttons = {
  base: 'rounded-md font-medium transition-all duration-200',
  sizes: {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  },
  variants: {
    primary: 'bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 shadow-sm hover:shadow-md',
    secondary: 'bg-primary-50 text-primary-500 hover:bg-primary-100 border border-primary-200',
    outline: 'border-2 border-accent-500 text-accent-500 hover:bg-accent-500 hover:text-white',
    ghost: 'text-primary-500 hover:bg-primary-50',
  }
}
```

### Forms
```typescript
const forms = {
  input: {
    base: 'w-full rounded-md border border-neutral-300 px-4 py-3 text-neutral-700 bg-white',
    focus: 'focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20',
    error: 'border-error focus:border-error focus:ring-error/20',
  },
  label: 'block text-sm font-semibold text-neutral-700 mb-2',
  helper: 'mt-2 text-sm text-neutral-600',
  error: 'mt-2 text-sm text-error',
  container: 'space-y-1.5'
}
```

### Cards
```typescript
const cards = {
  base: 'bg-white rounded-lg border border-neutral-200',
  variants: {
    elevated: 'shadow-sm hover:shadow-md transition-shadow duration-200',
    bordered: 'border-2',
    plain: 'border-none'
  },
  padding: {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }
}
```

### Container
```typescript
const container = {
  base: 'mx-auto px-4 sm:px-6 lg:px-8',
  sizes: {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
  }
}
```

## Shadows
```typescript
const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
}
```

## Animations
```typescript
const animations = {
  transition: {
    base: 'transition-all duration-200',
    slow: 'transition-all duration-300',
    fast: 'transition-all duration-150',
  },
  hover: {
    lift: 'hover:-translate-y-1',
    grow: 'hover:scale-105',
  }
}
```

## Responsive Breakpoints
```typescript
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
}
```

## Usage Guidelines

### Spacing
- Use spacing scale for margins, padding, and gaps
- Maintain consistent vertical rhythm
- Use relative units (rem) over pixels

### Typography
- Use type scale for all text elements
- Maintain consistent line heights
- Use appropriate font weights

### Colors
- Use semantic color names
- Maintain WCAG 2.1 contrast ratios
- Use color variables, not hard-coded values

### Components
- Follow component composition patterns
- Maintain consistent spacing
- Use design tokens for all values

---

*This document serves as our design system specification. All UI implementation must follow these guidelines for consistency.* 