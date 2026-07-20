"use client";

import { useLocation, useNavigate } from "react-router-dom";
import { ProfileForm } from "../components/FormFields/ProfileForm";
import { ExperienceForm } from "../components/FormFields/ExperienceForm";
import { EducationForm } from "../components/FormFields/EducationForm";
import { SkillsForm } from "../components/FormFields/SkillsForm";
import { LanguagesForm } from "../components/FormFields/LanguagesForm";
import { useResumeStore } from "../lib/store";

export function FormPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const template = queryParams.get("template") || "modern";
  const { setTemplate } = useResumeStore();

  const handleSubmit = () => {
    setTemplate(template);
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
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-3 rounded-md"
          >
            Preview Resume
          </button>
        </div>
      </div>
    </div>
  );
}