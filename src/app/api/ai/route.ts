import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import {
  generateSummary,
  rewriteExperience,
  suggestSkills,
  generateProjectDescription,
  calculateATSScore,
  analyzeResume,
} from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { action, payload } = await request.json();

    let result;

    switch (action) {
      case 'generate-summary':
        result = await generateSummary(payload.jobTitle, payload.experience);
        break;
      case 'rewrite-experience':
        result = await rewriteExperience(payload.jobTitle, payload.description);
        break;
      case 'suggest-skills':
        result = await suggestSkills(payload.jobTitle);
        break;
      case 'generate-project-description':
        result = await generateProjectDescription(
          payload.projectName,
          payload.technologies
        );
        break;
      case 'calculate-ats-score':
        result = await calculateATSScore(payload.resumeData);
        break;
      case 'analyze-resume':
        result = await analyzeResume(payload.resumeData);
        break;
      default:
        return NextResponse.json(
          { error: 'Unknown action' },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('AI API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
