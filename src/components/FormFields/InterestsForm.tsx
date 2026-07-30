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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {interests.map((interest, index) => (
          <div key={index} className="flex items-center gap-2 min-w-0">
            <input
              type="text"
              value={interest}
              onChange={(e) => updateInterest(index, e.target.value)}
              className="flex-1 min-w-0 border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="e.g. Coding"
            />
            <button
              onClick={() => removeInterest(index)}
              className="text-gray-400 hover:text-red-500 hover:bg-red-50 w-[32px] h-[32px] rounded-md transition-colors shrink-0 flex items-center justify-center"
              aria-label="Remove Interest"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
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
