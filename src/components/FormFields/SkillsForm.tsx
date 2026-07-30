"use client";

import { useResumeStore } from "../../lib/store";

export function SkillsForm() {
  const { skills, setSkills } = useResumeStore();

  const addSkill = () => {
    setSkills([...skills, { name: "", level: 75, category: "" }]);
  };

  const updateSkill = (index: number, field: keyof (typeof skills)[0], value: string | number) => {
    const updatedSkills = [...skills];
    (updatedSkills[index] as any)[field] = value;
    setSkills(updatedSkills);
  };

  const removeSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Skills</h2>
      <p className="text-sm text-gray-500">
        Add individual skills with a proficiency level (0–100). Optionally, assign a <strong>Category</strong> (e.g. "Frontend", "Backend") to group them in templates that support it.
      </p>
      {skills.map((skill, index) => (
        <div key={index} className="border p-4 rounded-lg space-y-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Skill {index + 1}</h3>
            <button
              onClick={() => removeSkill(index)}
              className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors flex items-center justify-center"
              aria-label="Remove Skill"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Skill Name</label>
              <input
                type="text"
                value={skill.name}
                onChange={(e) => updateSkill(index, "name", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="e.g. React.js"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category (optional)</label>
              <input
                type="text"
                value={skill.category ?? ""}
                onChange={(e) => updateSkill(index, "category", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="e.g. Frontend"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Proficiency (0–100)</label>
              <input
                type="number"
                value={skill.level}
                onChange={(e) => updateSkill(index, "level", Number(e.target.value))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                min="0"
                max="100"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={addSkill}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Add Skill
      </button>
    </div>
  );
}