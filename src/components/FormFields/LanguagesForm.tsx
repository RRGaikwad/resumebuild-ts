"use client";

import { useResumeStore } from "../../lib/store";

interface LanguagesFormProps {
  template: string;
}

export function LanguagesForm({ template }: LanguagesFormProps) {
  const { languages, setLanguages } = useResumeStore();

  const addLanguage = () => {
    setLanguages([...languages, { name: "", level: 50 }]);
  };

  const updateLanguage = (index: number, field: keyof (typeof languages)[0], value: string | number) => {
    const updatedLanguages = [...languages];
    if (field === "name") {
      updatedLanguages[index][field] = value as string;
    } else {
      updatedLanguages[index][field] = value as number;
    }
    setLanguages(updatedLanguages);
  };

  const removeLanguage = (index: number) => {
    const updatedLanguages = languages.filter((_, i) => i !== index);
    setLanguages(updatedLanguages);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Languages</h2>
      {languages.map((language, index) => (
        <div key={index} className="border p-4 rounded-lg space-y-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Language {index + 1}</h3>
            <button
              onClick={() => removeLanguage(index)}
              className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors flex items-center justify-center"
              aria-label="Remove Language"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Language Name</label>
              <input
                type="text"
                value={language.name}
                onChange={(e) => updateLanguage(index, "name", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder={template === "ats-professional" ? "e.g. English, Native" : "e.g. English"}
              />
            </div>
            {template !== "ats-professional" && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Proficiency (0-100)</label>
                <input
                  type="number"
                  value={language.level}
                  onChange={(e) => updateLanguage(index, "level", Number(e.target.value))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  min="0"
                  max="100"
                />
              </div>
            )}
          </div>
        </div>
      ))}
      <button
        onClick={addLanguage}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Add Language
      </button>
    </div>
  );
}