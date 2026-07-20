"use client";

import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { useResumeStore } from "../lib/store";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const { template } = useResumeStore();

  const handleDownloadJPG = async () => {
    const resume = document.querySelector(".max-w-4xl.mx-auto") as HTMLElement;
    if (!resume) return;

    const canvas = await html2canvas(resume);
    const link = document.createElement("a");
    link.download = `resume-${template}.jpg`;
    link.href = canvas.toDataURL("image/jpeg");
    link.click();
  };

  const handleDownloadPDF = async () => {
    const resume = document.querySelector(".max-w-4xl.mx-auto") as HTMLElement;
    if (!resume) return;

    const canvas = await html2canvas(resume);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
    });
    const imgData = canvas.toDataURL("image/jpeg");
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
    pdf.save(`resume-${template}.pdf`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <DialogTitle className="text-xl font-bold mb-4">Export Resume</DialogTitle>
          <div className="space-y-4">
            <button
              onClick={handleDownloadJPG}
              className="w-full bg-blue-500 text-white py-3 rounded-md"
            >
              Download as JPG
            </button>
            <button
              onClick={handleDownloadPDF}
              className="w-full bg-blue-500 text-white py-3 rounded-md"
            >
              Download as PDF
            </button>
            <button
              onClick={handlePrint}
              className="w-full bg-blue-500 text-white py-3 rounded-md"
            >
              Print Resume
            </button>
            <button
              onClick={onClose}
              className="w-full bg-gray-500 text-white py-3 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}