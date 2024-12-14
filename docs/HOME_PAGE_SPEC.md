# Home Page Specification

## Core Components & Design Decisions

### Hero Section
- Clean, modern hero image with dark overlay
- Direct lead capture form
- No phone number (kept in header only)
- Focus on agent connection

### Featured Areas
- 6 key Toronto areas
- Interior/architectural photos only
- Modern, climate-appropriate imagery
- Hover effects and consistent sizing

### Trust Indicators
- Local Area Expert
- 24/7 Support
- Free Expert Consultation
- No arbitrary statistics

### Tools Section
- Land Transfer Tax Calculator
- Home Value Estimator
- Agent Finder
- Clean card layout with icons

### Header
- Logo with company name
- Main navigation
- Prominent "Call Now" button
- Mobile-responsive menu

## Design Principles to Maintain
1. Clean, modern aesthetic
2. Focus on user action (forms, calls)
3. Toronto-appropriate imagery
4. No misleading statistics
5. Clear value propositions
6. Mobile-first responsive design

## Component Structure
```
src/components/home/
├── Hero.tsx             # Main hero with lead form
├── FeaturedAreas.tsx    # Area showcase with interior images
├── TrustIndicators.tsx  # Core value propositions
├── ToolsSection.tsx     # Real estate tools
└── LocationGrid.tsx     # City/area grid
```

## Key Features to Preserve
1. Lead capture form in hero
2. Area showcases with appropriate imagery
3. Clear call-to-action buttons
4. Trust-building elements
5. Tool accessibility
6. Mobile responsiveness

## Allowed Modifications
- Adding new navigation links
- Updating images (maintaining style guide)
- Adding new tools/features
- Enhancing existing components
- SEO improvements

## Restricted Changes
- Removing core components
- Changing the overall layout structure
- Modifying the established visual style
- Adding misleading statistics
- Removing lead capture functionality 