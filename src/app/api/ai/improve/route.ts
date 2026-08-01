import { NextRequest, NextResponse } from 'next/server';
import { openai, getOfflineAiEnhancement } from '@/lib/openai';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, actionType = 'improve', text, jobTitle, company, position } = body;

    if (!type && !actionType) {
      return NextResponse.json({ error: 'Missing type or actionType field' }, { status: 400 });
    }

    // If OpenAI API key is present, attempt live API call
    if (openai) {
      try {
        let systemPrompt =
          'You are an elite executive resume writer and career coach. Your task is to rewrite user inputs to be punchy, impact-driven, ATS-friendly, and highly professional. Use active verbs and quantify metrics where appropriate.';
        let userPrompt = '';

        if (actionType === 'quantify') {
          userPrompt = `Take the following experience/project description and rephrase it to emphasize measurable metrics, percentages, and quantifiable business outcomes for a ${jobTitle || 'Role'}:\n\n"${text}"\n\nOutput ONLY bullet points starting with active verbs.`;
        } else if (actionType === 'wording') {
          userPrompt = `Elevate the vocabulary and professional wording of this resume excerpt without changing its factual core:\n\n"${text}"\n\nMake it sound executive-grade and polished. Output ONLY the reworded text.`;
        } else if (actionType === 'rewrite' || type === 'experience') {
          userPrompt = `Rewrite these work experience bullet points for a "${position || jobTitle || 'Role'}" at "${company || 'Company'}":\n\n"${text}"\n\nFormat as clear bullet points starting with strong action verbs (e.g. • Architected..., • Spearheaded...). Output ONLY the bullet points.`;
        } else if (actionType === 'summary' || type === 'summary') {
          userPrompt = `Rewrite and polish this professional summary for a target position of "${jobTitle || 'Professional'}":\n\n"${text}"\n\nKeep it concise (3-4 sentences max), compelling, and executive-ready. Output ONLY the summary text.`;
        } else {
          userPrompt = `Improve the following resume content for executive clarity:\n\n"${text}"`;
        }

        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.7,
          max_tokens: 400,
        });

        const enhancedText = completion.choices[0]?.message?.content?.trim();
        if (enhancedText) {
          return NextResponse.json({ result: enhancedText, source: 'openai' });
        }
      } catch (err: unknown) {
        console.warn('OpenAI API call failed or quota exceeded, falling back to smart AI engine:', err);
      }
    }

    // Fallback offline AI generator
    const fallbackResult = getOfflineAiEnhancement(type || actionType, text || '', { jobTitle });
    return NextResponse.json({ result: fallbackResult, source: 'offline-ai' });
  } catch (error: unknown) {
    console.error('Error in /api/ai/improve:', error);
    return NextResponse.json(
      { error: 'Failed to process AI improvement request' },
      { status: 500 }
    );
  }
}
