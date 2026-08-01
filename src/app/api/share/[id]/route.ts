import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Resume from '@/lib/models/Resume';
import { initialResumeData } from '@/lib/defaultResume';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await connectToDatabase();

    if (!db) {
      // Offline mode: return demo resume data for share view
      return NextResponse.json({ ...initialResumeData, id });
    }

    const resume = await Resume.findOne({ id });
    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    return NextResponse.json(resume);
  } catch (error) {
    console.error('Error fetching public resume:', error);
    return NextResponse.json({ error: 'Failed to fetch resume' }, { status: 500 });
  }
}
