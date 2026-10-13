import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/lib/types';

// White style palette
const whiteStyles = StyleSheet.create({
  page: { padding: 36, fontSize: 9, fontFamily: 'Helvetica', lineHeight: 1.4, color: '#0f172a', backgroundColor: '#ffffff' },
  header: { borderBottomWidth: 1, borderBottomColor: '#cbd5e1', borderBottomStyle: 'solid', paddingBottom: 12, marginBottom: 12 },
  name: { fontSize: 22, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', marginBottom: 2, color: '#0f172a' },
  jobTitle: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: '#334155', marginBottom: 6 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, fontSize: 8, color: '#475569' },
  section: { marginBottom: 12 },
  sectionTitle: { fontSize: 10, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 0.5, borderBottomWidth: 1, borderBottomColor: '#e2e8f0', borderBottomStyle: 'solid', paddingBottom: 2, marginBottom: 6, color: '#0f172a' },
  itemRow: { marginBottom: 6 },
  itemTitleRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  itemTitle: { fontFamily: 'Helvetica-Bold', fontSize: 9.5, color: '#0f172a' },
  itemCompany: { fontFamily: 'Helvetica', color: '#334155' },
  itemDates: { fontSize: 8, color: '#64748b' },
  description: { fontSize: 8.5, color: '#334155', marginTop: 2 },
  skillRow: { flexDirection: 'row', marginBottom: 3 },
  skillCategory: { fontFamily: 'Helvetica-Bold', width: 130, color: '#0f172a' },
  skillItems: { flex: 1, color: '#334155' },
});

// Elite Black palette
const blackStyles = StyleSheet.create({
  page: { padding: 36, fontSize: 9, fontFamily: 'Helvetica', lineHeight: 1.4, color: '#F1F5F9', backgroundColor: '#0B0C10' },
  header: { borderBottomWidth: 1, borderBottomColor: '#27272A', borderBottomStyle: 'solid', paddingBottom: 12, marginBottom: 12 },
  name: { fontSize: 22, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', marginBottom: 2, color: '#FFFFFF' },
  jobTitle: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: '#38BDF8', marginBottom: 6 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, fontSize: 8, color: '#A1A1AA' },
  section: { marginBottom: 12 },
  sectionTitle: { fontSize: 10, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 0.5, borderBottomWidth: 1, borderBottomColor: '#27272A', borderBottomStyle: 'solid', paddingBottom: 2, marginBottom: 6, color: '#7C3AED' },
  itemRow: { marginBottom: 6 },
  itemTitleRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  itemTitle: { fontFamily: 'Helvetica-Bold', fontSize: 9.5, color: '#FFFFFF' },
  itemCompany: { fontFamily: 'Helvetica', color: '#38BDF8' },
  itemDates: { fontSize: 8, color: '#A1A1AA' },
  description: { fontSize: 8.5, color: '#CBD5E1', marginTop: 2 },
  skillRow: { flexDirection: 'row', marginBottom: 3 },
  skillCategory: { fontFamily: 'Helvetica-Bold', width: 130, color: '#FFFFFF' },
  skillItems: { flex: 1, color: '#CBD5E1' },
});

// Modern Glass palette
const glassStyles = StyleSheet.create({
  page: { padding: 36, fontSize: 9, fontFamily: 'Helvetica', lineHeight: 1.4, color: '#F8FAFC', backgroundColor: '#111625' },
  header: { borderBottomWidth: 1, borderBottomColor: '#1E293B', borderBottomStyle: 'solid', paddingBottom: 12, marginBottom: 12 },
  name: { fontSize: 22, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', marginBottom: 2, color: '#FFFFFF' },
  jobTitle: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: '#38BDF8', marginBottom: 6 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, fontSize: 8, color: '#94A3B8' },
  section: { marginBottom: 12 },
  sectionTitle: { fontSize: 10, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 0.5, borderBottomWidth: 1, borderBottomColor: '#1E293B', borderBottomStyle: 'solid', paddingBottom: 2, marginBottom: 6, color: '#38BDF8' },
  itemRow: { marginBottom: 6 },
  itemTitleRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  itemTitle: { fontFamily: 'Helvetica-Bold', fontSize: 9.5, color: '#FFFFFF' },
  itemCompany: { fontFamily: 'Helvetica', color: '#7DD3FC' },
  itemDates: { fontSize: 8, color: '#94A3B8' },
  description: { fontSize: 8.5, color: '#E2E8F0', marginTop: 2 },
  skillRow: { flexDirection: 'row', marginBottom: 3 },
  skillCategory: { fontFamily: 'Helvetica-Bold', width: 130, color: '#FFFFFF' },
  skillItems: { flex: 1, color: '#E2E8F0' },
});

interface PdfDocumentProps {
  data: ResumeData;
}

