"use client";

import { useResumeStore } from "../../lib/store";

export function AchievementsForm() {
  const { achievements, setAchievements } = useResumeStore();

  const addAchievement = () => {
    setAchievements([...achievements, ""]);
  };

  const updateAchievement = (index: number, value: string) => {
    const updated = [...achievements];
    updated[index] = value;
    setAchievements(updated);
  };

  const removeAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Achievements</h2>
      <div className="space-y-3">
        {achievements.map((ach, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={ach}
              onChange={(e) => updateAchievement(index, e.target.value)}
              className="flex-1 border border-gray-300 rounded-md shadow-sm p-2 text-sm"
              placeholder="e.g. Employee of the Month - 2023"
            />
            <button
              onClick={() => removeAchievement(index)}
              className="text-red-500 text-xs hover:text-red-700 font-semibold"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addAchievement}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm font-medium"
      >
        Add Achievement
      </button>
    </div>
  );
}
