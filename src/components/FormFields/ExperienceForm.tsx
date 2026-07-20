"use client";

import { useResumeStore } from "../../lib/store";

export function ExperienceForm() {
  const { experience, setExperience } = useResumeStore();

  const addExperience = () => {
    setExperience([...experience, { jobTitle: "", company: "", startDate: "", endDate: "", description: "" }]);
  };

  const updateExperience = (index: number, field: keyof (typeof experience)[0], value: string) => {
    const updatedExperience = [...experience];
    updatedExperience[index][field] = value;
    setExperience(updatedExperience);
  };

  const removeExperience = (index: number) => {
    const updatedExperience = experience.filter((_, i) => i !== index);
    setExperience(updatedExperience);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Experience</h2>
      {experience.map((exp, index) => (
        <div key={index} className="border p-4 rounded-lg space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Title</label>
              <input
                type="text"
                value={exp.jobTitle}
                onChange={(e) => updateExperience(index, "jobTitle", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateExperience(index, "company", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="text"
                value={exp.startDate}
                onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="text"
                value={exp.endDate}
                onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={exp.description}
                onChange={(e) => updateExperience(index, "description", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
          <button
            onClick={() => removeExperience(index)}
            className="text-red-500 text-sm"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={addExperience}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Add Experience
      </button>
    </div>
  );
}