"use client";

import { useNavigate } from "react-router-dom";
import { useResumeStore } from "../lib/store";
import { useState } from "react";
import { FiDownload, FiEdit2, FiImage, FiFileText, FiPrinter } from "react-icons/fi";
import { ATSProfessionalTemplate } from "../components/templates/ATSProfessionalTemplate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// ─── Export helpers ────────────────────────────────────────────────────────────
// Root cause of previous failures: html2canvas cannot render SVG elements
// (react-icons) and cannot resolve external fonts (@import Google Fonts).
// Fix: ATSProfessionalTemplate uses only inline styles + Unicode chars (no SVGs).
// We also clone the element offscreen so its layout is stable during capture.

async function captureResumeCanvas(): Promise<HTMLCanvasElement> {
  const source = document.querySelector("#resume-preview-container") as HTMLElement;
  if (!source) throw new Error("Resume container not found");

  // Clone into a fixed offscreen container so scrolling / clipping don't cut it off
  const wrapper = document.createElement("div");
  wrapper.style.cssText =
    "position:fixed;top:0;left:-9999px;z-index:-1;pointer-events:none;";
  const clone = source.cloneNode(true) as HTMLElement;
  // Ensure the clone has the explicit pixel width so html2canvas sees full width
  clone.style.width = source.offsetWidth + "px";
  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  try {
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#ffffff",
      logging: false,
      width: source.offsetWidth,
      height: source.scrollHeight,
      windowWidth: source.offsetWidth,
    });
    return canvas;
  } finally {
    document.body.removeChild(wrapper);
  }
}

export function PreviewPage() {
  const { template } = useResumeStore();
  const navigate = useNavigate();
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const handleDownloadJPG = async () => {
    setIsExporting(true);
    setIsExportDropdownOpen(false);
    setExportError(null);
    try {
      const canvas = await captureResumeCanvas();
      const link = document.createElement("a");
      link.download = `resume-${template || "download"}.jpg`;
      link.href = canvas.toDataURL("image/jpeg", 0.95);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("JPG Export failed:", error);
      setExportError("Export failed. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadPDF = async () => {
    setIsExporting(true);
    setIsExportDropdownOpen(false);
    setExportError(null);
    try {
      const canvas = await captureResumeCanvas();
      const imgData = canvas.toDataURL("image/jpeg", 0.95);

      // KEY FIX: Use unit:"px" and match page dimensions to the canvas size
      // (divided by scale factor 2). This means the PDF page IS the resume —
      // no forced A4 scaling, no multi-page slicing, identical output to JPG.
      // The canvas is rendered at scale:2 so CSS pixel dimensions = canvas / 2.
      const cssWidth = canvas.width / 2;
      const cssHeight = canvas.height / 2;

      const pdf = new jsPDF({
        orientation: cssHeight >= cssWidth ? "portrait" : "landscape",
        unit: "px",
        format: [cssWidth, cssHeight],
        hotfixes: ["px_scaling"],
      });

      pdf.addImage(imgData, "JPEG", 0, 0, cssWidth, cssHeight);
      pdf.save(`resume-${template || "download"}.pdf`);
    } catch (error) {
      console.error("PDF Export failed:", error);
      setExportError("Export failed. Please try again.");
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
        <div>
          <h1 className="text-[24px] font-bold text-[#111827]">Resume Preview</h1>
          {exportError && (
            <p className="text-[13px] text-[#EF4444] mt-1">{exportError}</p>
          )}
        </div>
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
              {isExporting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Exporting...
                </span>
              ) : (
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

      {/* The preview is shown with overflow-x:auto so it doesn't break layout on smaller screens */}
      <div className="w-full flex justify-center bg-[#F8FAFC] rounded-[20px] py-8 overflow-x-auto">
        <ATSProfessionalTemplate />
      </div>
    </div>
  );
}