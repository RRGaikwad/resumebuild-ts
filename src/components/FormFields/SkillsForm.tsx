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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Skill Name</label>
              <input
                type="text"
                value={skill.name}
                onChange={(e) => updateSkill(index, "name", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="e.g. React.js"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category (optional)</label>
              <input
                type="text"
                value={skill.category ?? ""}
                onChange={(e) => updateSkill(index, "category", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="e.g. Frontend"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Proficiency (0–100)</label>
              <input
                type="number"
                value={skill.level}
                onChange={(e) => updateSkill(index, "level", Number(e.target.value))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                min="0"
                max="100"
              />
            </div>
          </div>
          <button
            onClick={() => removeSkill(index)}
            className="text-red-500 text-sm hover:text-red-700"
          >
            Remove
          </button>
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