import { NextRequest, NextResponse } from 'next/server';
import { openai, getOfflineAiEnhancement } from '@/lib/openai';
import { ResumeData } from '@/lib/types';

export interface AtsScoreResult {
  score: number; // 0–100
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  summary: string;
  improvements: {
    category: string;
    issue: string;
    fix: string;
    impact: 'high' | 'medium' | 'low';
  }[];
}

function computeOfflineAtsScore(resume: ResumeData): AtsScoreResult {
  const { personalDetails, workExperience, education, skills, projects } = resume;
  let score = 0;
  const improvements: AtsScoreResult['improvements'] = [];

  // Contact completeness (20 pts)
  if (personalDetails.fullName) score += 5;
  if (personalDetails.email) score += 5;
  if (personalDetails.phone) score += 5;
  if (personalDetails.location) score += 5;
  if (!personalDetails.email) {
    improvements.push({ category: 'Contact Info', issue: 'Missing email address', fix: 'Add a professional email in Personal Details', impact: 'high' });
  }

  // Summary quality (15 pts)
  const summaryLen = personalDetails.summary?.length || 0;
  if (summaryLen > 200) score += 15;
  else if (summaryLen > 80) score += 8;
  else {
    improvements.push({ category: 'Professional Summary', issue: summaryLen === 0 ? 'No summary present' : 'Summary is too brief (under 80 characters)', fix: 'Write a 3–4 sentence executive summary with quantified achievements and target keywords.', impact: 'high' });
  }

  // Work Experience depth (25 pts)
  if (workExperience.length === 0) {
    improvements.push({ category: 'Work Experience', issue: 'No work experience entries added', fix: 'Add at least one work experience entry with bullet points.', impact: 'high' });
  } else {
    score += Math.min(10, workExperience.length * 4);
    const hasBullets = workExperience.some((e) => e.description && e.description.includes('•'));
    const hasMetrics = workExperience.some((e) => /\d+%|\d+x|\$[\d,]+|\d+ (users|customers|teams?|engineers?)/i.test(e.description || ''));
    if (hasBullets) score += 8;
    else improvements.push({ category: 'Work Experience', issue: 'Experience bullets are not formatted as bullet points', fix: 'Format each achievement as "• [Action verb] + [measurable result]" — use the AI Rewrite action.', impact: 'medium' });
    if (hasMetrics) score += 7;
    else improvements.push({ category: 'Quantified Impact', issue: 'No measurable metrics found in experience descriptions', fix: 'Add numbers: "increased revenue by 30%", "managed team of 8", "reduced latency by 45ms".', impact: 'high' });
  }

  // Education (15 pts)
  if (education.length > 0) {
    score += 10;
    if (education.some((e) => e.degree && e.institution)) score += 5;
  } else {
    improvements.push({ category: 'Education', issue: 'Education section is empty', fix: 'Add at least one education entry with degree and institution.', impact: 'medium' });
  }

  // Skills (15 pts)
  if (skills.length === 0) {
    improvements.push({ category: 'Skills', issue: 'No skills listed', fix: 'Add technical and soft skill categories relevant to your target role.', impact: 'high' });
  } else {
    const totalSkills = skills.reduce((acc, g) => acc + (g.items?.length || 0), 0);
    score += Math.min(15, totalSkills * 1.5);
  }

  // Projects (10 pts)
  if (projects.length > 0) score += 10;

  const finalScore = Math.min(100, Math.round(score));
  const grade = finalScore >= 85 ? 'A' : finalScore >= 70 ? 'B' : finalScore >= 55 ? 'C' : finalScore >= 40 ? 'D' : 'F';
  const summary =
    finalScore >= 85
      ? 'Excellent ATS readiness — your resume is well-structured, quantified, and keyword-rich.'
      : finalScore >= 70
      ? 'Good foundation with a few targeted improvements to improve ATS parsing and recruiter impact.'
      : finalScore >= 55
      ? 'Moderate score — several key sections need content or stronger language to pass ATS filters.'
      : 'Low ATS readiness — focus on completing all sections with specific, measurable bullet points.';

  return { score: finalScore, grade, summary, improvements: improvements.slice(0, 3) };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const resume: ResumeData = body.resume;
    if (!resume) return NextResponse.json({ error: 'Missing resume data' }, { status: 400 });

    // Try OpenAI for enhanced analysis
    if (openai) {
      try {
        const offline = computeOfflineAtsScore(resume);
        const summaryText = `Name: ${resume.personalDetails.fullName}, Summary length: ${resume.personalDetails.summary?.length || 0} chars, Jobs: ${resume.workExperience.length}, Education: ${resume.education.length}, Skills: ${resume.skills.reduce((a, s) => a + s.items.length, 0)}, Projects: ${resume.projects.length}`;
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are an expert ATS (Applicant Tracking System) consultant. Analyze resume metadata and return ONLY a JSON object with: score (0-100), grade (A/B/C/D/F), summary (1 sentence), improvements (array of max 3 objects each with: category, issue, fix, impact: high/medium/low).' },
            { role: 'user', content: `Analyze this resume metadata and provide ATS score:\n${summaryText}\n\nReturn ONLY valid JSON.` },
          ],
          temperature: 0.3,
          max_tokens: 500,
        });
        const raw = completion.choices[0]?.message?.content?.trim();
        if (raw) {
          const jsonMatch = raw.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            return NextResponse.json({ ...offline, ...parsed, source: 'openai' });
          }
        }
      } catch (err) {
        console.warn('OpenAI ATS analysis failed, using offline scorer:', err);
      }
    }

    const result = computeOfflineAtsScore(resume);
    return NextResponse.json({ ...result, source: 'offline' });
  } catch (error) {
    console.error('ATS score error:', error);
    return NextResponse.json({ error: 'Failed to compute ATS score' }, { status: 500 });
  }
}
