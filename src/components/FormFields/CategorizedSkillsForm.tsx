"use client";

import { useResumeStore } from "../../lib/store";

export function CategorizedSkillsForm() {
  const { categorizedSkills, setCategorizedSkills } = useResumeStore();

  const addSkill = () => {
    setCategorizedSkills([...categorizedSkills, { category: "", items: "" }]);
  };

  const updateSkill = (index: number, field: keyof (typeof categorizedSkills)[0], value: string) => {
    const updatedSkills = [...categorizedSkills];
    updatedSkills[index][field] = value;
    setCategorizedSkills(updatedSkills);
  };

  const removeSkill = (index: number) => {
    const updatedSkills = categorizedSkills.filter((_, i) => i !== index);
    setCategorizedSkills(updatedSkills);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Skills (Categorized)</h2>
      <p className="text-sm text-gray-500">
        Group your skills by category (e.g. "Languages", "Frameworks"). Comma-separate the items.
      </p>
      {categorizedSkills.map((skill, index) => (
        <div key={index} className="border p-4 rounded-lg space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                value={skill.category}
                onChange={(e) => updateSkill(index, "category", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="e.g. Frameworks"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Items</label>
              <input
                type="text"
                value={skill.items}
                onChange={(e) => updateSkill(index, "items", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="React, Vue, Angular"
              />
            </div>
          </div>
          <button
            onClick={() => removeSkill(index)}
            className="text-red-500 text-sm hover:text-red-700 font-medium"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={addSkill}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm font-medium"
      >
        Add Skill Category
      </button>
    </div>
  );
}
