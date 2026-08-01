'use client';

import React from 'react';
import { ResumeData } from '@/lib/types';
import { MinimalWhiteTemplate } from './MinimalWhiteTemplate';
import { EliteBlackTemplate } from './EliteBlackTemplate';
import { ModernGlassTemplate } from './ModernGlassTemplate';

interface TemplateRendererProps {
  data: ResumeData;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ data }) => {
  switch (data.templateId) {
    case 'elite-black':
      return <EliteBlackTemplate data={data} />;
    case 'modern-glass':
      return <ModernGlassTemplate data={data} />;
    case 'minimal-white':
    default:
      return <MinimalWhiteTemplate data={data} />;
  }
};
