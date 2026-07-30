"use client";

import { useNavigate } from "react-router-dom";
import { useResumeStore } from "../lib/store";
import { useState, useRef, useEffect } from "react";
import { FiDownload, FiEdit2, FiImage, FiFileText, FiPrinter } from "react-icons/fi";
import { ATSProfessionalTemplate } from "../components/templates/ATSProfessionalTemplate";
import { ModernSidebarTemplate } from "../components/templates/ModernSidebarTemplate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useAuth } from "../lib/AuthContext";
import { logActivity } from "../lib/firestoreService";

// ─── Template widths (must match the fixed width in each template component) ──
const TEMPLATE_WIDTHS: Record<string, number> = {
  "ats-professional": 850,
  "modern-sidebar": 794,
};

// ─── Export helper ─────────────────────────────────────────────────────────────
// KEY: We force the wrapper to the template's FULL design width before capture.
// This prevents mobile viewports from clipping or scaling the output.
async function captureResumeCanvas(templateId: string): Promise<HTMLCanvasElement> {
  const source = document.querySelector("#resume-preview-container") as HTMLElement;
  if (!source) throw new Error("Resume container not found");

  const designWidth = TEMPLATE_WIDTHS[templateId] ?? 850;

  // Clone into a fixed offscreen container at full design width
  const wrapper = document.createElement("div");
  wrapper.style.cssText =
    `position:fixed;top:0;left:-${designWidth + 100}px;z-index:-1;pointer-events:none;width:${designWidth}px;overflow:visible;`;

  const clone = source.cloneNode(true) as HTMLElement;
  // Reset any transform-origin / scale that might have been applied for mobile view
  clone.style.transform = "none";
  clone.style.transformOrigin = "unset";
  clone.style.width = designWidth + "px";
  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  try {
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#ffffff",
      logging: false,
      width: designWidth,
      height: clone.scrollHeight,
      windowWidth: designWidth,
    });
    return canvas;
  } finally {
    document.body.removeChild(wrapper);
  }
}

// ─── Component ─────────────────────────────────────────────────────────────────
export function PreviewPage() {
  const { template } = useResumeStore();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const previewWrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const templateId = template ?? "ats-professional";
  const designWidth = TEMPLATE_WIDTHS[templateId] ?? 850;

  // Dynamically compute the CSS scale so the template fits the preview container
  useEffect(() => {
    function computeScale() {
      if (!previewWrapperRef.current) return;
      const containerWidth = previewWrapperRef.current.clientWidth - 32; // 16px padding each side
      if (containerWidth < designWidth) {
        setScale(containerWidth / designWidth);
      } else {
        setScale(1);
      }
    }
    computeScale();
    window.addEventListener("resize", computeScale);
    return () => window.removeEventListener("resize", computeScale);
  }, [designWidth]);

  const handleDownloadJPG = async () => {
    setIsExporting(true);
    setIsExportDropdownOpen(false);
    setExportError(null);
    try {
      const canvas = await captureResumeCanvas(templateId);
      const link = document.createElement("a");
      link.download = `resume-${templateId}.jpg`;
      link.href = canvas.toDataURL("image/jpeg", 0.95);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (user) {
        logActivity(user.uid, `Downloaded resume as JPG`, "download").catch(console.error);
      }
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
      const canvas = await captureResumeCanvas(templateId);
      const imgData = canvas.toDataURL("image/jpeg", 0.95);

      // canvas is rendered at scale:2, so CSS dimensions are canvas / 2
      const cssWidth = canvas.width / 2;
      const cssHeight = canvas.height / 2;

      const pdf = new jsPDF({
        orientation: cssHeight >= cssWidth ? "portrait" : "landscape",
        unit: "px",
        format: [cssWidth, cssHeight],
        hotfixes: ["px_scaling"],
      });

      pdf.addImage(imgData, "JPEG", 0, 0, cssWidth, cssHeight);
      pdf.save(`resume-${templateId}.pdf`);

      if (user) {
        logActivity(user.uid, `Downloaded resume as PDF`, "download").catch(console.error);
      }
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
    <div className="w-full flex flex-col gap-[24px] md:gap-[32px] animate-in fade-in duration-500 pb-[32px]">

      {/* ─── Toolbar ─── */}
      <div className="flex flex-wrap justify-between items-center gap-3 bg-white border border-[#E5E7EB] p-[16px] md:p-[24px] rounded-[20px] shadow-sm">
        <div>
          <h1 className="text-[20px] md:text-[24px] font-bold text-[#111827]">Resume Preview</h1>
          <p className="text-[13px] text-[#6B7280] mt-0.5 hidden md:block">
            Your resume is ready. Export it as PDF or JPG.
          </p>
          {exportError && (
            <p className="text-[13px] text-[#EF4444] mt-1">{exportError}</p>
          )}
        </div>
        <div className="flex gap-3">
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

      {/* ─── Mobile scale hint ─── */}
      {scale < 1 && (
        <p className="text-center text-[12px] text-[#9CA3AF] -mt-2">
          Pinch to zoom · Exports always in full quality
        </p>
      )}

      {/* ─── Preview container ─────────────────────────────────────────────────
          The outer div measures available width. The inner div holds the template
          at its FULL design width, then scaled down with CSS transform so it fits
          the screen visually — without affecting what html2canvas captures.
      ──────────────────────────────────────────────────────────────────────── */}
      <div
        ref={previewWrapperRef}
        className="w-full flex justify-center bg-[#F8FAFC] rounded-[20px] py-6 md:py-8 overflow-x-auto"
        style={{
          // When scaling, shrink the wrapper height to match scaled template height
          // so there's no extra white space below
          minHeight: scale < 1 ? `${Math.round(1100 * scale) + 48}px` : undefined,
        }}
      >
        {/* Scale wrapper — transforms visually but doesn't change DOM layout */}
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            // Keep the container's actual width the full design width
            width: `${designWidth}px`,
            // Adjust the element's layout height so no gap appears below when scaled
            marginBottom: scale < 1 ? `${Math.round(1100 * (scale - 1))}px` : 0,
          }}
        >
          {templateId === "modern-sidebar"
            ? <ModernSidebarTemplate />
            : <ATSProfessionalTemplate />
          }
        </div>
      </div>
    </div>
  );
}