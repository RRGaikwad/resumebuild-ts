/**
 * ModernSidebarTemplate.tsx
 *
 * ARCHITECTURE RULES (DO NOT BREAK):
 * - ALL styles MUST use inline style={{}} props. NO Tailwind classes for layout.
 *   html2canvas cannot read Tailwind-generated CSS classes.
 * - NO react-icons SVG components. Only Unicode characters or text.
 * - This component is used both in-browser (preview) and captured offscreen
 *   by html2canvas for JPG/PDF export. Keep all layout fully deterministic
 *   in terms of pixel size.
 */

import { useResumeStore } from "../../lib/store";

// ─── Colour constants (matching the reference image exactly) ─────────────────
const SIDEBAR_BG = "#0B1B36";
const SIDEBAR_TEXT = "#FFFFFF";
const SIDEBAR_MUTED = "#94A3B8";
const SIDEBAR_LABEL_BG = "#1E3A5F";
const ACCENT = "#2563EB";
const ACCENT_LIGHT = "#3B82F6";
const MAIN_BG = "#FFFFFF";
const MAIN_TEXT = "#111827";
const MAIN_MUTED = "#4B5563";
const SECTION_BORDER = "#E5E7EB";
const PROGRESS_BG = "#1E3A5F";
const PROGRESS_FILL = "#3B82F6";
const DOT_FILLED = "#3B82F6";
const DOT_EMPTY = "#334155";

// ─── Interest icon map (Unicode fallbacks) ────────────────────────────────────
const INTEREST_ICONS: Record<string, string> = {
  coding: "</>",
  programming: "</>",
  travel: "✈",
  reading: "📖",
  fitness: "🏋",
  gym: "🏋",
  music: "♫",
  gaming: "🎮",
  photography: "📷",
  cooking: "🍳",
  art: "🎨",
  sports: "⚽",
  writing: "✍",
  movies: "🎬",
  yoga: "🧘",
  hiking: "🥾",
};

function getInterestIcon(interest: string): string {
  return INTEREST_ICONS[interest.toLowerCase()] ?? "★";
}

// ─── Sub-components (all inline-styled) ──────────────────────────────────────

function SidebarSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginBottom: 4,
      }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: SIDEBAR_TEXT, letterSpacing: 1.2, textTransform: "uppercase" as const }}>
          {children}
        </span>
      </div>
      <div style={{ height: 1, background: "#1E3A5F", width: "100%" }} />
    </div>
  );
}

function MainSectionTitle({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: ACCENT, display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 13, color: "#fff", flexShrink: 0,
        }}>
          {icon}
        </div>
        <span style={{ fontSize: 14, fontWeight: 700, color: MAIN_TEXT, letterSpacing: 0.5, textTransform: "uppercase" as const }}>
          {children}
        </span>
      </div>
      <div style={{ height: 2, background: SECTION_BORDER, width: "100%" }} />
    </div>
  );
}

