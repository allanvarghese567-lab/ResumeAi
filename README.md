# AI Resume Builder

A production-ready, AI-powered resume builder application built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

### 🎨 Resume Builder
- **Personal Information**: Full name, email, phone, address, LinkedIn, GitHub, portfolio
- **Professional Summary**: AI-generated professional summaries
- **Experience**: Add multiple experiences with dates and descriptions
- **Education**: Degree, institution, year, and GPA
- **Skills**: Tag-based skill management
- **Projects**: Project descriptions with technologies
- **Certifications**: Professional certifications
- **Languages**: Language proficiency levels
- **Interests**: Personal interests

### 🤖 AI Features
- Generate professional summaries
- Rewrite job descriptions professionally
- Suggest skills based on job title
- Generate project descriptions
- Calculate ATS score
- Analyze and provide resume suggestions

### 📱 User Experience
- **Responsive Design**: Mobile-first design approach
- **Dark/Light Mode**: Full theme support
- **Live Preview**: Real-time resume preview
- **Split View**: Edit and preview simultaneously (desktop)
- **Tab Navigation**: Mobile-friendly tab navigation
- **Auto-Save**: Automatic saving to localStorage

### 📄 Export Features
- Download as PDF
- Print resume
- Share public link

### 🎯 Templates
- Modern template
- Classic template
- Minimal template

### 🔐 Authentication
- Clerk authentication integration
- User dashboard
- Multiple resume management

### 💾 Database
- Supabase PostgreSQL integration
- Resume data storage
- User management

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentication**: Clerk
- **Database**: Supabase
- **AI**: OpenAI API (GPT-4o-mini)
- **Drag & Drop**: dnd-kit
- **Export**: jsPDF, html2canvas
- **Form Handling**: React Hook Form + Zod

## Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── builder/
│   │   └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── api/
│   │   └── ai/
│   │       └── route.ts
│   └── styles/
│       └── globals.css
├── components/
│   ├── ai/
│   │   ├── AiAssistant.tsx
│   │   ├── ImproveSummary.tsx
│   │   └── ...
│   ├── forms/
│   │   ├── PersonalInfoForm.tsx
│   │   ├── ExperienceForm.tsx
│   │   └── ...
│   ├── preview/
│   │   ├── ResumePreview.tsx
│   │   └── templates/
│   ├── common/
│   │   ├── ThemeToggle.tsx
│   │   ├── Loader.tsx
│   │   └── EmptyState.tsx
│   └── ui/
│       └── (shadcn/ui components)
├── context/
│   └── ResumeContext.tsx
├── hooks/
│   ├── useLocalStorage.ts
│   ├── useTheme.ts
│   └── ...
├── lib/
│   ├── supabase.ts
│   └── openai.ts
├── types/
│   └── index.ts
└── utils/
    └── (utility functions)
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Clerk account
- Supabase account
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-resume-builder.git
cd ai-resume-builder
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Fill in your environment variables:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_key
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_key
OPENAI_API_KEY=your_key
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Type check with TypeScript
- `npm run format` - Format code with Prettier

## Database Setup

### Supabase Tables

1. **users**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR,
  image VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

2. **resumes**
```sql
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

## API Routes

### POST /api/ai
Handle AI-powered operations.

**Request:**
```json
{
  "action": "generate-summary|rewrite-experience|suggest-skills|generate-project-description|calculate-ats-score|analyze-resume",
  "payload": {}
}
```

## Best Practices

1. **TypeScript**: Fully typed codebase for type safety
2. **Component Reusability**: Modular component architecture
3. **Performance**: Lazy loading, server components, Suspense
4. **Accessibility**: Semantic HTML, ARIA labels
5. **Mobile First**: Responsive design from the start
6. **Error Handling**: Comprehensive error handling
7. **Auto-save**: Automatic localStorage persistence

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details.

## Support

For support, email support@resumeai.app or open an issue on GitHub.
