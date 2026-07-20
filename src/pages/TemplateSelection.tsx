"use client";

import { TemplateCard } from "../components/TemplateCard";

export function TemplateSelection() {
  const templates = [
    {
      title: "New Template Coming Soon",
      description: "A premium, print-friendly layout designed for the new system.",
      image: "",
      templateId: "new-modern",
    },
  ];

  return (
    <div className="w-full flex flex-col space-y-8 p-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
          Choose a Template
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Select a premium design for your resume.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template, index) => (
          <TemplateCard key={index} {...template} />
        ))}
      </div>
    </div>
  );
}