function SkillBar({ name, level }: { name: string; level: number }) {
  const pct = Math.min(100, Math.max(0, level));
  return (
    <div style={{ marginBottom: 7 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <span style={{ fontSize: 11, color: SIDEBAR_TEXT }}>{name}</span>
      </div>
      <div style={{ height: 4, borderRadius: 2, background: PROGRESS_BG, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: PROGRESS_FILL, borderRadius: 2 }} />
      </div>
    </div>
  );
}

function DotRating({ level }: { level: number }) {
  // Map 0–100 to 0–5 dots
  const filled = Math.round((level / 100) * 5);
  return (
    <div style={{ display: "flex", gap: 4, marginTop: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} style={{
          width: 9, height: 9, borderRadius: "50%",
          background: i <= filled ? DOT_FILLED : DOT_EMPTY,
        }} />
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ModernSidebarTemplate() {
  const data = useResumeStore();
  const { profile, experience, education, skills, projects, certifications, achievements, languages, interests } = data;

  // Group skills by category for the sidebar
  const skillGroups: Record<string, { name: string; level: number }[]> = {};
  skills.forEach((s) => {
    const cat = s.category?.trim() || "SKILLS";
    if (!skillGroups[cat]) skillGroups[cat] = [];
    skillGroups[cat].push({ name: s.name, level: s.level });
  });
  const skillGroupEntries = Object.entries(skillGroups);

  return (
    <div
      id="resume-preview-container"
      style={{
        display: "flex",
        width: 794,
        minHeight: 1123,
        fontFamily: "'Segoe UI', Arial, sans-serif",
        background: MAIN_BG,
        boxSizing: "border-box",
        fontSize: 12,
        lineHeight: 1.5,
      }}
    >
      {/* ── LEFT SIDEBAR ─────────────────────────────────────────────────── */}
      <div style={{
        width: 230,
        minHeight: "100%",
        background: SIDEBAR_BG,
        flexShrink: 0,
        padding: "32px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        boxSizing: "border-box",
      }}>

        {/* Avatar */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
          {profile.photo ? (
            <img
              src={profile.photo}
              alt="Profile"
              style={{
                width: 110, height: 110, borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #2563EB",
              }}
              crossOrigin="anonymous"
            />
          ) : (
            <div style={{
              width: 110, height: 110, borderRadius: "50%",
              background: SIDEBAR_LABEL_BG,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 36, color: SIDEBAR_TEXT, border: "3px solid #2563EB",
            }}>
              {profile.name?.charAt(0) ?? "?"}
            </div>
          )}
        </div>

        {/* Contact */}
        <div>
          <SidebarSectionTitle>Contact</SidebarSectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {profile.email && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
                <span style={{ color: ACCENT_LIGHT, fontSize: 12, marginTop: 1 }}>✉</span>
                <span style={{ fontSize: 11, color: SIDEBAR_TEXT, wordBreak: "break-all" as const }}>{profile.email}</span>
              </div>
            )}
            {profile.phone && (
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ color: ACCENT_LIGHT, fontSize: 12 }}>✆</span>
                <span style={{ fontSize: 11, color: SIDEBAR_TEXT }}>{profile.phone}</span>
              </div>
            )}
            {profile.address && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
                <span style={{ color: ACCENT_LIGHT, fontSize: 12, marginTop: 1 }}>⊙</span>
                <span style={{ fontSize: 11, color: SIDEBAR_TEXT }}>{profile.address}</span>
              </div>
            )}
            {profile.socialLinks?.linkedin && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
                <span style={{ color: ACCENT_LIGHT, fontSize: 11, marginTop: 1 }}>in</span>
                <span style={{ fontSize: 11, color: SIDEBAR_TEXT, wordBreak: "break-all" as const }}>{profile.socialLinks.linkedin}</span>
              </div>
            )}
            {profile.socialLinks?.github && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
                <span style={{ color: ACCENT_LIGHT, fontSize: 12, marginTop: 1 }}>⌥</span>
                <span style={{ fontSize: 11, color: SIDEBAR_TEXT, wordBreak: "break-all" as const }}>{profile.socialLinks.github}</span>
              </div>
            )}
            {profile.socialLinks?.website && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
                <span style={{ color: ACCENT_LIGHT, fontSize: 12, marginTop: 1 }}>⊕</span>
                <span style={{ fontSize: 11, color: SIDEBAR_TEXT, wordBreak: "break-all" as const }}>{profile.socialLinks.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills grouped by category */}
        {skillGroupEntries.length > 0 && (
          <div>
            <SidebarSectionTitle>Skills</SidebarSectionTitle>
            {skillGroupEntries.map(([cat, items]) => (
              <div key={cat} style={{ marginBottom: 12 }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, color: SIDEBAR_MUTED,
                  letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 6,
                }}>
                  {cat}
                </div>
                {items.map((s, i) => (
                  <SkillBar key={i} name={s.name} level={s.level} />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <SidebarSectionTitle>Languages</SidebarSectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {languages.map((lang, i) => (
                <div key={i}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: SIDEBAR_TEXT }}>{lang.name}</div>
                  <div style={{ fontSize: 10, color: SIDEBAR_MUTED, marginBottom: 2 }}>{lang.proficiency}</div>
                  <DotRating level={lang.level} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interests */}
        {interests && interests.filter(Boolean).length > 0 && (
          <div>
            <SidebarSectionTitle>Interests</SidebarSectionTitle>
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 12 }}>
              {interests.filter(Boolean).map((interest, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, width: 44 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: "50%",
                    background: SIDEBAR_LABEL_BG,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, color: ACCENT_LIGHT,
                  }}>
                    {getInterestIcon(interest)}
                  </div>
                  <span style={{ fontSize: 9, color: SIDEBAR_MUTED, textAlign: "center" as const }}>{interest}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── RIGHT MAIN CONTENT ────────────────────────────────────────────── */}
      <div style={{
        flex: 1,
        padding: "36px 28px 32px 28px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        background: MAIN_BG,
      }}>

        {/* Header — Name + Title */}
        <div style={{ borderBottom: `2px solid ${SECTION_BORDER}`, paddingBottom: 16 }}>
          <div style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.1, letterSpacing: -0.5 }}>
            {(() => {
              const parts = profile.name?.trim().split(" ") ?? ["YOUR", "NAME"];
              const last = parts.pop() ?? "";
              const first = parts.join(" ");
              return (
                <>
                  <span style={{ color: MAIN_TEXT }}>{first} </span>
                  <span style={{ color: ACCENT }}>{last}</span>
                </>
              );
            })()}
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 8, marginTop: 6,
          }}>
            <div style={{ width: 28, height: 2, background: ACCENT }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: MAIN_MUTED, letterSpacing: 2, textTransform: "uppercase" as const }}>
              {profile.title}
            </span>
          </div>
        </div>

        {/* Professional Summary */}
        {profile.summary && (
          <div>
            <MainSectionTitle icon="👤">Professional Summary</MainSectionTitle>
            <p style={{ fontSize: 12, color: MAIN_MUTED, lineHeight: 1.7, margin: 0 }}>
              {profile.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <MainSectionTitle icon="💼">Experience</MainSectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {experience.map((exp, i) => (
                <div key={i} style={{ display: "flex", gap: 12 }}>
                  {/* Timeline dot + line */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 14, flexShrink: 0, paddingTop: 4 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: ACCENT, flexShrink: 0 }} />
                    {i < experience.length - 1 && (
                      <div style={{ width: 2, flex: 1, background: SECTION_BORDER, marginTop: 4 }} />
                    )}
                  </div>
                  {/* Content */}
                  <div style={{ flex: 1, paddingBottom: i < experience.length - 1 ? 4 : 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: MAIN_TEXT }}>{exp.jobTitle}</span>
                      <span style={{ fontSize: 11, color: MAIN_MUTED, whiteSpace: "nowrap" as const, marginLeft: 8 }}>
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: ACCENT, marginBottom: 6, display: "block" }}>{exp.company}</span>
                      {exp.location && <span style={{ fontSize: 11, color: MAIN_MUTED }}>{exp.location}</span>}
                    </div>
                    <div>
                      {exp.description.split("\n").filter(Boolean).map((line, j) => (
                        <div key={j} style={{ display: "flex", gap: 6, marginBottom: 3 }}>
                          <span style={{ color: ACCENT, fontSize: 11, marginTop: 1, flexShrink: 0 }}>•</span>
                          <span style={{ fontSize: 11, color: MAIN_MUTED, lineHeight: 1.6 }}>{line}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <MainSectionTitle icon="📁">Projects</MainSectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {projects.map((proj, i) => (
                <div key={i} style={{
                  border: `1px solid ${SECTION_BORDER}`,
                  borderRadius: 6,
                  padding: "10px 14px",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: MAIN_TEXT }}>{proj.name}</span>
                    {proj.link && (
                      <span style={{ fontSize: 10, color: ACCENT, wordBreak: "break-all" as const, marginLeft: 8 }}>
                        {proj.link} ↗
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 10, color: ACCENT, fontStyle: "italic", marginBottom: 4 }}>{proj.techStack}</div>
                  <div style={{ fontSize: 11, color: MAIN_MUTED, lineHeight: 1.6 }}>{proj.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <MainSectionTitle icon="🎓">Education</MainSectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {education.map((edu, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: MAIN_TEXT }}>{edu.degree}</span>
                    <span style={{ fontSize: 11, color: MAIN_MUTED, whiteSpace: "nowrap" as const, marginLeft: 8 }}>
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 11, color: ACCENT, fontWeight: 600 }}>{edu.institution}</span>
                    {edu.score && <span style={{ fontSize: 11, color: MAIN_MUTED }}>{edu.score}</span>}
                  </div>
                  {edu.description && (
                    <p style={{ fontSize: 11, color: MAIN_MUTED, margin: "4px 0 0 0" }}>{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.filter(Boolean).length > 0 && (
          <div>
            <MainSectionTitle icon="🏆">Certifications</MainSectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {certifications.filter(Boolean).map((cert, i) => (
                <div key={i} style={{ display: "flex", gap: 6 }}>
                  <span style={{ color: ACCENT, fontSize: 11, marginTop: 1, flexShrink: 0 }}>•</span>
                  <span style={{ fontSize: 11, color: MAIN_MUTED }}>{cert}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {achievements.filter(Boolean).length > 0 && (
          <div>
            <MainSectionTitle icon="⭐">Achievements</MainSectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {achievements.filter(Boolean).map((ach, i) => (
                <div key={i} style={{ display: "flex", gap: 6 }}>
                  <span style={{ color: ACCENT, fontSize: 11, marginTop: 1, flexShrink: 0 }}>•</span>
                  <span style={{ fontSize: 11, color: MAIN_MUTED }}>{ach}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
