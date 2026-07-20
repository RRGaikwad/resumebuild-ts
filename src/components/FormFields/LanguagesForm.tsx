"use client";

import { useResumeStore } from "../../lib/store";

export function LanguagesForm() {
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Language Name</label>
              <input
                type="text"
                value={language.name}
                onChange={(e) => updateLanguage(index, "name", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Proficiency (0-100)</label>
              <input
                type="number"
                value={language.level}
                onChange={(e) => updateLanguage(index, "level", Number(e.target.value))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                min="0"
                max="100"
              />
            </div>
          </div>
          <button
            onClick={() => removeLanguage(index)}
            className="text-red-500 text-sm"
          >
            Remove
          </button>
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