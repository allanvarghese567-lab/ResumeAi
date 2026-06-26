# Installation Instructions

## Prerequisites

✅ **Node.js 18+** - Download from [nodejs.org](https://nodejs.org/)
✅ **npm 9+** - Comes with Node.js
✅ **Git** - For version control

## Verify Installation

### Check Node.js and npm

```bash
# Check Node.js version (should be 18.0.0 or higher)
node --version
# or
node -v

# Check npm version (should be 9.0.0 or higher)
npm --version
# or
npm -v
```

**Expected output:**
```
v18.17.0 (or higher)
9.6.7 (or higher)
```

## Installation Steps

### Option 1: Using Installation Script (Recommended)

**On macOS/Linux:**
```bash
bash scripts/install.sh
```

**On Windows:**
```cmd
scripts\install.bat
```

### Option 2: Manual Installation

#### Step 1: Install Dependencies

```bash
npm install
```

This command will:
- Read `package.json`
- Download all dependencies to `node_modules/`
- Create `package-lock.json` with exact versions
- Install 50+ packages (React, Next.js, TypeScript, etc.)

**Expected time:** 2-5 minutes depending on internet speed

**Sample output:**
```
added 520 packages, and audited 521 packages in 1m42s

130 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

#### Step 2: Verify Installation

```bash
# Check if node_modules directory was created
ls node_modules
# or on Windows
dir node_modules

# Should show many packages like:
# react, next, tailwindcss, @clerk/nextjs, etc.
```

#### Step 3: Configure Environment Variables

**For Development:**
```bash
cp .env.local.example .env.local
```

**For Staging:**
```bash
cp .env.staging.example .env.staging
```

**For Production:**
```bash
cp .env.production.example .env.production
```

Then edit the appropriate file and add your keys.

#### Step 4: Run Development Server

```bash
npm run dev
```

**Expected output:**
```
> ai-resume-builder@1.0.0 dev
> next dev

  ▲ Next.js 15.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2.1s
```

#### Step 5: Open in Browser

Visit: **http://localhost:3000**

## Environment Configuration

### Development (.env.local)

Use test/development API keys:

```bash
cp .env.local.example .env.local
```

**Key Configuration:**
```env
# Clerk (use test keys)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase (use development database)
NEXT_PUBLIC_SUPABASE_URL=https://dev-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# OpenAI
OPENAI_API_KEY=sk-proj-...

# Local app URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Staging (.env.staging)

Use staging API keys for QA:

```bash
cp .env.staging.example .env.staging
```

**Deploy to Staging:**
```bash
NEXT_ENV=staging npm run build
```

### Production (.env.production)

Use production API keys only:

```bash
cp .env.production.example .env.production
```

**Key Configuration:**
```env
# Clerk (use live keys)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...

# Supabase (use production database)
NEXT_PUBLIC_SUPABASE_URL=https://prod-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# OpenAI
OPENAI_API_KEY=sk-proj-...

# Production app URL
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Security settings
NEXT_PUBLIC_ENFORCE_HTTPS=true
RATE_LIMIT_ENABLED=true
```

**Deploy to Production:**
```bash
NEXT_ENV=production npm run build && npm run start
```

## Obtaining API Keys

### Clerk Authentication

1. Go to [dashboard.clerk.com](https://dashboard.clerk.com)
2. Create a new application
3. Copy your **Publishable Key** and **Secret Key**
4. Add to `.env.local`

### Supabase Database

1. Go to [app.supabase.com](https://app.supabase.com)
2. Create new project
3. Go to **Settings → API**
4. Copy **Project URL** and **Anon Public Key**
5. Go to **Settings → Service Role Secret** for service role key
6. Add to `.env.local`

### OpenAI API

1. Go to [platform.openai.com](https://platform.openai.com)
2. Create API key in **API keys** section
3. Copy the key
4. Add to `.env.local`

## Dependency Breakdown

### Core Framework (120 KB)
- `next@^15.0.0` - React framework
- `react@^19.0.0` - UI library
- `react-dom@^19.0.0` - DOM rendering
- `typescript@^5.3.3` - Type safety

### Styling (80 KB)
- `tailwindcss@^3.3.6` - Utility-first CSS
- `tailwindcss-animate@^1.0.6` - Animation utilities
- `class-variance-authority@^0.7.0` - Component variants

### Authentication & Database (150 KB)
- `@clerk/nextjs@^5.0.0` - User authentication
- `@supabase/supabase-js@^2.38.4` - Database client

### AI & APIs (150 KB)
- `openai@^4.52.0` - OpenAI API client

### Forms & Validation (70 KB)
- `react-hook-form@^7.48.0` - Form handling
- `zod@^3.22.4` - Schema validation

### Export (350 KB)
- `jspdf@^2.5.1` - PDF generation
- `html2canvas@^1.4.1` - HTML to canvas

**Total: ~700 MB (includes all node_modules)**

## Common Issues & Solutions

### Issue: "Node.js not found"

**Solution:**
1. Download and install Node.js from [nodejs.org](https://nodejs.org/)
2. Verify installation: `node -v`
3. Restart your terminal/IDE
4. Try npm install again

### Issue: "npm ERR! code ERESOLVE"

**Solution:**
```bash
npm install --legacy-peer-deps
```

### Issue: "Permission denied" on macOS/Linux

**Solution:**
```bash
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

### Issue: "Module not found" after installation

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 3000 already in use

**Solution:**
```bash
npm run dev -- -p 3001
```

### Issue: Environment variables not loading

**Solution:**
```bash
# Ensure file is named correctly
ls -la | grep env

# Restart dev server
Ctrl+C
npm run dev
```

## Verify Installation Success

```bash
# Check TypeScript
npx tsc --version

# Check Next.js
npm list next

# Build check
npm run build

# Type check
npm run type-check
```

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Create `.env.local` file: `cp .env.local.example .env.local`
3. ✅ Add your API keys to `.env.local`
4. ✅ Start dev server: `npm run dev`
5. ✅ Open http://localhost:3000
6. ✅ Sign up with Clerk
7. ✅ Create your first resume!

## Available Scripts

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript checks
npm run format           # Format with Prettier
```

---

**Happy coding! 🚀**
