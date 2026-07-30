"use client";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiFileText, FiEye, FiDownload, FiStar, FiPlus,
  FiCheckCircle, FiEdit2, FiAlertCircle,
} from "react-icons/fi";
import { StatCard } from "../components/Dashboard/StatCard";
import { ResumeListItem } from "../components/Dashboard/ResumeListItem";
import { useAuth } from "../lib/AuthContext";
import { subscribeToResumes, subscribeToActivity, type ResumeDocument, type ActivityDocument } from "../lib/firestoreService";
import clsx from "clsx";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function timeAgo(ts: any): string {
  if (!ts?.toDate) return "recently";
  const diff = (Date.now() - ts.toDate().getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return ts.toDate().toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function activityMeta(type: ActivityDocument["type"]) {
  const map = {
    edit:     { icon: <FiEdit2 className="text-[#2563eb]" />,     bg: "bg-[#eff6ff]" },
    create:   { icon: <FiPlus className="text-[#7c3aed]" />,      bg: "bg-[#ede9fe]" },
    download: { icon: <FiDownload className="text-[#16a34a]" />,  bg: "bg-[#dcfce7]" },
    view:     { icon: <FiEye className="text-[#4f46e5]" />,       bg: "bg-[#e0e7ff]" },
    ats:      { icon: <FiCheckCircle className="text-[#16a34a]" />, bg: "bg-[#dcfce7]" },
  };
  return map[type] ?? map.edit;
}

function strengthScore(resumes: ResumeDocument[]): number {
  if (!resumes.length) return 0;
  const avg = resumes.reduce((s, r) => s + (r.atsScore ?? 0), 0) / resumes.length;
  return Math.round(avg);
}

function strengthLabel(score: number) {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Strong";
  if (score >= 50) return "Fair";
  return "Needs Work";
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [resumes, setResumes] = useState<ResumeDocument[]>([]);
  const [activities, setActivities] = useState<ActivityDocument[]>([]);
  const [resumesLoading, setResumesLoading] = useState(true);
  const [activityLoading, setActivityLoading] = useState(true);

  // First name for greeting
  const firstName = user?.displayName?.split(" ")[0] ?? user?.email?.split("@")[0] ?? "there";

  // Real-time Firestore subscriptions
  useEffect(() => {
    if (!user) return;
    const unsub1 = subscribeToResumes(user.uid, (data) => {
      setResumes(data);
      setResumesLoading(false);
    });
    const unsub2 = subscribeToActivity(user.uid, (data) => {
      setActivities(data);
      setActivityLoading(false);
    });
    return () => { unsub1(); unsub2(); };
  }, [user]);

  // Derived stats
  const avgAts = resumes.length
    ? Math.round(resumes.reduce((s, r) => s + (r.atsScore ?? 0), 0) / resumes.length)
    : 0;

  const stats = [
    {
      title: "Resumes Created", value: String(resumes.length),
      subtitle: resumes.length === 0 ? "Create your first" : `${resumes.length} total`,
      trend: "up" as const, icon: <FiFileText />, iconBgColor: "bg-[#eff6ff]", iconTextColor: "text-[#2563eb]",
    },
    {
      title: "Profile Views", value: "—", subtitle: "Coming soon",
      trend: "up" as const, icon: <FiEye />, iconBgColor: "bg-[#e0e7ff]", iconTextColor: "text-[#4f46e5]",
    },
    {
      title: "Downloads", value: String(activities.filter(a => a.type === "download").length),
      subtitle: "All time",
      trend: "up" as const, icon: <FiDownload />, iconBgColor: "bg-[#dcfce7]", iconTextColor: "text-[#16a34a]",
    },
    {
      title: "ATS Score (Avg)", value: resumes.length ? `${avgAts}%` : "—",
      subtitle: resumes.length ? strengthLabel(avgAts) : "No resumes yet",
      trend: "up" as const, icon: <FiStar />, iconBgColor: "bg-[#fef3c7]", iconTextColor: "text-[#f59e0b]",
    },
  ];

  // Strength checklist derived from actual resume data
  const latestResume = resumes[0];
  const latestData = latestResume?.data as any;
  const strengthItems = latestResume ? [
    { label: "Complete Personal Info", isDone: !!(latestData?.profile?.name && latestData?.profile?.email) },
    { label: "Add Work Experience",    isDone: !!(latestData?.experience?.length) },
    { label: "Add Education",          isDone: !!(latestData?.education?.length) },
    { label: "Add Skills",             isDone: !!(latestData?.categorizedSkills?.length || latestData?.skills?.length) },
    { label: "Add Projects",           isDone: !!(latestData?.projects?.length) },
  ] : [
    { label: "Complete Personal Info", isDone: false },
    { label: "Add Work Experience",    isDone: false },
    { label: "Add Education",          isDone: false },
    { label: "Add Skills",             isDone: false },
    { label: "Add Projects",           isDone: false },
  ];

  const strengthPct = latestResume
    ? strengthScore([latestResume])
    : Math.round((strengthItems.filter(i => i.isDone).length / strengthItems.length) * 100);

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="w-full flex flex-col gap-[32px] animate-in fade-in duration-500 pb-[32px]">
      {/* Hero */}
      <div className="flex flex-col gap-2 mt-4">
        <h1 className="text-[40px] font-bold text-[#111827] flex items-center gap-2 leading-none">
          Hello, {firstName}! <span className="text-[40px] animate-waving-hand origin-bottom-right leading-none">👋</span>
        </h1>
        <p className="text-[18px] font-semibold text-[#6B7280]">Let's build your perfect resume today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px]">
        {stats.map((stat, idx) => <StatCard key={idx} {...stat} />)}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-[32px]">
        {/* Left — My Resumes */}
        <div className="xl:col-span-2 flex flex-col gap-[32px]">
          <div className="saas-card p-0 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-[24px] border-b border-[#E5E7EB]">
              <h2 className="font-semibold text-[18px] text-[#111827]">My Resumes</h2>
              <button className="text-[13px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors">View all</button>
            </div>

            <div className="flex flex-col">
              {resumesLoading ? (
                // Skeleton
                [1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-3 px-6 py-4 border-b border-[#E5E7EB]">
                    <div className="w-[34px] h-[46px] bg-[#F3F4F6] rounded animate-pulse" />
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="h-3 w-48 bg-[#F3F4F6] rounded animate-pulse" />
                      <div className="h-2.5 w-28 bg-[#F3F4F6] rounded animate-pulse" />
                    </div>
                  </div>
                ))
              ) : resumes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center px-6">
                  <div className="w-14 h-14 rounded-[16px] bg-[#eff6ff] flex items-center justify-center mb-4">
                    <FiFileText className="text-[#2563EB] text-2xl" />
                  </div>
                  <h3 className="font-semibold text-[15px] text-[#111827] mb-1">No resumes yet</h3>
                  <p className="text-[13px] text-[#6B7280]">Create your first resume to get started.</p>
                </div>
              ) : (
                resumes.map((resume) => (
                  <ResumeListItem
                    key={resume.id}
                    resume={resume}
                    isLatest={resume.id === resumes[0]?.id}
                  />
                ))
              )}
            </div>

            <div className="p-[24px] bg-[#F8FAFC]">
              <button
                onClick={() => {
                  useResumeStore.getState().reset();
                  navigate("/templates");
                }}
                className="w-full h-[56px] border-[2px] border-dashed border-[#E5E7EB] hover:border-[#2563EB] hover:bg-[#eff6ff] text-[#2563EB] rounded-[12px] flex items-center justify-center gap-2 transition-all font-semibold text-[15px]"
              >
                <FiPlus className="text-xl" /> Create New Resume
              </button>
            </div>
          </div>

          {/* Recommended Tools */}
          <div className="flex flex-col gap-[24px]">
            <div className="flex items-center justify-between px-1">
              <h3 className="font-semibold text-[18px] text-[#111827] flex items-center gap-2"><span className="text-yellow-500">💡</span> Recommended for you</h3>
              <button className="text-[13px] font-semibold text-[#2563EB] hover:text-[#1D4ED8]">View all</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-[24px]">
              {[
                { title: "Improve with AI", desc: "Get AI suggestions to improve your resume", icon: "✨", color: "text-[#7c3aed] bg-[#ede9fe]" },
                { title: "ATS Check", desc: "Scan your resume for ATS compatibility", icon: "🛡️", color: "text-[#16a34a] bg-[#dcfce7]" },
                { title: "Write Cover Letter", desc: "Create a matching cover letter", icon: "📄", color: "text-[#ea580c] bg-[#ffedd5]" },
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

        {/* Right — Strength & Activity */}
        <div className="flex flex-col gap-[32px]">
          {/* Resume Strength */}
          <div className="saas-card flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-semibold text-[18px] text-[#111827]">Resume Strength</h2>
              <button className="text-[13px] font-semibold text-[#2563EB] hover:text-[#1D4ED8]">View details</button>
            </div>
            <div className="flex flex-col sm:flex-row xl:flex-col 2xl:flex-row items-center gap-8 px-2">
              <div className="relative w-[140px] h-[140px] flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="stroke-[#F3F4F6] fill-none" strokeWidth="3" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="fill-none stroke-[#2563EB]" strokeWidth="3" strokeLinecap="round" strokeDasharray={`${strengthPct}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[32px] font-bold text-[#111827] leading-none">{strengthPct}%</span>
                  <span className="text-[13px] font-semibold text-[#6B7280] mt-1">{strengthLabel(strengthPct)}</span>
                </div>
              </div>
              <div className="flex-1 w-full flex flex-col gap-3.5">
                {strengthItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    {item.isDone
                      ? <FiCheckCircle className="text-[#16A34A] text-[18px] flex-shrink-0" />
                      : <FiAlertCircle className="text-[#F59E0B] text-[18px] flex-shrink-0" />
                    }
                    <span className={clsx("text-[15px]", item.isDone ? "text-[#6B7280]" : "text-[#111827] font-medium")}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="saas-card flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-semibold text-[18px] text-[#111827]">Recent Activity</h2>
              <button className="text-[13px] font-semibold text-[#2563EB] hover:text-[#1D4ED8]">View all</button>
            </div>
            {activityLoading ? (
              <div className="flex flex-col gap-5">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#F3F4F6] animate-pulse flex-shrink-0" />
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="h-3 w-full bg-[#F3F4F6] rounded animate-pulse" />
                      <div className="h-2.5 w-20 bg-[#F3F4F6] rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : activities.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-[14px] text-[#6B7280]">No activity yet.<br />Create your first resume!</p>
              </div>
            ) : (
              <div className="relative pl-3 flex flex-col gap-[28px] before:absolute before:inset-y-3 before:left-[27px] before:w-px before:bg-[#E5E7EB]">
                {activities.slice(0, 6).map((act) => {
                  const { icon, bg } = activityMeta(act.type);
                  return (
                    <div key={act.id} className="relative flex gap-4">
                      <div className={clsx("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-4 border-white relative z-10 text-[14px]", bg)}>
                        {icon}
                      </div>
                      <div className="pt-1">
                        <p className="text-[15px] font-medium text-[#111827] leading-tight">{act.text}</p>
                        <p className="text-[13px] text-[#9CA3AF] mt-1">{timeAgo(act.createdAt)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
