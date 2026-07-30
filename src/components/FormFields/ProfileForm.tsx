"use client";

import { useResumeStore } from "../../lib/store";

interface ProfileFormProps {
  template: string;
}

export function ProfileForm({ template }: ProfileFormProps) {
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
        {template !== "ats-professional" && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Photo <span className="text-gray-400 font-normal">(for Modern Sidebar)</span></label>
            <div className="mt-1 flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setProfile({ photo: reader.result as string });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#eff6ff] file:text-[#2563eb] hover:file:bg-[#dbeafe]"
              />
              {profile.photo && (
                <button
                  type="button"
                  onClick={() => setProfile({ photo: "" })}
                  className="text-xs text-red-500 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        )}
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