export const PdfDocument: React.FC<PdfDocumentProps> = ({ data }) => {
  const {
    personalDetails,
    workExperience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    links = [],
    templateId,
  } = data;

  const styles =
    templateId === 'elite-black'
      ? blackStyles
      : templateId === 'modern-glass'
        ? glassStyles
        : whiteStyles;

  return (
    <Document title={`${personalDetails.fullName || 'Resume'} - Shinex AI`}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalDetails.fullName || 'Your Name'}</Text>
          {personalDetails.jobTitle ? (
            <Text style={styles.jobTitle}>{personalDetails.jobTitle}</Text>
          ) : null}

          <View style={styles.contactRow}>
            {personalDetails.email ? <Text>Email: {personalDetails.email}</Text> : null}
            {personalDetails.phone ? <Text>Phone: {personalDetails.phone}</Text> : null}
            {personalDetails.location ? <Text>Location: {personalDetails.location}</Text> : null}
            {personalDetails.website ? (
              <Link src={personalDetails.website}>
                Website: {personalDetails.website.replace(/^https?:\/\//, '')}
              </Link>
            ) : null}
            {personalDetails.linkedin ? (
              <Link src={personalDetails.linkedin}>LinkedIn</Link>
            ) : null}
            {personalDetails.github ? (
              <Link src={personalDetails.github}>GitHub</Link>
            ) : null}
          </View>
        </View>

        {/* Summary */}
        {personalDetails.summary ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.description}>{personalDetails.summary}</Text>
          </View>
        ) : null}

        {/* Work Experience */}
        {workExperience.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {workExperience.map((exp) => (
              <View key={exp.id} style={styles.itemRow}>
                <View style={styles.itemTitleRow}>
                  <Text style={styles.itemTitle}>
                    {exp.position}{' '}
                    <Text style={styles.itemCompany}>| {exp.company}</Text>
                  </Text>
                  <Text style={styles.itemDates}>
                    {exp.startDate} {exp.startDate && (exp.endDate || exp.current) ? '–' : ''}{' '}
                    {exp.current ? 'Present' : exp.endDate} {exp.location ? `(${exp.location})` : ''}
                  </Text>
                </View>
                {exp.description ? (
                  <Text style={styles.description}>{exp.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Education */}
        {education.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.itemRow}>
                <View style={styles.itemTitleRow}>
                  <Text style={styles.itemTitle}>
                    {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}
                  </Text>
                  <Text style={styles.itemDates}>
                    {edu.startDate} {edu.startDate && edu.endDate ? '–' : ''} {edu.endDate}
                  </Text>
                </View>
                <Text style={styles.description}>
                  {edu.institution}
                  {edu.location ? ` • ${edu.location}` : ''}
                  {edu.gpa ? ` • GPA: ${edu.gpa}` : ''}
                </Text>
                {edu.description ? (
                  <Text style={styles.description}>{edu.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Skills */}
        {skills.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills & Competencies</Text>
            {skills.map((skillGroup) => (
              <View key={skillGroup.id} style={styles.skillRow}>
                {skillGroup.category ? (
                  <Text style={styles.skillCategory}>{skillGroup.category}:</Text>
                ) : null}
                <Text style={styles.skillItems}>
                  {Array.isArray(skillGroup.items)
                    ? skillGroup.items.join(' • ')
                    : skillGroup.items}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {/* Projects */}
        {projects.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Projects</Text>
            {projects.map((proj) => (
              <View key={proj.id} style={styles.itemRow}>
                <View style={styles.itemTitleRow}>
                  <Text style={styles.itemTitle}>{proj.title}</Text>
                  {proj.startDate || proj.endDate ? (
                    <Text style={styles.itemDates}>
                      {proj.startDate} {proj.startDate && proj.endDate ? '–' : ''} {proj.endDate}
                    </Text>
                  ) : null}
                </View>
                {proj.technologies ? (
                  <Text style={{ fontSize: 8, color: '#A1A1AA', fontStyle: 'italic' }}>
                    Technologies: {proj.technologies}
                  </Text>
                ) : null}
                {proj.description ? (
                  <Text style={styles.description}>{proj.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Certifications */}
        {certifications.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certifications.map((cert) => (
              <View key={cert.id} style={styles.itemTitleRow}>
                <Text style={styles.itemTitle}>
                  {cert.name}
                  {cert.issuer ? ` — ${cert.issuer}` : ''}
                </Text>
                {cert.date ? <Text style={styles.itemDates}>{cert.date}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Links */}
        {links.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Links & Portfolio</Text>
            <View style={styles.contactRow}>
              {links.map((link) => (
                <Link key={link.id} src={link.url}>
                  {link.label}: {link.url}
                </Link>
              ))}
            </View>
          </View>
        ) : null}
      </Page>
    </Document>
  );
};
