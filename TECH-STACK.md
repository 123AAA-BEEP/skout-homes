# Technical Specification & Design System

**IMPORTANT: This document outlines our technical architecture and design guidelines.**

## Tech Stack

### Core Technologies
- Next.js 14 (App Router)
- React 18
- TypeScript
- TailwindCSS
- Vercel Hosting
- GitHub Version Control

### Key Dependencies
```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "react-dom": "18.x",
    "@vercel/analytics": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest"
  },
  "devDependencies": {
    "typescript": "5.x",
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "autoprefixer": "latest",
    "postcss": "latest",
    "tailwindcss": "latest",
    "eslint": "latest",
    "eslint-config-next": "latest"
  }
}
```

## Design System

### Colors
```typescript
// tailwind.config.ts
const colors = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  success: '#22c55e',
  error: '#ef4444',
}
```

### Typography
```typescript
const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
  },
  fontSize: {
    h1: ['2.5rem', '1.2'],
    h2: ['2rem', '1.3'],
    h3: ['1.5rem', '1.4'],
    body: ['1rem', '1.5'],
    small: ['0.875rem', '1.5'],
  }
}
```

### Spacing
```typescript
const spacing = {
  container: {
    padding: '1rem',
    maxWidth: '1280px',
  },
  section: {
    padding: '4rem 0',
  }
}
```

## Component Architecture

### Layout Components
```typescript
// app/components/layout/Container.tsx
export const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {children}
  </div>
)
```

### Core Components
```typescript
// Button.tsx
type ButtonVariant = 'primary' | 'secondary' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}
```

### Form Components
```typescript
// LeadForm.tsx
interface LeadFormProps {
  intent: string
  location: string
  onSubmit: (data: FormData) => Promise<void>
}
```

## Page Structure

### Template Layout
```typescript
// app/[city]/[neighbourhood]/[intent]/page.tsx
export default function LocationPage({
  params: { city, neighbourhood, intent }
}: {
  params: { city: string; neighbourhood: string; intent: string }
}) {
  return (
    <>
      <Header />
      <Hero />
      <LeadForm />
      <MainContent />
      <FAQ />
      <Footer />
    </>
  )
}
```

## Performance Optimizations

### Image Strategy
```typescript
// next.config.js
const nextConfig = {
  images: {
    domains: ['assets.vercel.com'],
    formats: ['image/avif', 'image/webp'],
  }
}
```

### Loading States
```typescript
// app/loading.tsx
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-64 bg-gray-200 rounded-lg" />
    </div>
  )
}
```

## SEO Implementation

### Metadata Configuration
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
}
```

### Dynamic Metadata
```typescript
// app/[city]/[neighbourhood]/[intent]/page.tsx
export async function generateMetadata({
  params,
}: {
  params: { city: string; neighbourhood: string; intent: string }
}): Promise<Metadata> {
  return {
    title: `${intent} in ${neighbourhood}, ${city} | Expert Real Estate Help`,
    description: `Connect with top real estate agents for ${intent} in ${neighbourhood}. Get free consultation and local expertise.`,
  }
}
```

## Development Guidelines

### Code Organization
```
src/
├── app/
│   ├── [city]/
│   │   └── [neighbourhood]/
│   │       └── [intent]/
│   │           └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   ├── forms/
│   │   └── ui/
│   ├── lib/
│   │   └── utils.ts
│   └── layout.tsx
```

### Styling Principles
1. Use TailwindCSS utility classes
2. Maintain consistent spacing
3. Mobile-first approach
4. Minimal custom CSS
5. Component-based design

### Performance Requirements
- Lighthouse Score: 90+ all categories
- Core Web Vitals compliance
- First Contentful Paint < 1.2s
- Time to Interactive < 2.5s

### SEO Requirements
- Server-side rendering
- Dynamic metadata
- Semantic HTML
- Structured data
- XML sitemap
- Robots.txt

---

*This document serves as our technical blueprint. All implementation must align with these specifications.* 