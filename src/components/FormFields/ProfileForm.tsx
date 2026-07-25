"use client";

import { useResumeStore } from "../../lib/store";

export function ProfileForm() {
  const { profile, setProfile } = useResumeStore();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ name: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="e.g. ROHAN GAIKWAD"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Title / Role</label>
          <input
            type="text"
            value={profile.title}
            onChange={(e) => setProfile({ title: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="e.g. Full Stack Developer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ email: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            value={profile.phone}
            onChange={(e) => setProfile({ phone: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            value={profile.address}
            onChange={(e) => setProfile({ address: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Photo URL <span className="text-gray-400 font-normal">(for Modern Sidebar)</span></label>
          <input
            type="text"
            value={profile.photo ?? ""}
            onChange={(e) => setProfile({ photo: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="https://... or leave blank"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Professional Summary</label>
          <textarea
            value={profile.summary}
            onChange={(e) => setProfile({ summary: e.target.value })}
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
          <input
            type="text"
            value={profile.socialLinks?.linkedin ?? ""}
            onChange={(e) => setProfile({ socialLinks: { ...profile.socialLinks, linkedin: e.target.value } })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="linkedin.com/in/username"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">GitHub URL</label>
          <input
            type="text"
            value={profile.socialLinks?.github ?? ""}
            onChange={(e) => setProfile({ socialLinks: { ...profile.socialLinks, github: e.target.value } })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="github.com/username"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Website URL</label>
          <input
            type="text"
            value={profile.socialLinks?.website ?? ""}
            onChange={(e) => setProfile({ socialLinks: { ...profile.socialLinks, website: e.target.value } })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="yourwebsite.dev"
          />
        </div>
      </div>
    </div>
  );
}