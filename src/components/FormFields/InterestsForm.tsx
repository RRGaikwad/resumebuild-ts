"use client";

import { useResumeStore } from "../../lib/store";

export function InterestsForm() {
  const { interests, setInterests } = useResumeStore();

  const addInterest = () => {
    setInterests([...interests, ""]);
  };

  const updateInterest = (index: number, value: string) => {
    const updated = [...interests];
    updated[index] = value;
    setInterests(updated);
  };

  const removeInterest = (index: number) => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Interests</h2>
      <p className="text-sm text-gray-500">
        Add your personal interests (e.g. Coding, Travel, Music). These appear in the sidebar of the Modern Sidebar template.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {interests.map((interest, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={interest}
              onChange={(e) => updateInterest(index, e.target.value)}
              className="flex-1 border border-gray-300 rounded-md shadow-sm p-2 text-sm"
              placeholder="e.g. Coding"
            />
            <button
              onClick={() => removeInterest(index)}
              className="text-red-500 text-xs hover:text-red-700 font-semibold"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addInterest}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm"
      >
        Add Interest
      </button>
    </div>
  );
}
