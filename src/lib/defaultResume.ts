import { ResumeData } from './types';

export const initialResumeData: ResumeData = {
  id: 'demo-resume-101',
  title: 'Senior Full Stack Software Engineer Resume',
  templateId: 'minimal-white',
  personalDetails: {
    fullName: 'Alex Morgan',
    jobTitle: 'Senior Full Stack Software Engineer',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    summary: 'Results-driven Full Stack Engineer with 5+ years of experience building high-scale web applications, microservices, and AI integrations. Proven track record of boosting system performance by 40% and leading cross-functional teams to deliver scalable cloud products.',
    website: 'https://alexmorgan.dev',
    linkedin: 'https://linkedin.com/in/alexmorgan-dev',
    github: 'https://github.com/alexmorgan',
  },
  workExperience: [
    {
      id: 'exp-1',
      company: 'TechFlow Systems',
      position: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2022-03',
      endDate: 'Present',
      current: true,
      description: 'Architected and built real-time analytics pipeline using Next.js, Node.js, and Redis, reducing latency by 45%.\nLed a team of 4 engineers to migrate legacy monolith services into decoupled microservices hosted on AWS.\nImplemented automated CI/CD deployment workflows, improving engineering productivity and reducing release cycles from 2 weeks to 2 days.',
    },
    {
      id: 'exp-2',
      company: 'Apex Digital Solutions',
      position: 'Full Stack Web Developer',
      location: 'Austin, TX',
      startDate: '2020-01',
      endDate: '2022-02',
      current: false,
      description: 'Developed responsive user interfaces with React, TypeScript, and Tailwind CSS for high-traffic SaaS client applications.\nCollaborated with product designers to create an accessible UI component system used across 5 enterprise products.\nOptimized SQL queries and database indexes in PostgreSQL, decreasing overall API request response times by 30%.',
    },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      location: 'Berkeley, CA',
      startDate: '2016-08',
      endDate: '2020-05',
      gpa: '3.8 / 4.0',
      description: 'Relevant Coursework: Data Structures, Algorithms, Distributed Systems, Software Engineering, Artificial Intelligence.',
    },
  ],
  skills: [
    {
      id: 'skill-1',
      category: 'Languages & Frameworks',
      items: ['TypeScript', 'JavaScript (ES6+)', 'React', 'Next.js', 'Node.js', 'Python', 'Go', 'Tailwind CSS'],
    },
    {
      id: 'skill-2',
      category: 'Backend & Databases',
      items: ['PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'REST APIs', 'Docker', 'AWS (S3, Lambda, EC2)'],
    },
    {
      id: 'skill-3',
      category: 'Tools & Practices',
      items: ['Git/GitHub', 'CI/CD (GitHub Actions)', 'Jest', 'Cypress', 'Agile/Scrum', 'System Architecture'],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'DevPulse - Developer Productivity Dashboard',
      technologies: 'Next.js, TypeScript, Tailwind CSS, OpenAI API, MongoDB',
      description: 'Built an open-source productivity dashboard for developers with AI-assisted code reviews and metrics analysis.\nAchieved over 1,200 GitHub stars and 5,000 monthly active users.',
      link: 'https://github.com/alexmorgan/devpulse',
      startDate: '2023-05',
      endDate: '2023-09',
    },
    {
      id: 'proj-2',
      title: 'CloudMetrics Engine',
      technologies: 'Node.js, Express, Redis, Docker, Chart.js',
      description: 'Designed a lightweight APM tool monitoring server performance metrics and emitting live WebSocket alerts.',
      link: 'https://cloudmetrics-demo.com',
      startDate: '2022-10',
      endDate: '2023-01',
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      date: '2023-04',
      url: 'https://aws.amazon.com/verification',
    },
    {
      id: 'cert-2',
      name: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Coursera / Meta',
      date: '2021-11',
    },
  ],
  links: [
    {
      id: 'link-1',
      label: 'Portfolio',
      url: 'https://alexmorgan.dev',
    },
    {
      id: 'link-2',
      label: 'GitHub',
      url: 'https://github.com/alexmorgan',
    },
    {
      id: 'link-3',
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/alexmorgan-dev',
    },
  ],
};
