import React from "react";
import { useResumeStore } from "../../lib/store";
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub, FiGlobe, FiLink } from "react-icons/fi";

export function ATSProfessionalTemplate() {
  const data = useResumeStore();

  const renderBullets = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((bullet, idx) => (
      <li key={idx} className="mb-1 leading-snug">{bullet.trim()}</li>
    ));
  };

  return (
    <div id="resume-preview-container" className="bg-white w-full max-w-[850px] mx-auto min-h-[1100px] shadow-sm text-black p-8 sm:p-12 font-sans" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      
      {/* HEADER */}
      <header className="mb-6">
        <h1 className="text-4xl font-extrabold uppercase tracking-tight mb-1">{data.profile.name}</h1>
        <h2 className="text-sm font-bold uppercase tracking-wider mb-3">{data.profile.title}</h2>
        
        <div className="flex flex-wrap items-center text-xs gap-x-2 gap-y-1">
          {data.profile.email && (
            <div className="flex items-center gap-1">
              <FiMail /> <span>{data.profile.email}</span>
            </div>
          )}
          
          {(data.profile.phone || data.profile.address || data.profile.socialLinks?.linkedin) && data.profile.email && <span className="text-gray-300">|</span>}
          
          {data.profile.phone && (
            <div className="flex items-center gap-1">
              <FiPhone /> <span>{data.profile.phone}</span>
            </div>
          )}
          
          {(data.profile.address || data.profile.socialLinks?.linkedin) && data.profile.phone && <span className="text-gray-300">|</span>}
          
          {data.profile.address && (
            <div className="flex items-center gap-1">
              <FiMapPin /> <span>{data.profile.address}</span>
            </div>
          )}
          
          {data.profile.socialLinks?.linkedin && data.profile.address && <span className="text-gray-300">|</span>}
          
          {data.profile.socialLinks?.linkedin && (
            <div className="flex items-center gap-1">
              <FiLinkedin /> <span>{data.profile.socialLinks.linkedin}</span>
            </div>
          )}
          
          {data.profile.socialLinks?.github && data.profile.socialLinks?.linkedin && <span className="text-gray-300">|</span>}
          
          {data.profile.socialLinks?.github && (
            <div className="flex items-center gap-1">
              <FiGithub /> <span>{data.profile.socialLinks.github}</span>
            </div>
          )}
          
          {data.profile.socialLinks?.website && data.profile.socialLinks?.github && <span className="text-gray-300">|</span>}
          
          {data.profile.socialLinks?.website && (
            <div className="flex items-center gap-1">
              <FiGlobe /> <span>{data.profile.socialLinks.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* PROFESSIONAL SUMMARY */}
      {data.profile.summary && (
        <section className="mb-6">
          <h3 className="text-[13px] font-bold uppercase border-b border-black pb-1 mb-2">Professional Summary</h3>
          <p className="text-[13px] leading-relaxed text-justify">
            {data.profile.summary}
          </p>
        </section>
      )}

      {/* EXPERIENCE */}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <h3 className="text-[13px] font-bold uppercase border-b border-black pb-1 mb-3">Experience</h3>
          <div className="flex flex-col gap-4">
            {data.experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="text-[13px] font-bold">{exp.jobTitle}</h4>
                  <span className="text-[12px]">{exp.startDate} – {exp.endDate}</span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-[13px]">{exp.company}</span>
                  <span className="text-[12px]">{exp.location}</span>
                </div>
                <ul className="list-disc list-inside text-[12px] pl-1">
                  {renderBullets(exp.description)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PROJECTS */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-6">
          <h3 className="text-[13px] font-bold uppercase border-b border-black pb-1 mb-3">Projects</h3>
          <div className="flex flex-col gap-3">
            {data.projects.map((proj, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline mb-1">
                  <div className="text-[13px]">
                    <span className="font-bold">{proj.name}</span>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="italic">{proj.techStack}</span>
                  </div>
                  {proj.link && (
                    <div className="flex items-center gap-1 text-[12px]">
                      <FiLink className="text-[10px]"/> <span>{proj.link}</span>
                    </div>
                  )}
                </div>
                <p className="text-[12px] leading-snug">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {data.education.length > 0 && (
        <section className="mb-6">
          <h3 className="text-[13px] font-bold uppercase border-b border-black pb-1 mb-3">Education</h3>
          <div className="flex flex-col gap-3">
            {data.education.map((edu, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="text-[13px] font-bold">{edu.degree}</h4>
                  <span className="text-[12px]">{edu.startDate} – {edu.endDate}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[13px]">{edu.institution}</span>
                  {edu.score && <span className="text-[12px]">{edu.score}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SKILLS */}
      {data.categorizedSkills && data.categorizedSkills.length > 0 && (
        <section className="mb-6">
          <h3 className="text-[13px] font-bold uppercase border-b border-black pb-1 mb-3">Skills</h3>
          <div className="flex flex-col gap-1 text-[13px]">
            {data.categorizedSkills.map((skill, idx) => (
              <div key={idx} className="flex">
                <span className="font-bold w-[130px] flex-shrink-0">{skill.category}:</span>
                <span>{skill.items}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CERTIFICATIONS */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="mb-6">
          <h3 className="text-[13px] font-bold uppercase border-b border-black pb-1 mb-3">Certifications</h3>
          <ul className="list-disc list-inside text-[13px] pl-1 space-y-1">
            {data.certifications.map((cert, idx) => (
              <li key={idx}>{cert}</li>
            ))}
          </ul>
        </section>
      )}

      {/* ACHIEVEMENTS */}
      {data.achievements && data.achievements.length > 0 && (
        <section className="mb-6">
          <h3 className="text-[13px] font-bold uppercase border-b border-black pb-1 mb-3">Achievements</h3>
          <ul className="list-disc list-inside text-[13px] pl-1 space-y-1">
            {data.achievements.map((ach, idx) => (
              <li key={idx}>{ach}</li>
            ))}
          </ul>
        </section>
      )}

      {/* LANGUAGES */}
      {data.languages && data.languages.length > 0 && (
        <section>
          <h3 className="text-[13px] font-bold uppercase border-b border-black pb-1 mb-3">Languages</h3>
          <div className="flex flex-wrap items-center text-[13px] gap-x-4 gap-y-2">
            {data.languages.map((lang, idx) => (
              <React.Fragment key={idx}>
                <div>
                  <span className="font-bold">{lang.name}</span>
                  {lang.proficiency && <span> – {lang.proficiency}</span>}
                </div>
                {idx < data.languages.length - 1 && <span className="text-gray-300">|</span>}
              </React.Fragment>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
