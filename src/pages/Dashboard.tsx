"use client";

import React from "react";
import { FiFileText, FiEye, FiDownload, FiStar, FiPlus, FiCheckCircle, FiEdit2, FiAlertCircle } from "react-icons/fi";
import { StatCard } from "../components/Dashboard/StatCard";
import { ResumeListItem } from "../components/Dashboard/ResumeListItem";
import clsx from "clsx";

export function Dashboard() {
  const stats = [
    { title: "Resumes Created", value: "3", subtitle: "+1 this month", trend: "up" as const, icon: <FiFileText />, iconBgColor: "bg-[#eff6ff]", iconTextColor: "text-[#2563eb]" },
    { title: "Profile Views", value: "128", subtitle: "+24 this week", trend: "up" as const, icon: <FiEye />, iconBgColor: "bg-[#e0e7ff]", iconTextColor: "text-[#4f46e5]" },
    { title: "Downloads", value: "45", subtitle: "+12 this week", trend: "up" as const, icon: <FiDownload />, iconBgColor: "bg-[#dcfce7]", iconTextColor: "text-[#16a34a]" },
    { title: "ATS Score (Avg)", value: "86%", subtitle: "Excellent", trend: "up" as const, icon: <FiStar />, iconBgColor: "bg-[#fef3c7]", iconTextColor: "text-[#f59e0b]" },
  ];

  const resumes = [
    { title: "Software Developer Resume", updatedAt: "2 hours ago", score: 92, isLatest: true },
    { title: "Full Stack Developer Resume", updatedAt: "5 days ago", score: 85 },
    { title: "Student Resume", updatedAt: "2 weeks ago", score: 78 },
  ];

  const strengthItems = [
    { label: "Complete Personal Info", isDone: true },
    { label: "Add Work Experience", isDone: true },
    { label: "Add Education", isDone: true },
    { label: "Add Skills", isDone: true },
    { label: "Add Projects", isDone: false },
  ];

  const activities = [
    { text: "You edited Software Developer Resume", time: "2 hours ago", icon: <FiEdit2 className="text-[#2563eb]" />, bg: "bg-[#eff6ff]" },
    { text: "You downloaded Software Developer Resume", time: "1 day ago", icon: <FiDownload className="text-[#16a34a]" />, bg: "bg-[#dcfce7]" },
    { text: "Your resume was viewed by 12 recruiters", time: "2 days ago", icon: <FiEye className="text-[#4f46e5]" />, bg: "bg-[#e0e7ff]" },
    { text: "ATS score improved to 92%", time: "3 days ago", icon: <FiCheckCircle className="text-[#16a34a]" />, bg: "bg-[#dcfce7]" },
  ];

  return (
    <div className="w-full flex flex-col gap-[32px] animate-in fade-in duration-500 pb-[32px]">
      {/* Hero Section */}
      <div className="flex flex-col gap-2 mt-4">
        <h1 className="text-[40px] font-bold text-[#111827] flex items-center gap-2 leading-none">
          Hello, Rohan! <span className="text-[40px] animate-waving-hand origin-bottom-right leading-none">👋</span>
        </h1>
        <p className="text-[18px] font-semibold text-[#6B7280]">Let's build your perfect resume today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px]">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-[32px]">
        {/* Left Column (My Resumes) */}
        <div className="xl:col-span-2 flex flex-col gap-[32px]">
          <div className="saas-card p-0 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-[24px] border-b border-[#E5E7EB]">
              <h2 className="font-semibold text-[18px] text-[#111827]">My Resumes</h2>
              <button className="text-[13px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors">View all</button>
            </div>
            
            <div className="flex flex-col">
              {resumes.map((resume, idx) => (
                <ResumeListItem key={idx} {...resume} />
              ))}
            </div>

            <div className="p-[24px] bg-[#F8FAFC]">
              <button className="w-full h-[56px] border-[2px] border-dashed border-[#E5E7EB] hover:border-[#2563EB] hover:bg-[#eff6ff] text-[#2563EB] rounded-[12px] flex items-center justify-center gap-2 transition-all font-semibold text-[15px]">
                <FiPlus className="text-xl" /> Create New Resume
              </button>
            </div>
          </div>
          
          {/* Recommended Section */}
          <div className="flex flex-col gap-[24px]">
             <div className="flex items-center justify-between px-1">
                <h3 className="font-semibold text-[18px] text-[#111827] flex items-center gap-2"><span className="text-yellow-500">💡</span> Recommended for you</h3>
                <button className="text-[13px] font-semibold text-[#2563EB] hover:text-[#1D4ED8]">View all</button>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-[24px]">
                {[
                  { title: "Improve with AI", desc: "Get AI suggestions to improve your resume", icon: "✨", color: "text-[#7c3aed] bg-[#ede9fe]" },
                  { title: "ATS Check", desc: "Scan your resume for ATS compatibility", icon: "🛡️", color: "text-[#16a34a] bg-[#dcfce7]" },
                  { title: "Write Cover Letter", desc: "Create a matching cover letter", icon: "📄", color: "text-[#ea580c] bg-[#ffedd5]" }
                ].map((item, i) => (
                  <div key={i} className="saas-card saas-card-hover flex items-start gap-3 cursor-pointer group">
                    <div className={clsx("w-10 h-10 rounded-[12px] flex items-center justify-center text-[18px] flex-shrink-0", item.color)}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[15px] text-[#111827] group-hover:text-[#2563EB] transition-colors">{item.title}</h4>
                      <p className="text-[13px] text-[#6B7280] mt-1 line-clamp-2 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column (Strength & Activity) */}
        <div className="flex flex-col gap-[32px]">
          <div className="saas-card flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-semibold text-[18px] text-[#111827]">Resume Strength</h2>
              <button className="text-[13px] font-semibold text-[#2563EB] hover:text-[#1D4ED8]">View details</button>
            </div>
            
            <div className="flex flex-col sm:flex-row xl:flex-col 2xl:flex-row items-center gap-8 px-2">
               <div className="relative w-[140px] h-[140px] flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path className="stroke-[#F3F4F6] fill-none" strokeWidth="3" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="fill-none stroke-[#2563EB]" strokeWidth="3" strokeLinecap="round" strokeDasharray="86, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[32px] font-bold text-[#111827] leading-none">86%</span>
                    <span className="text-[13px] font-semibold text-[#6B7280] mt-1">Strong</span>
                  </div>
               </div>
               
               <div className="flex-1 w-full flex flex-col gap-3.5">
                 {strengthItems.map((item, idx) => (
                   <div key={idx} className="flex items-center gap-3">
                     {item.isDone ? (
                       <FiCheckCircle className="text-[#16A34A] text-[18px] flex-shrink-0" />
                     ) : (
                       <FiAlertCircle className="text-[#F59E0B] text-[18px] flex-shrink-0" />
                     )}
                     <span className={clsx("text-[15px]", item.isDone ? "text-[#6B7280]" : "text-[#111827] font-medium")}>{item.label}</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          <div className="saas-card flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-semibold text-[18px] text-[#111827]">Recent Activity</h2>
              <button className="text-[13px] font-semibold text-[#2563EB] hover:text-[#1D4ED8]">View all</button>
            </div>
            <div className="relative pl-3 flex flex-col gap-[28px] before:absolute before:inset-y-3 before:left-[27px] before:w-px before:bg-[#E5E7EB]">
              {activities.map((act, idx) => (
                <div key={idx} className="relative flex gap-4">
                  <div className={clsx("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-4 border-white relative z-10 text-[14px]", act.bg)}>
                    {act.icon}
                  </div>
                  <div className="pt-1">
                    <p className="text-[15px] font-medium text-[#111827] leading-tight">{act.text}</p>
                    <p className="text-[13px] text-[#9CA3AF] mt-1">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

