# Petra Digital Agency Website Specification

## 1. Project Overview
- **Project Name**: Petra Digital Agency Website
- **Type**: Single-page marketing website
- **Core Functionality**: High-converting agency landing page showcasing services, portfolio, and credibility badges
- **Target Users**: Potential clients seeking branding, web design, and social media services

---

## 2. UI/UX Specification

### Layout Structure
- **Header**: Fixed navigation with logo and menu links
- **Hero Section**: Split layout (50/50) - text left, image right
- **About Section**: Reverse split (image left, content right)
- **Services Section**: Horizontal card row with featured orange card
- **Portfolio Section**: 2x2 grid layout
- **Footer**: Simple footer with contact info

### Responsive Breakpoints
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

### Visual Design

#### Color Palette
- **Background**: #FFFFFF (White)
- **Primary Text**: #1A1A1A (Dark Grey)
- **Secondary Text**: #4A4A4A (Medium Grey)
- **Accent/Orange**: #FF6B35 (Vibrant Orange)
- **Accent Hover**: #E85A2A (Darker Orange)
- **Card Background**: #FFFFFF
- **Card Border**: #E5E5E5 (Light Grey)
- **Section Background**: #FAFAFA (Off-white)

#### Typography
- **Primary Font**: "Outfit" (Google Fonts) - Modern geometric sans-serif
- **Headings**: 
  - H1: 56px, font-weight 700
  - H2: 42px, font-weight 600
  - H3: 24px, font-weight 600
- **Body**: 16px, font-weight 400, line-height 1.6
- **Small Text**: 14px

#### Spacing System
- **Section Padding**: 100px vertical, 5% horizontal
- **Card Padding**: 32px
- **Element Gap**: 24px
- **Small Gap**: 12px

#### Visual Effects
- **Card Shadows**: 0 4px 24px rgba(0,0,0,0.08)
- **Hover Shadows**: 0 8px 32px rgba(0,0,0,0.12)
- **Border Radius**: 16px (cards), 50px (pills/badges)
- **Transitions**: 0.3s ease all

### Components

#### Navigation
- Logo (text-based "Petra Digital")
- Menu items: Home, About, Services, Portfolio, Contact
- Orange CTA button "Get Started"
- Sticky on scroll with white background

#### Hero Section
- Headline: "Building Your Brand on a Solid Foundation"
- Subheadline: "Full Service Branding, Web & Management"
- CTA Button: "Start Your Project" (Orange)
- Team image (placeholder from picsum)
- Floating pill badge: "150+ Satisfied Clients" (Orange background, white text)

#### About Section
- Image on left with decorative orange L-shaped element (CSS)
- Floating card: "5+ Years Experience" (Orange background)
- Three value propositions with icons:
  - Transparency
  - Strategy-First
  - Built to Scale

#### Services Section
- First card: Solid Orange background, white text "Our Expertise"
- Service cards (white with orange accent):
  - Branding: "Core Identity €350" / "Market Authority €650"
  - Web Design: "Digital Presence €850" / "Growth Engine €1,350"
  - Social Media: "Steady Awareness €190/mo" / "Rapid Scale €390/mo"

#### Portfolio Section
- Section title: "Our Work"
- 2x2 Grid of project cards:
  - Gosign
  - Belvilla
  - Opex
  - Pets Deli
- Each card: Image + Project name

#### Footer
- Logo
- Quick links
- Contact info
- Copyright

---

## 3. Functionality Specification

### Core Features
- Fully responsive design adapting to all screen sizes
- Smooth scroll navigation
- Hover effects on all interactive elements
- Floating badge animations
- Card hover lift effects

### User Interactions
- Navigation links scroll to sections smoothly
- Buttons have hover/active states
- Cards lift on hover with shadow enhancement
- Images have subtle zoom on hover

### Edge Cases
- All images use reliable placeholder services
- Fallback fonts if Google Fonts fail to load
- Graceful degradation for older browsers

---

## 4. Acceptance Criteria

### Visual Checkpoints
- [ ] White background throughout
- [ ] Dark grey text (#1A1A1A)
- [ ] Vibrant orange (#FF6B35) on all buttons and highlights
- [ ] Split-layout hero with image on right
- [ ] Floating pill badge visible on hero image
- [ ] Orange L-shaped decorative element on about section image
- [ ] "5+ Years Experience" floating card on about section
- [ ] Services cards with correct pricing
- [ ] Portfolio grid with 4 project cards
- [ ] Fully responsive on mobile/tablet

### Functional Checkpoints
- [ ] Smooth scroll navigation works
- [ ] All hover effects functioning
- [ ] No broken images
- [ ] Clean code without console errors
