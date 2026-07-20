"use client";

import { create } from "zustand";

// Define types for resume data
interface Profile {
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
  };
}

interface Experience {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Skill {
  name: string;
  level: number; // 0-100
}

interface Language {
  name: string;
  level: number; // 0-100
}

interface ResumeData {
  profile: Profile;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  template: string;
}

// Initial state
const initialState: ResumeData = {
  profile: {
    name: "",
    title: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
    photo: "",
    socialLinks: {},
  },
  experience: [],
  education: [],
  skills: [],
  languages: [],
  template: "modern",
};

// Create store
interface ResumeStore extends ResumeData {
  setProfile: (profile: Partial<Profile>) => void;
  setExperience: (experience: Experience[]) => void;
  setEducation: (education: Education[]) => void;
  setSkills: (skills: Skill[]) => void;
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
  setLanguages: (languages) => set({ languages }),
  setTemplate: (template) => set({ template }),
  reset: () => set(initialState),
}));