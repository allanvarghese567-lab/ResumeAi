# Deployment Guide

## Deployment Environments

### Development (Local)
- `.env.local` - Use test API keys
- Port: 3000
- No deployment needed

### Staging
- `.env.staging` - Use staging API keys
- Server: Vercel, Render, or self-hosted
- For QA and testing

### Production
- `.env.production` - Use live API keys
- Server: Vercel, AWS, Render, or self-hosted
- Critical - requires monitoring and backups

## Deploying to Vercel (Recommended)

### Step 1: Connect GitHub
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Authorize Vercel

### Step 2: Import Project
1. Click "New Project"
2. Select your GitHub repository
3. Click "Import"

### Step 3: Configure Environment Variables
1. Go to Project Settings → Environment Variables
2. Add each key from `.env.production.example`:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `OPENAI_API_KEY`
   - `NEXT_PUBLIC_APP_URL` (your production domain)

### Step 4: Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Access your app at the provided URL

## Building for Production

### Local Build
```bash
# Build the application
npm run build

# Start production server
npm run start
```

### CI/CD Build
```bash
# In your CI/CD pipeline
node --version  # Verify Node.js
npm ci          # Clean install
npm run build   # Build
npm run lint    # Lint
npm run type-check  # Type check
```

## Environment-Specific Builds

### Production Build
```bash
# Set environment and build
NODE_ENV=production npm run build

# Start server
npm run start
```

### Staging Build
```bash
# Use staging environment
NEXT_PUBLIC_APP_URL=https://staging.yourdomain.com npm run build
```

## Database Setup for Production

### Supabase Production Database

1. Create separate Supabase project for production
2. Run migrations:
   ```sql
   -- Create users table
   CREATE TABLE users (
     id UUID PRIMARY KEY,
     email VARCHAR UNIQUE NOT NULL,
     name VARCHAR,
     image VARCHAR,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );

   -- Create resumes table
   CREATE TABLE resumes (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
     title VARCHAR NOT NULL,
     template VARCHAR DEFAULT 'modern',
     data JSONB,
     completeness INTEGER DEFAULT 0,
     ats_score INTEGER,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );
   ```

3. Set up backups in Supabase dashboard
4. Enable row-level security (RLS)

## Monitoring & Logging

### Set Up Sentry (Error Tracking)

```bash
npm install --save-dev @sentry/nextjs
```

Add to environment variables:
```env
SENTRY_AUTH_TOKEN=your_token
SENTRY_PROJECT_ID=your_project_id
```

### Set Up Google Analytics

Add to `.env.production`:
```env
NEXT_PUBLIC_GA_ID=G_YOUR_MEASUREMENT_ID
```

## Security Checklist

- [ ] SSL/TLS certificate enabled (HTTPS)
- [ ] Environment variables properly secured
- [ ] Database backups automated
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] API keys rotated
- [ ] Security headers set
- [ ] Monitoring enabled
- [ ] Error tracking enabled
- [ ] Database has row-level security

## Performance Optimization

### Image Optimization
```typescript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src={resume.personalInfo.profilePhoto}
  alt="Profile"
  width={128}
  height={128}
  className="rounded-full"
/>
```

### Code Splitting
- Next.js automatically code-splits at page level
- Use dynamic imports for heavy components:
  ```typescript
  const HeavyComponent = dynamic(() => import('./Heavy'));
  ```

### Caching
- Set cache headers for static assets
- Use Next.js ISR (Incremental Static Regeneration)

## Rollback Procedure

### Vercel Rollback
1. Go to Deployments
2. Find previous deployment
3. Click "Promote to Production"

### Manual Rollback
```bash
# Check git log
git log --oneline

# Revert to previous commit
git revert <commit-hash>

# Redeploy
git push origin main
```

## Maintenance

### Regular Tasks
- Daily: Check error logs
- Weekly: Review performance metrics
- Monthly: Update dependencies
- Quarterly: Security audit

### Update Dependencies
```bash
# Check outdated packages
npm outdated

# Update all
npm update

# Review and test changes
npm run build
npm run test

# Deploy after testing
```

## Cost Optimization

### Vercel
- Free tier includes sufficient bandwidth for development
- Pro plan: $20/month
- Enterprise: Custom pricing

### Supabase
- Free tier: 500MB storage
- Pro: $25/month for 8GB storage
- Start with Pro for production

### OpenAI
- Pay-as-you-go pricing
- GPT-4o-mini: $0.15 per 1M input tokens
- Set usage limits in dashboard

---

**For more help, see the README and INSTALLATION guides.**
