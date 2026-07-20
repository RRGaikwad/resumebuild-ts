import React from "react";
import clsx from "clsx";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  trend: "up" | "down" | "neutral";
  icon: React.ReactNode;
  iconBgColor: string;
  iconTextColor: string;
}

export function StatCard({ title, value, subtitle, trend, icon, iconBgColor, iconTextColor }: StatCardProps) {
  return (
    <div className="saas-card saas-card-hover h-[130px] flex flex-col justify-center relative group">
      <button className="absolute top-4 right-4 text-[#9CA3AF] hover:text-[#111827] transition-colors p-1">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
      </button>

      <div className="flex flex-col gap-1.5 mt-2">
        <div className="flex items-center gap-3">
          <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center text-[18px]", iconBgColor, iconTextColor)}>
            {icon}
          </div>
          <h3 className="text-[14px] font-semibold text-[#111827]">{title}</h3>
        </div>
        
        <div className="flex items-baseline gap-2 mt-2">
          <div className="text-[32px] font-bold text-[#111827] leading-none">
            {value}
          </div>
        </div>
        
        <p className={clsx("text-[13px] font-medium mt-1", trend === "up" ? "text-[#16A34A]" : trend === "down" ? "text-[#EF4444]" : "text-[#6B7280]")}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}

