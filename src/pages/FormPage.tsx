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
        
        // Prepare data to save, explicitly extracting only data properties
        const saveData = {
          profile: state.profile,
          experience: state.experience,
          education: state.education,
          skills: state.skills,
          categorizedSkills: state.categorizedSkills,
          projects: state.projects,
          certifications: state.certifications,
          achievements: state.achievements,
          languages: state.languages,
          interests: state.interests,
        };

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
    <div className="w-full flex flex-col gap-[24px] md:gap-[32px] animate-in fade-in duration-500 pb-[32px]">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-[28px] md:text-[40px] font-bold text-[#111827]">Resume Editor</h1>
        <p className="text-[15px] text-[#6B7280]">Fill in your details to build your resume.</p>
      </div>

      {/* Form card */}
      <div className="bg-white rounded-[20px] border border-[#E5E7EB] shadow-sm p-[16px] md:p-[32px] space-y-8">
        <ProfileForm />
        <ExperienceForm />
        <EducationForm />
        <SkillsForm />
        <LanguagesForm />
        <InterestsForm />

        {/* Submit */}
        <div className="flex justify-end pt-4 border-t border-[#E5E7EB]">
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="premium-btn-primary min-w-[180px] justify-center"
          >
            {isSaving ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Saving...
              </>
            ) : (
              "Preview Resume →"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}