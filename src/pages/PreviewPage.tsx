"use client";

import { useNavigate } from "react-router-dom";
import { useResumeStore } from "../lib/store";
import { useState } from "react";
import { FiDownload, FiEdit2, FiImage, FiFileText, FiPrinter } from "react-icons/fi";
import { ATSProfessionalTemplate } from "../components/templates/ATSProfessionalTemplate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function PreviewPage() {
  const { template } = useResumeStore();
  const navigate = useNavigate();
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleDownloadJPG = async () => {
    setIsExporting(true);
    setIsExportDropdownOpen(false);
    try {
      const resume = document.querySelector("#resume-preview-container") as HTMLElement;
      if (!resume) throw new Error("Resume container not found");
      
      const canvas = await html2canvas(resume, { 
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      const link = document.createElement("a");
      link.download = `resume-${template}.jpg`;
      link.href = canvas.toDataURL("image/jpeg");
      link.click();
    } catch (error) {
      console.error("Export failed", error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadPDF = async () => {
    setIsExporting(true);
    setIsExportDropdownOpen(false);
    try {
      const resume = document.querySelector("#resume-preview-container") as HTMLElement;
      if (!resume) throw new Error("Resume container not found");

      const canvas = await html2canvas(resume, { 
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const imgData = canvas.toDataURL("image/jpeg");
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`resume-${template}.pdf`);
    } catch (error) {
      console.error("Export failed", error);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    setIsExportDropdownOpen(false);
    window.print();
  };

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
            disabled={isExporting}
          >
            <FiEdit2 />
            Edit
          </button>
          
          <div className="relative">
            <button
              onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
              className="premium-btn-primary"
              disabled={isExporting}
            >
              {isExporting ? "Exporting..." : (
                <>
                  <FiDownload />
                  Export
                </>
              )}
            </button>

            {isExportDropdownOpen && !isExporting && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsExportDropdownOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#E5E7EB] rounded-[12px] shadow-lg z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <button onClick={handleDownloadPDF} className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 text-[14px] font-medium text-[#111827] border-b border-[#E5E7EB]">
                    <FiFileText className="text-[#2563EB]" />
                    Download PDF
                  </button>
                  <button onClick={handleDownloadJPG} className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 text-[14px] font-medium text-[#111827] border-b border-[#E5E7EB]">
                    <FiImage className="text-[#2563EB]" />
                    Download JPG
                  </button>
                  <button onClick={handlePrint} className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 text-[14px] font-medium text-[#111827]">
                    <FiPrinter className="text-[#2563EB]" />
                    Print Resume
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center bg-[#F8FAFC] rounded-[20px] py-8">
        <ATSProfessionalTemplate />
      </div>
    </div>
  );
}