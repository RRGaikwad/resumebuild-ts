"use client";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProfileForm } from "../components/FormFields/ProfileForm";
import { ExperienceForm } from "../components/FormFields/ExperienceForm";
import { EducationForm } from "../components/FormFields/EducationForm";
import { SkillsForm } from "../components/FormFields/SkillsForm";
import { LanguagesForm } from "../components/FormFields/LanguagesForm";
import { InterestsForm } from "../components/FormFields/InterestsForm";
import { useResumeStore } from "../lib/store";
import { useAuth } from "../lib/AuthContext";
import { createResume, updateResume } from "../lib/firestoreService";

function calculateAtsScore(data: any): number {
  let filled = 0;
  let total = 5;
  if (data.profile?.name && data.profile?.email) filled++;
  if (data.experience?.length > 0) filled++;
  if (data.education?.length > 0) filled++;
  if (data.categorizedSkills?.length > 0 || data.skills?.length > 0) filled++;
  if (data.projects?.length > 0) filled++;
  
  return Math.round((filled / total) * 100);
}

export function FormPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const templateParam = queryParams.get("template") || "ats-professional";
  
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  // We extract the entire state to save to Firestore
  const state = useResumeStore();
  const { setTemplate, resumeId, setResumeId } = state;

  const handleSubmit = async () => {
    setIsSaving(true);
    setTemplate(templateParam);
    
    if (user) {
      try {
        const title = state.profile.name ? `${state.profile.name}'s Resume` : "Untitled Resume";
        const atsScore = calculateAtsScore(state);
        
        // Prepare data to save, omitting functions and the resumeId itself
        const { setProfile, setExperience, setEducation, setSkills, setCategorizedSkills, setProjects, setCertifications, setAchievements, setLanguages, setTemplate, setResumeId, reset, resumeId: currentId, ...saveData } = state as any;

        if (resumeId) {
          await updateResume(user.uid, resumeId, title, atsScore, saveData);
        } else {
          const newId = await createResume(user.uid, title, templateParam, saveData);
          setResumeId(newId);
        }
      } catch (error) {
        console.error("Failed to save resume to Firestore:", error);
      }
    }
    
    setIsSaving(false);
    navigate("/preview");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Fill Your Resume</h1>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-8">
        <ProfileForm />
        <ExperienceForm />
        <EducationForm />
        <SkillsForm />
        <LanguagesForm />
        <InterestsForm />
        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mx-auto gap-2"
          >
            {isSaving && (
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            )}
            {isSaving ? "Saving..." : "Preview Resume"}
          </button>
        </div>
      </div>
    </div>
  );
}