# Dependency Management

## Package.json Structure

```json
{
  "name": "ai-resume-builder",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": { ... },
  "devDependencies": { ... }
}
```

## Scripts Available

### Development
```bash
# Start development server with hot reload
npm run dev

# Watch mode for TypeScript
npm run type-check
```

### Production
```bash
# Build optimized production bundle
npm run build

# Start production server
npm run start
```

### Code Quality
```bash
# Run ESLint to check code quality
npm run lint

# Type check entire project
npm run type-check

# Format code with Prettier
npm run format
```

## Managing Dependencies

### Install Specific Package
```bash
# Install and save to dependencies
npm install package-name

# Install and save to devDependencies
npm install --save-dev package-name

# Install specific version
npm install package-name@1.2.3
```

### Update Dependencies
```bash
# Check for outdated packages
npm outdated

# Update specific package
npm update package-name

# Update all packages
npm update

# Update to latest major version
npm install package-name@latest
```

### Remove Dependencies
```bash
# Uninstall package
npm uninstall package-name

# Uninstall and remove from package.json
npm uninstall --save package-name
```

## Package Sizes

| Package | Size | Purpose |
|---------|------|----------|
| react | ~40kb | UI library |
| next | ~80kb | Framework |
| tailwindcss | ~30kb | CSS utility |
| openai | ~50kb | AI API client |
| @clerk/nextjs | ~100kb | Authentication |
| zod | ~25kb | Validation |
| react-hook-form | ~20kb | Form handling |
| jspdf | ~200kb | PDF export |
| html2canvas | ~150kb | Canvas rendering |
| **Total** | **~700MB** | **All node_modules** |

## Lock File (package-lock.json)

- Automatically created by npm
- Records exact versions of all dependencies
- Ensures reproducible installs
- Always commit to version control
- Don't manually edit

## Node Modules Directory

- Contains ~500+ packages
- Size: ~700MB
- Generated from package-lock.json
- Never commit to git (in .gitignore)
- Can be regenerated with `npm install`

## Best Practices

✅ **Do:**
- Keep dependencies up to date
- Use specific versions in package.json
- Review dependency licenses
- Use lock file for reproducibility
- Regularly audit security

❌ **Don't:**
- Manually edit package-lock.json
- Commit node_modules to git
- Install packages globally unless needed
- Use outdated/unmaintained packages
- Ignore security warnings

## Security Auditing

```bash
# Check for security vulnerabilities
npm audit

# Fix automatically if possible
npm audit fix

# Show detailed audit report
npm audit --detailed
```

## Environment-Specific Scripts

### Development
```bash
npm run dev
```

### Staging
```bash
NEXT_ENV=staging npm run build
```

### Production
```bash
NEXT_ENV=production npm run build && npm run start
```

## Performance Tips

```bash
# Use npm ci for faster CI/CD installations
npm ci

# Install dependencies in parallel (default)
npm install

# Use npm cache
npm cache verify

# Clean cache if issues
npm cache clean --force
```

## Troubleshooting

### Conflicting Dependencies
```bash
npm list
npm list --depth=0
```

### Installation Slow
```bash
npm install --fetch-timeout=120000
```

### Module Conflicts
```bash
rm -rf node_modules package-lock.json
npm install
```
