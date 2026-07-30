import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useResumeStore } from "../../lib/store";
import { useAuth } from "../../lib/AuthContext";
import { deleteResume } from "../../lib/firestoreService";
import type { ResumeDocument } from "../../lib/firestoreService";

interface ResumeListItemProps {
  resume: ResumeDocument;
  isLatest?: boolean;
}

function timeAgo(ts: any): string {
  if (!ts?.toDate) return "recently";
  const diff = (Date.now() - ts.toDate().getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return ts.toDate().toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export function ResumeListItem({ resume, isLatest }: ResumeListItemProps) {
  const score = resume.atsScore || 0;
  const navigate = useNavigate();
  const { loadResume } = useResumeStore();
  const { user } = useAuth();
  
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEdit = () => {
    loadResume(resume.id, resume.data as any);
    navigate(`/form?template=${resume.template}`);
  };

  const handleDelete = async () => {
    if (!user) return;
    if (window.confirm(`Are you sure you want to delete "${resume.title}"?`)) {
      try {
        await deleteResume(user.uid, resume.id, resume.title);
      } catch (err) {
        console.error("Failed to delete", err);
      }
    }
    setShowMenu(false);
  };

  const scoreColor =
    score >= 90
      ? "text-[#16A34A]"
      : score >= 75
      ? "text-[#2563EB]"
      : "text-[#F59E0B]";

  const gradientId = `gradient-${resume.id}`;
  const gradientStops =
    score >= 90
      ? { start: "#22c55e", end: "#16a34a" } // Green
      : score >= 75
      ? { start: "#60a5fa", end: "#2563eb" } // Blue
      : { start: "#fbbf24", end: "#d97706" }; // Yellow/Orange

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-4 sm:py-0 sm:h-[72px] border-b border-[#E5E7EB] hover:bg-[#F8FAFC] transition-colors group last:border-0 gap-3 sm:gap-0">
      
      {/* Left: Thumbnail + Info */}
      <div className="flex items-center gap-3 min-w-0 cursor-pointer" onClick={handleEdit}>
        {/* Mini document thumbnail */}
        <div className="w-[34px] h-[46px] bg-white border border-[#E5E7EB] rounded-[4px] shadow-sm flex-shrink-0 relative overflow-hidden group-hover:border-[#2563EB]/40 group-hover:shadow-md transition-all">
          <div className="absolute top-2 left-1.5 right-1.5 space-y-[3px]">
            <div className="h-[2px] w-full bg-[#E5E7EB] rounded group-hover:bg-[#BFDBFE] transition-colors" />
            <div className="h-[2px] w-3/4 bg-[#E5E7EB] rounded group-hover:bg-[#BFDBFE] transition-colors" />
            <div className="h-[2px] w-full bg-[#E5E7EB] rounded group-hover:bg-[#BFDBFE] transition-colors" />
            <div className="h-[2px] w-5/6 bg-[#E5E7EB] rounded group-hover:bg-[#BFDBFE] transition-colors" />
            <div className="h-[2px] w-2/3 bg-[#E5E7EB] rounded group-hover:bg-[#BFDBFE] transition-colors" />
          </div>
        </div>

        {/* Title + Updated */}
        <div className="flex flex-col justify-center min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-semibold text-[15px] text-[#111827] leading-tight truncate group-hover:text-[#2563EB] transition-colors">{resume.title}</h4>
            {isLatest && (
              <span className="bg-[#2563EB]/10 text-[#2563EB] text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider shrink-0">
                Latest
              </span>
            )}
          </div>
          <p className="text-[13px] text-[#6B7280] leading-tight mt-0.5">Updated {timeAgo(resume.updatedAt)}</p>
        </div>
      </div>

      {/* Right: ATS score + Actions */}
      <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-5 shrink-0 pl-[46px] sm:pl-0">
        
        {/* ATS Score ring (Attractive!) */}
        <div className="flex items-center gap-2" title="ATS Compatibility Score">
          <div className="relative w-9 h-9 flex-shrink-0 flex items-center justify-center bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#F3F4F6]">
            <svg className="w-full h-full transform -rotate-90 absolute inset-0" viewBox="0 0 36 36">
              <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={gradientStops.start} />
                  <stop offset="100%" stopColor={gradientStops.end} />
                </linearGradient>
              </defs>
              <path
                className="stroke-[#F3F4F6] fill-none"
                strokeWidth="2.5"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="fill-none drop-shadow-sm"
                stroke={`url(#${gradientId})`}
                strokeWidth="2.5"
                strokeDasharray={`${score}, 100`}
                strokeLinecap="round"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className={clsx("absolute text-[11px] font-extrabold tracking-tight", scoreColor)}>
              {score}
            </span>
          </div>
          <div className="hidden xs:flex flex-col w-[60px]">
            <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider leading-none">Score</span>
            <span className={clsx("text-[12px] font-semibold leading-tight", scoreColor)}>
              {score >= 90 ? "Excellent" : score >= 75 ? "Strong" : "Fair"}
            </span>
          </div>
        </div>

        {/* Edit + Menu */}
        <div className="flex items-center gap-2">
          <button onClick={handleEdit} className="h-[32px] px-4 bg-white border border-[#E5E7EB] text-[#111827] rounded-[8px] text-[13px] font-semibold hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-[#eff6ff] transition-all shadow-sm whitespace-nowrap">
            Edit
          </button>
          
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className={clsx(
                "w-[32px] h-[32px] flex items-center justify-center transition-colors rounded-[8px]",
                showMenu ? "bg-[#E5E7EB] text-[#111827]" : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]"
              )}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </button>

            {showMenu && (
              <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-[#E5E7EB] rounded-[8px] shadow-lg py-1 z-20 animate-in fade-in zoom-in-95 duration-100">
                <button 
                  onClick={handleDelete}
                  className="w-full text-left px-4 py-2 text-[13px] font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

