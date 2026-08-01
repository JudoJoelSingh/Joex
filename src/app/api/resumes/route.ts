import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Resume from '@/lib/models/Resume';
import { initialResumeData } from '@/lib/defaultResume';

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (!db) {
      // In local mode without MongoDB, return default demo resume
      return NextResponse.json([initialResumeData]);
    }

    const resumes = await Resume.find({}).sort({ updatedAt: -1 }).limit(20);
    return NextResponse.json(resumes.length > 0 ? resumes : [initialResumeData]);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return NextResponse.json({ error: 'Failed to fetch resumes' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const resumeData = await req.json();
    if (!resumeData.id) {
      return NextResponse.json({ error: 'Resume ID is required' }, { status: 400 });
    }

    const db = await connectToDatabase();
    if (!db) {
      // If MongoDB is not configured, signal success so client persists to localStorage
      return NextResponse.json({ success: true, localOnly: true, data: resumeData });
    }

    const updated = await Resume.findOneAndUpdate(
      { id: resumeData.id },
      resumeData,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error saving resume:', error);
    return NextResponse.json({ error: 'Failed to save resume' }, { status: 500 });
  }
}
