"use client";

import { useResumeStore } from "../../lib/store";

export function CertificationsForm() {
  const { certifications, setCertifications } = useResumeStore();

  const addCertification = () => {
    setCertifications([...certifications, ""]);
  };

  const updateCertification = (index: number, value: string) => {
    const updated = [...certifications];
    updated[index] = value;
    setCertifications(updated);
  };

  const removeCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Certifications</h2>
      <div className="space-y-3">
        {certifications.map((cert, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={cert}
              onChange={(e) => updateCertification(index, e.target.value)}
              className="flex-1 border border-gray-300 rounded-md shadow-sm p-2 text-sm"
              placeholder="e.g. AWS Certified Solutions Architect"
            />
            <button
              onClick={() => removeCertification(index)}
              className="text-red-500 text-xs hover:text-red-700 font-semibold"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addCertification}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm font-medium"
      >
        Add Certification
      </button>
    </div>
  );
}
