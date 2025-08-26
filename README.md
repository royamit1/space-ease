# SpaceEase

**A parking management platform that connects parking spot owners with drivers**

## 🎯 Overview

SpaceEase is a parking management application that allows property owners to list their parking spaces and drivers to find and book available spots. The platform provides a simple way to manage parking rentals with real-time availability updates.

### The Problem We Solve

- **Drivers struggle to find parking** in urban areas
- **Property owners have unused parking spaces** that could generate income
- **Need for a simple platform** to connect parking supply with demand

### Why This Project Stands Out

- **Production Deployed**: Live at [space-ease.vercel.app](https://space-ease.vercel.app)
- **Real-time Updates**: Live availability updates for parking spots
- **Modern Tech Stack**: Next.js, TypeScript, PostgreSQL, Tailwind CSS
- **Responsive Design**: Works well on both desktop and mobile devices
- **User Authentication**: Google OAuth integration with Supabase
- **Basic Business Logic**: Parking spot management and rental system

## 🛠️ Technology Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) with App Router
- **Language**: [TypeScript 5.3](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) with custom components
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) for client state
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives, [Framer Motion](https://www.framer.com/motion/) for animations

### Backend
- **Runtime**: Node.js with Next.js API routes
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [Supabase Auth](https://supabase.com/auth) with Google OAuth
- **Data Fetching**: [TanStack Query](https://tanstack.com/query) for server state

### Infrastructure
- **Hosting**: [Vercel](https://vercel.com/) with automatic deployments
- **Database**: [Supabase](https://supabase.com/) PostgreSQL hosting
- **Maps**: [Google Maps Platform](https://developers.google.com/maps) integration
- **Code Quality**: ESLint, Prettier, TypeScript strict mode

## 💡 Key Features

### Core Functionality
- **Parking Spot Discovery**: Browse available parking spots on an interactive map
- **User Authentication**: Sign up and login with Google OAuth
- **Spot Management**: Create, edit, and manage parking spot listings
- **Rental System**: Basic booking and rental management
- **Image Upload**: Support for multiple images per parking spot

### User Experience
- **Interactive Maps**: Google Maps integration with custom parking markers
- **Responsive Design**: Mobile-friendly interface
- **Search and Filtering**: Find spots by location and availability
- **Dark/Light Theme**: Theme switching capability

## 🚀 How to Use SpaceEase

### For First-Time Visitors (No Signup Required)

1. **Explore the Interface**: Visit [space-ease.vercel.app](https://space-ease.vercel.app)
2. **Browse Available Spots**: Use the interactive map to see parking locations
3. **Try the Search**: Use filters to find spots by location or availability
4. **View Spot Details**: Click on any parking spot to see photos and information

### For Property Owners (Signup Required)

1. **Create Account**: Sign up with Google OAuth
2. **List Your Space**: Upload photos, set pricing, define availability
3. **Manage Listings**: Edit and update your parking spot information
4. **View Bookings**: See rental requests and manage your spots

### For Drivers (Signup Required)

1. **Find Parking**: Search by location or browse the map
2. **Book a Spot**: Reserve available parking spots
3. **Manage Rentals**: View your active and past parking sessions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL database
- Google Maps API key
- Supabase account

### 1. Clone & Install
```bash
git clone https://github.com/royamit1/space-ease.git
cd space-ease
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env.local
```

Fill in your environment variables:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/space_ease"
DIRECT_URL="postgresql://username:password@localhost:5432/space_ease"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-google-maps-api-key"
```

### 3. Database Setup
```bash
npx prisma migrate dev
npx prisma generate
```

### 4. Start Development
```bash
npm run dev
# Open http://localhost:3000
```

## 🏗️ Project Architecture

### Database Schema
- **User Management**: Authentication and basic profile information
- **Parking Spots**: Location, pricing, availability, and images
- **Rental System**: Basic booking and rental tracking
- **Images**: Storage for parking spot photos

### API Structure
- **RESTful Routes**: Next.js API routes for CRUD operations
- **Authentication**: Supabase Auth integration
- **File Upload**: Basic image management for parking spots

### Frontend Architecture
- **Component Library**: Reusable UI components with TypeScript
- **State Management**: Zustand for client state, TanStack Query for server state
- **Routing**: Next.js App Router
- **Styling**: Tailwind CSS with custom components

## 🎨 Testing & Quality

### Code Quality Tools
- **TypeScript**: Strict configuration for type safety
- **ESLint**: Code linting with Next.js and React rules
- **Prettier**: Consistent code formatting

### Development Commands
```bash
# Run linting
npm run lint

# Build verification
npm run build
```

## 🚀 Deployment

### Production Deployment
- **Automatic**: Connected to Vercel with GitHub integration
- **Database**: Supabase PostgreSQL hosting
- **Environment**: Production variables configured in Vercel

## See It In Action

### Key User Flows

**Note**: The demonstrations below showcase the user experience. These are GIFs that may take a moment to load.

#### 1. Create a Parking Spot (For Property Owners)
*Property owners can list their parking spaces with photos, pricing, and availability*  

![Create Parking Flow](https://github.com/user-attachments/assets/bcd09ad3-4a60-4736-af0a-56d3f672e91f)

#### 2. Find & Rent Parking (For Drivers)
*Drivers can search and book available parking spots*  

![Rent Parking Flow](https://github.com/user-attachments/assets/9dbebfe8-51c2-4795-ad29-21de04260820)

#### 3. Smart Search & Filtering
*Search functionality with location and availability filters*  

![search-filters-demo](https://github.com/user-attachments/assets/b96d678f-aaed-4da5-b3b9-fd0737fd2548)

#### 4. Manage Your Rentals
*Basic rental management for both owners and renters*  

![Rental Management](https://github.com/user-attachments/assets/d6528e74-2f80-43a3-a35d-ed750477345f)

#### 5. Financial Dashboard
*Basic wallet system for tracking transactions*  

![Wallet System](https://github.com/user-attachments/assets/8a93107d-bf7a-48cd-a2cc-44a5e6a666bf)

---

## Contributors

### Roy Amit - [@royamit1](https://github.com/royamit1)
### Roi Nir - [@roini7](https://github.com/roini7)

---

## 📚 Additional Resources

- **Development Blog**: [Space-Ease – Rent Your Space, Park with Ease](https://dev.to/roy_amit/space-ease-rent-your-space-park-with-ease-21bg)
- **Project Video**: [YouTube Demo](https://www.youtube.com/watch?v=q1-8qjWmIoQ&t=1s&ab_channel=RoiNir)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Star this repository if you found it helpful!**

**[Try SpaceEase Now](https://space-ease.vercel.app)**

**Contributions are always welcome!**

**Questions? Open an issue or reach out!**

</div>
