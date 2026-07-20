"use client";

import { useNavigate } from "react-router-dom";
import { useResumeStore } from "../lib/store";
import { ExportModal } from "../components/ExportModal";
import { useState } from "react";
import { FiDownload, FiEdit2 } from "react-icons/fi";
import { ATSProfessionalTemplate } from "../components/templates/ATSProfessionalTemplate";

export function PreviewPage() {
  const { template } = useResumeStore();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full flex flex-col gap-[32px] animate-in fade-in duration-500 pb-[32px]">
      <div className="flex justify-between items-center bg-white border border-[#E5E7EB] p-[24px] rounded-[20px] shadow-sm">
        <h1 className="text-[24px] font-bold text-[#111827]">
          Resume Preview
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/form")}
            className="premium-btn-secondary"
          >
            <FiEdit2 />
            Edit
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="premium-btn-primary"
          >
            <FiDownload />
            Export
          </button>
        </div>
      </div>

      <div className="w-full flex justify-center bg-[#F8FAFC] rounded-[20px] py-8">
        {/* Render template dynamically based on selected template string in the future, for now it's ats-professional */}
        <ATSProfessionalTemplate />
      </div>

      <ExportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}