import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;

export const openai = apiKey ? new OpenAI({ apiKey }) : null;

// Smart fallback AI engine when OPENAI_API_KEY is not configured
export function getOfflineAiEnhancement(type: string, text: string, context?: { jobTitle?: string }): string {
  const jobTitle = context?.jobTitle || 'Professional';

  switch (type) {
    case 'summary':
      return `Results-driven ${jobTitle} with a proven track record of designing high-impact solutions, optimizing operational workflows, and driving quantifiable metrics. Adept at collaborative problem solving, cross-functional project delivery, and leveraging cutting-edge tools to accelerate growth.`;

    case 'experience':
      if (!text || text.trim().length === 0) {
        return `• Spearheaded critical initiatives resulting in a 35% increase in operational efficiency and team output.\n• Streamlined core engineering workflows, decreasing delivery friction and boosting cross-team synergy.\n• Engineered scalable architecture serving 50k+ active users with 99.9% uptime compliance.`;
      }
      return text
        .split('\n')
        .map((line) => {
          const clean = line.replace(/^[\s•\-\*]+/, '').trim();
          if (!clean) return '';
          if (clean.toLowerCase().startsWith('built') || clean.toLowerCase().startsWith('created')) {
            return `• Architected and deployed ${clean.slice(6)}, increasing user engagement and system throughput by 30%.`;
          }
          if (clean.toLowerCase().startsWith('led') || clean.toLowerCase().startsWith('managed')) {
            return `• Spearheaded cross-functional delivery of ${clean.slice(4)}, driving key performance indicators across teams.`;
          }
          return `• Successfully ${clean.charAt(0).toLowerCase() + clean.slice(1)} while adhering to industry best practices and quality standards.`;
        })
        .filter(Boolean)
        .join('\n');

    case 'project':
      return `• Engineered full-stack solution utilizing modern architectural paradigms and cloud deployment.\n• Implemented automated testing and CI/CD pipeline, reducing deployment overhead by 40%.\n• Received positive feedback from 1,000+ active platform contributors.`;

    case 'skills':
      return `Strategic Planning, Solution Architecture, Performance Optimization, Cross-Functional Collaboration, Agile Methodologies`;

    default:
      return text ? `• ${text.trim()} (Enhanced for professional clarity and executive impact)` : '• Spearheaded key project milestones with measurable performance improvements.';
  }
}
