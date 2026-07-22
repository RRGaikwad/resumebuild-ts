import React from "react";
import { useResumeStore } from "../../lib/store";

// NOTE: All icons are plain Unicode/text characters intentionally.
// react-icons SVGs are NOT used here because html2canvas cannot render
// SVG elements, causing PDF/JPG export to silently fail or produce a blank output.

export function ATSProfessionalTemplate() {
  const data = useResumeStore();

  const renderBullets = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((bullet, idx) => (
      <li key={idx} style={{ marginBottom: '2px', lineHeight: '1.4' }}>{bullet.trim()}</li>
    ));
  };

  return (
    <div
      id="resume-preview-container"
      style={{
        backgroundColor: '#ffffff',
        width: '850px',
        minHeight: '1100px',
        margin: '0 auto',
        padding: '48px',
        fontFamily: 'Arial, Helvetica, sans-serif',
        color: '#000000',
        boxSizing: 'border-box',
        fontSize: '13px',
        lineHeight: '1.5',
      }}
    >

      {/* HEADER */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: '2px', margin: '0 0 2px 0' }}>
          {data.profile.name}
        </h1>
        <h2 style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', margin: '0 0 10px 0', color: '#444' }}>
          {data.profile.title}
        </h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', fontSize: '12px', gap: '6px' }}>
          {data.profile.email && (
            <span>✉ {data.profile.email}</span>
          )}
          {data.profile.phone && data.profile.email && <span style={{ color: '#aaa' }}>|</span>}
          {data.profile.phone && (
            <span>✆ {data.profile.phone}</span>
          )}
          {data.profile.address && data.profile.phone && <span style={{ color: '#aaa' }}>|</span>}
          {data.profile.address && (
            <span>⊙ {data.profile.address}</span>
          )}
          {data.profile.socialLinks?.linkedin && data.profile.address && <span style={{ color: '#aaa' }}>|</span>}
          {data.profile.socialLinks?.linkedin && (
            <span>in {data.profile.socialLinks.linkedin}</span>
          )}
          {data.profile.socialLinks?.github && data.profile.socialLinks?.linkedin && <span style={{ color: '#aaa' }}>|</span>}
          {data.profile.socialLinks?.github && (
            <span>GH {data.profile.socialLinks.github}</span>
          )}
          {data.profile.socialLinks?.website && data.profile.socialLinks?.github && <span style={{ color: '#aaa' }}>|</span>}
          {data.profile.socialLinks?.website && (
            <span>⊕ {data.profile.socialLinks.website}</span>
          )}
        </div>
      </div>

      {/* PROFESSIONAL SUMMARY */}
      {data.profile.summary && (
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1.5px solid #000', paddingBottom: '3px', marginBottom: '6px', letterSpacing: '0.5px' }}>
            Professional Summary
          </h3>
          <p style={{ fontSize: '13px', lineHeight: '1.6', textAlign: 'justify', margin: 0 }}>
            {data.profile.summary}
          </p>
        </div>
      )}

      {/* EXPERIENCE */}
      {data.experience.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1.5px solid #000', paddingBottom: '3px', marginBottom: '8px', letterSpacing: '0.5px' }}>
            Experience
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {data.experience.map((exp, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: '700', margin: 0 }}>{exp.jobTitle}</h4>
                  <span style={{ fontSize: '12px' }}>{exp.startDate} – {exp.endDate}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px' }}>{exp.company}</span>
                  <span style={{ fontSize: '12px' }}>{exp.location}</span>
                </div>
                <ul style={{ listStyleType: 'disc', paddingLeft: '16px', margin: 0, fontSize: '12px' }}>
                  {renderBullets(exp.description)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROJECTS */}
      {data.projects && data.projects.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1.5px solid #000', paddingBottom: '3px', marginBottom: '8px', letterSpacing: '0.5px' }}>
            Projects
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.projects.map((proj, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                  <div style={{ fontSize: '13px' }}>
                    <span style={{ fontWeight: '700' }}>{proj.name}</span>
                    {proj.techStack && <span style={{ color: '#555', margin: '0 6px' }}>|</span>}
                    {proj.techStack && <span style={{ fontStyle: 'italic' }}>{proj.techStack}</span>}
                  </div>
                  {proj.link && (
                    <span style={{ fontSize: '12px' }}>⊕ {proj.link}</span>
                  )}
                </div>
                <p style={{ fontSize: '12px', lineHeight: '1.4', margin: 0 }}>{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EDUCATION */}
      {data.education.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1.5px solid #000', paddingBottom: '3px', marginBottom: '8px', letterSpacing: '0.5px' }}>
            Education
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.education.map((edu, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: '700', margin: 0 }}>{edu.degree}</h4>
                  <span style={{ fontSize: '12px' }}>{edu.startDate} – {edu.endDate}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '13px' }}>{edu.institution}</span>
                  {edu.score && <span style={{ fontSize: '12px' }}>{edu.score}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SKILLS */}
      {data.categorizedSkills && data.categorizedSkills.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1.5px solid #000', paddingBottom: '3px', marginBottom: '8px', letterSpacing: '0.5px' }}>
            Skills
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '13px' }}>
            {data.categorizedSkills.map((skill, idx) => (
              <div key={idx} style={{ display: 'flex' }}>
                <span style={{ fontWeight: '700', width: '130px', flexShrink: 0 }}>{skill.category}:</span>
                <span>{skill.items}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CERTIFICATIONS */}
      {data.certifications && data.certifications.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1.5px solid #000', paddingBottom: '3px', marginBottom: '8px', letterSpacing: '0.5px' }}>
            Certifications
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '16px', margin: 0, fontSize: '13px' }}>
            {data.certifications.map((cert, idx) => (
              <li key={idx} style={{ marginBottom: '2px' }}>{cert}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ACHIEVEMENTS */}
      {data.achievements && data.achievements.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1.5px solid #000', paddingBottom: '3px', marginBottom: '8px', letterSpacing: '0.5px' }}>
            Achievements
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '16px', margin: 0, fontSize: '13px' }}>
            {data.achievements.map((ach, idx) => (
              <li key={idx} style={{ marginBottom: '2px' }}>{ach}</li>
            ))}
          </ul>
        </div>
      )}

      {/* LANGUAGES */}
      {data.languages && data.languages.length > 0 && (
        <div>
          <h3 style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1.5px solid #000', paddingBottom: '3px', marginBottom: '8px', letterSpacing: '0.5px' }}>
            Languages
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', fontSize: '13px', gap: '12px' }}>
            {data.languages.map((lang, idx) => (
              <React.Fragment key={idx}>
                <div>
                  <span style={{ fontWeight: '700' }}>{lang.name}</span>
                  {lang.proficiency && <span> – {lang.proficiency}</span>}
                </div>
                {idx < data.languages.length - 1 && <span style={{ color: '#ccc' }}>|</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
