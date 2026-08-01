import mongoose, { Schema, Document } from 'mongoose';
import { ResumeData } from '../types';

export interface IResumeDocument extends Omit<ResumeData, 'id'>, Document {
  id: string;
}

const ResumeSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, default: 'Untitled Resume' },
    templateId: { type: String, default: 'minimal-white' },
    personalDetails: {
      fullName: { type: String, default: '' },
      jobTitle: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      location: { type: String, default: '' },
      summary: { type: String, default: '' },
      website: { type: String },
      linkedin: { type: String },
      github: { type: String },
    },
    workExperience: [
      {
        id: { type: String },
        company: { type: String, default: '' },
        position: { type: String, default: '' },
        location: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        current: { type: Boolean, default: false },
        description: { type: String, default: '' },
      },
    ],
    education: [
      {
        id: { type: String },
        institution: { type: String, default: '' },
        degree: { type: String, default: '' },
        fieldOfStudy: { type: String, default: '' },
        location: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        gpa: { type: String },
        description: { type: String },
      },
    ],
    skills: [
      {
        id: { type: String },
        category: { type: String, default: '' },
        items: [{ type: String }],
      },
    ],
    projects: [
      {
        id: { type: String },
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        technologies: { type: String, default: '' },
        link: { type: String },
        startDate: { type: String },
        endDate: { type: String },
      },
    ],
    certifications: [
      {
        id: { type: String },
        name: { type: String, default: '' },
        issuer: { type: String, default: '' },
        date: { type: String, default: '' },
        url: { type: String },
      },
    ],
    links: [
      {
        id: { type: String },
        label: { type: String, default: '' },
        url: { type: String, default: '' },
      },
    ],
  },
  {
    timestamps: true,
    strict: false, // Allows flexible schema additions in future phases
  }
);

export default mongoose.models.Resume || mongoose.model<IResumeDocument>('Resume', ResumeSchema);
