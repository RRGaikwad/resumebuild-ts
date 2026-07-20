"use client";

import { useNavigate } from "react-router-dom";
import { useResumeStore } from "../lib/store";
import { ExportModal } from "../components/ExportModal";
import { useState } from "react";
import { FiDownload } from "react-icons/fi";

export function PreviewPage() {
  const { template } = useResumeStore();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full flex flex-col space-y-6">
      <div className="flex justify-between items-center bg-white/50 dark:bg-slate-900/50 p-6 rounded-2xl backdrop-blur-sm border border-white/20">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
          Resume Preview
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/form")}
            className="premium-btn premium-btn-secondary"
          >
            Edit Resume
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="premium-btn premium-btn-primary"
          >
            <FiDownload />
            Export
          </button>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-2xl w-full mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="text-center text-slate-500 flex flex-col items-center">
          <p className="text-lg">Template System Offline</p>
          <p className="text-sm mt-2">New premium templates are currently being designed.</p>
        </div>
      </div>

      <ExportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}