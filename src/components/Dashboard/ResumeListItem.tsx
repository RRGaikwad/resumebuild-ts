import React from "react";
import clsx from "clsx";

interface ResumeListItemProps {
  title: string;
  updatedAt: string;
  score: number;
  isLatest?: boolean;
}

export function ResumeListItem({ title, updatedAt, score, isLatest }: ResumeListItemProps) {
  const scoreColor =
    score >= 90
      ? "text-[#16A34A] stroke-[#16A34A]"
      : score >= 80
      ? "text-[#2563EB] stroke-[#2563EB]"
      : "text-[#F59E0B] stroke-[#F59E0B]";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-4 sm:py-0 sm:h-[72px] border-b border-[#E5E7EB] hover:bg-[#F8FAFC] transition-colors group last:border-0 gap-3 sm:gap-0">
      
      {/* Left: Thumbnail + Info */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Mini document thumbnail */}
        <div className="w-[34px] h-[46px] bg-white border border-[#E5E7EB] rounded-[4px] shadow-[0_2px_4px_rgba(0,0,0,0.04)] flex-shrink-0 relative overflow-hidden">
          <div className="absolute top-2 left-1.5 right-1.5 space-y-[3px]">
            <div className="h-[2px] w-full bg-[#E5E7EB] rounded" />
            <div className="h-[2px] w-3/4 bg-[#E5E7EB] rounded" />
            <div className="h-[2px] w-full bg-[#E5E7EB] rounded" />
            <div className="h-[2px] w-5/6 bg-[#E5E7EB] rounded" />
            <div className="h-[2px] w-2/3 bg-[#E5E7EB] rounded" />
          </div>
        </div>

        {/* Title + Updated */}
        <div className="flex flex-col justify-center min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-semibold text-[15px] text-[#111827] leading-tight truncate">{title}</h4>
            {isLatest && (
              <span className="bg-[#2563EB]/10 text-[#2563EB] text-[11px] px-2 py-0.5 rounded-[4px] font-bold uppercase tracking-[0.5px] shrink-0">
                Latest
              </span>
            )}
          </div>
          <p className="text-[13px] text-[#6B7280] leading-tight mt-0.5">Updated {updatedAt}</p>
        </div>
      </div>

      {/* Right: ATS score + Actions */}
      <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-5 shrink-0 pl-[46px] sm:pl-0">
        {/* ATS Score ring */}
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="stroke-[#E5E7EB] fill-none"
                strokeWidth="3"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={clsx("fill-none stroke-current", scoreColor.split(" ")[1])}
                strokeWidth="3"
                strokeDasharray={`${score}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className={clsx("absolute text-[10px] font-bold", scoreColor.split(" ")[0])}>
              {score}%
            </span>
          </div>
          <span className="text-[13px] font-medium text-[#6B7280] w-[65px] hidden xs:block">ATS Score</span>
        </div>

        {/* Edit + Menu */}
        <div className="flex items-center gap-2">
          <button className="h-[32px] px-4 bg-white border border-[#E5E7EB] text-[#111827] rounded-[8px] text-[13px] font-semibold hover:border-[#2563EB] hover:text-[#2563EB] transition-colors shadow-sm whitespace-nowrap">
            Edit
          </button>
          <button className="w-[32px] h-[32px] flex items-center justify-center text-[#6B7280] hover:text-[#111827] transition-colors rounded-[8px] hover:bg-[#E5E7EB]/50">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

