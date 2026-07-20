"use client";

import { useResumeStore } from "../../lib/store";

export function EducationForm() {
  const { education, setEducation } = useResumeStore();

  const addEducation = () => {
    setEducation([...education, { institution: "", degree: "", startDate: "", endDate: "", description: "" }]);
  };

  const updateEducation = (index: number, field: keyof (typeof education)[0], value: string) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  };

  const removeEducation = (index: number) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    setEducation(updatedEducation);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Education</h2>
      {education.map((edu, index) => (
        <div key={index} className="border p-4 rounded-lg space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Institution</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => updateEducation(index, "institution", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateEducation(index, "degree", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="text"
                value={edu.startDate}
                onChange={(e) => updateEducation(index, "startDate", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="text"
                value={edu.endDate}
                onChange={(e) => updateEducation(index, "endDate", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={edu.description}
                onChange={(e) => updateEducation(index, "description", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
          <button
            onClick={() => removeEducation(index)}
            className="text-red-500 text-sm"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={addEducation}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Add Education
      </button>
    </div>
  );
}