import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = 'You are an expert ATS resume writer and career coach. Help users create compelling, ATS-optimized resumes that highlight their strengths and achievements. Provide specific, actionable suggestions.';

export async function generateSummary(jobTitle: string, experience: string): Promise<string> {
  const message = await client.messages.create({
    model: 'gpt-4o-mini',
    max_tokens: 300,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Generate a compelling professional summary for a ${jobTitle} with the following experience: ${experience}. Keep it concise (3-4 sentences) and impactful.`,
      },
    ],
  });

  const textContent = message.content.find((block) => block.type === 'text');
  return textContent && 'text' in textContent ? textContent.text : '';
}

export async function rewriteExperience(
  jobTitle: string,
  description: string
): Promise<string> {
  const message = await client.messages.create({
    model: 'gpt-4o-mini',
    max_tokens: 500,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Rewrite this job experience description to be more impactful and ATS-optimized. Job Title: ${jobTitle}. Original Description: ${description}. Use action verbs and include quantifiable achievements.`,
      },
    ],
  });

  const textContent = message.content.find((block) => block.type === 'text');
  return textContent && 'text' in textContent ? textContent.text : '';
}

export async function suggestSkills(jobTitle: string): Promise<string[]> {
  const message = await client.messages.create({
    model: 'gpt-4o-mini',
    max_tokens: 300,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Suggest 10-15 relevant skills for a ${jobTitle} position. Return only the skills as a comma-separated list.`,
      },
    ],
  });

  const textContent = message.content.find((block) => block.type === 'text');
  if (!textContent || !('text' in textContent)) return [];
  
  return textContent.text
    .split(',')
    .map((skill) => skill.trim())
    .filter((skill) => skill.length > 0);
}

export async function generateProjectDescription(projectName: string, technologies: string[]): Promise<string> {
  const message = await client.messages.create({
    model: 'gpt-4o-mini',
    max_tokens: 300,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Generate a compelling project description for: ${projectName}. Technologies used: ${technologies.join(', ')}. Make it concise but impactful (2-3 sentences). Include the impact or outcome.`,
      },
    ],
  });

  const textContent = message.content.find((block) => block.type === 'text');
  return textContent && 'text' in textContent ? textContent.text : '';
}

export async function calculateATSScore(resumeData: Record<string, any>): Promise<{ score: number; suggestions: string[] }> {
  const resumeText = JSON.stringify(resumeData, null, 2);
  
  const message = await client.messages.create({
    model: 'gpt-4o-mini',
    max_tokens: 500,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Analyze this resume data for ATS optimization. Provide a score from 0-100 and 3-5 specific improvement suggestions. Format your response as JSON: {"score": number, "suggestions": ["suggestion1", "suggestion2", ...]}. Resume: ${resumeText}`,
      },
    ],
  });

  const textContent = message.content.find((block) => block.type === 'text');
  if (!textContent || !('text' in textContent)) {
    return { score: 0, suggestions: [] };
  }

  try {
    const parsed = JSON.parse(textContent.text);
    return {
      score: Math.min(100, Math.max(0, parsed.score || 0)),
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
    };
  } catch {
    return { score: 0, suggestions: [] };
  }
}

export async function analyzeResume(resumeData: Record<string, any>): Promise<string[]> {
  const resumeText = JSON.stringify(resumeData, null, 2);
  
  const message = await client.messages.create({
    model: 'gpt-4o-mini',
    max_tokens: 500,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Analyze this resume and provide 5-7 actionable improvement suggestions. Focus on content, formatting, and ATS optimization. Resume: ${resumeText}`,
      },
    ],
  });

  const textContent = message.content.find((block) => block.type === 'text');
  if (!textContent || !('text' in textContent)) return [];

  return textContent.text
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .slice(0, 7);
}
