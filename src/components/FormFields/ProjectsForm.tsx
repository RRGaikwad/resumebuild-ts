"use client";

import { useResumeStore } from "../../lib/store";

export function ProjectsForm() {
  const { projects, setProjects } = useResumeStore();

  const addProject = () => {
    setProjects([...projects, { name: "", techStack: "", link: "", description: "" }]);
  };

  const updateProject = (index: number, field: keyof (typeof projects)[0], value: string) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
  };

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Projects</h2>
      {projects.map((proj, index) => (
        <div key={index} className="border p-4 rounded-lg space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Name</label>
              <input
                type="text"
                value={proj.name}
                onChange={(e) => updateProject(index, "name", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tech Stack</label>
              <input
                type="text"
                value={proj.techStack}
                onChange={(e) => updateProject(index, "techStack", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="React, Node.js"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Link</label>
              <input
                type="text"
                value={proj.link || ""}
                onChange={(e) => updateProject(index, "link", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="https://..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={proj.description}
                onChange={(e) => updateProject(index, "description", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                rows={3}
              />
            </div>
          </div>
          <button
            onClick={() => removeProject(index)}
            className="text-red-500 text-sm hover:text-red-700 font-medium"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={addProject}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm font-medium"
      >
        Add Project
      </button>
    </div>
  );
}
