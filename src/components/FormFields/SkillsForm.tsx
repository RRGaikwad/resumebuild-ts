"use client";

import { useResumeStore } from "../../lib/store";

export function SkillsForm() {
  const { skills, setSkills } = useResumeStore();

  const addSkill = () => {
    setSkills([...skills, { name: "", level: 50 }]);
  };

  const updateSkill = (index: number, field: keyof (typeof skills)[0], value: string | number) => {
    const updatedSkills = [...skills];
    if (field === "name") {
      updatedSkills[index][field] = value as string;
    } else {
      updatedSkills[index][field] = value as number;
    }
    setSkills(updatedSkills);
  };

  const removeSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Skills</h2>
      {skills.map((skill, index) => (
        <div key={index} className="border p-4 rounded-lg space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Skill Name</label>
              <input
                type="text"
                value={skill.name}
                onChange={(e) => updateSkill(index, "name", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Proficiency (0-100)</label>
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
            className="text-red-500 text-sm"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={addSkill}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Add Skill
      </button>
    </div>
  );
}