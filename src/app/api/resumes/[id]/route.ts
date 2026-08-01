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
      // Offline / Local fallback mode
      return NextResponse.json(initialResumeData);
    }

    const resume = await Resume.findOne({ id });
    if (!resume) {
      return NextResponse.json(initialResumeData);
    }

    return NextResponse.json(resume);
  } catch (error) {
    console.error('Error fetching resume by ID:', error);
    return NextResponse.json({ error: 'Failed to fetch resume' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await req.json();
    const db = await connectToDatabase();

    if (!db) {
      return NextResponse.json({ success: true, localOnly: true, data });
    }

    const updated = await Resume.findOneAndUpdate({ id }, data, {
      upsert: true,
      new: true,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating resume:', error);
    return NextResponse.json({ error: 'Failed to update resume' }, { status: 500 });
  }
}
