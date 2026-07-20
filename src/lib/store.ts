"use client";

import { create } from "zustand";

// Define types for resume data (Superset for all templates)
export interface Profile {
  name: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  photo?: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
}

export interface Experience {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  location?: string;
  description: string; // Bullet points usually separated by newlines
}

export interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  score?: string; // CGPA or percentage
  description: string;
}

export interface Project {
  name: string;
  techStack: string;
  link?: string;
  description: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100 (for progress bar templates)
}

export interface CategorizedSkill {
  category: string;
  items: string; // Comma separated items
}

export interface Language {
  name: string;
  proficiency: string; // Native, Professional, etc.
  level: number; // 0-100
}

export interface ResumeData {
  profile: Profile;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  categorizedSkills: CategorizedSkill[];
  projects: Project[];
  certifications: string[];
  achievements: string[];
  languages: Language[];
  template: string;
}

// Initial state - Populated with dummy data exactly matching the user's ATS Template image
const initialState: ResumeData = {
  profile: {
    name: "ROHAN GAIKWAD",
    title: "FULL STACK DEVELOPER",
    email: "rohan.gaikwad@email.com",
    phone: "+91 98765 43210",
    address: "Pune, Maharashtra, India",
    summary: "Motivated and detail-oriented Full Stack Developer with 2+ years of experience in designing, developing, and deploying scalable web applications. Proficient in modern JavaScript frameworks, backend technologies, and databases. Passionate about solving real-world problems and delivering clean, efficient, and user-friendly solutions.",
    socialLinks: {
      linkedin: "linkedin.com/in/rohan-gaikwad",
      github: "github.com/rohan27",
      website: "rohangaikwad.dev"
    },
  },
  experience: [
    {
      jobTitle: "Full Stack Developer",
      company: "TechSuccession Pvt. Ltd.",
      startDate: "Jan 2023",
      endDate: "Present",
      location: "Pune, India",
      description: "Developed and maintained responsive web applications using React.js, Node.js, and Express.js.\nBuilt RESTful APIs and integrated third-party services to enhance application functionality.\nOptimized front-end performance and improved user experience, resulting in a 25% increase in user engagement.\nCollaborated with cross-functional teams to define, design, and ship new features.\nDeployed applications on AWS using CI/CD pipelines, improving deployment efficiency by 30%."
    },
    {
      jobTitle: "Junior Developer",
      company: "CodeCraft Solutions",
      startDate: "Jul 2021",
      endDate: "Dec 2022",
      location: "Pune, India",
      description: "Assisted in developing and testing web applications using HTML, CSS, JavaScript, and PHP.\nWorked on bug fixes and performance improvements for existing systems.\nParticipated in code reviews and contributed to team knowledge sharing.\nIntegrated MySQL databases and optimized queries for better performance."
    }
  ],
  projects: [
    {
      name: "Expense Tracker PWA",
      techStack: "React.js, Node.js, IndexedDB, PWA",
      link: "https://expense-tracker.app",
      description: "A Progressive Web App to track income and expenses with offline support, data visualization, and secure authentication."
    },
    {
      name: "Academy Management System",
      techStack: "HTML, CSS, JavaScript, Supabase",
      link: "https://academy.techsuccession.in",
      description: "A complete management system for coaching institutes to handle students, courses, attendance, and fee management."
    }
  ],
  education: [
    {
      degree: "Bachelor of Commerce (Computer Applications)",
      institution: "Savitribai Phule Pune University (SPPU), Pune",
      startDate: "2020",
      endDate: "2023",
      score: "CGPA: 8.67",
      description: ""
    }
  ],
  skills: [], // Universal flat skills
  categorizedSkills: [
    { category: "Languages", items: "JavaScript, HTML, CSS, PHP, SQL" },
    { category: "Frontend", items: "React.js, Bootstrap, Tailwind CSS" },
    { category: "Backend", items: "Node.js, Express.js, PHP" },
    { category: "Database", items: "MySQL, Supabase, Firebase" },
    { category: "Tools & Others", items: "Git, GitHub, AWS, Docker, Postman, VS Code" }
  ],
  certifications: [
    "Full Stack Web Development - Udemy (2023)",
    "JavaScript Algorithms and Data Structures - freeCodeCamp (2022)",
    "AWS Cloud Practitioner Essentials - AWS (2023)"
  ],
  achievements: [
    "Secured 1st place in University-Level Hackathon 2022.",
    "Developed and deployed 5+ live projects used by real clients.",
    "Maintained 100% client satisfaction in project deliveries."
  ],
  languages: [
    { name: "English", proficiency: "Professional Proficiency", level: 90 },
    { name: "Marathi", proficiency: "Native Proficiency", level: 100 },
    { name: "Hindi", proficiency: "Professional Proficiency", level: 85 }
  ],
  template: "ats-professional",
};

export interface ResumeStore extends ResumeData {
  setProfile: (profile: Partial<Profile>) => void;
  setExperience: (experience: Experience[]) => void;
  setEducation: (education: Education[]) => void;
  setSkills: (skills: Skill[]) => void;
  setCategorizedSkills: (categorizedSkills: CategorizedSkill[]) => void;
  setProjects: (projects: Project[]) => void;
  setCertifications: (certifications: string[]) => void;
  setAchievements: (achievements: string[]) => void;
  setLanguages: (languages: Language[]) => void;
  setTemplate: (template: string) => void;
  reset: () => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  ...initialState,
  setProfile: (profile) => set((state) => ({ profile: { ...state.profile, ...profile } })),
  setExperience: (experience) => set({ experience }),
  setEducation: (education) => set({ education }),
  setSkills: (skills) => set({ skills }),
  setCategorizedSkills: (categorizedSkills) => set({ categorizedSkills }),
  setProjects: (projects) => set({ projects }),
  setCertifications: (certifications) => set({ certifications }),
  setAchievements: (achievements) => set({ achievements }),
  setLanguages: (languages) => set({ languages }),
  setTemplate: (template) => set({ template }),
  reset: () => set(initialState),
}));