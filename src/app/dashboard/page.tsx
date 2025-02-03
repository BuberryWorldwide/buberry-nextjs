"use client";

import { useState, useEffect, Suspense } from "react";
import { supabase } from "../../supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { User } from "@supabase/supabase-js";
import ProfileAvatar from "../../components/ProfileAvatar";

type UserProfile = {
  id: string;
  email: string;
  full_name: string;
  username: string;
  bio: string;
  avatar_url: string;
  hedera_wallet: string;
  carbon_points: number;
  staked_nfts: string[];
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [newFullName, setNewFullName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newBio, setNewBio] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchUserSession = async () => {
      const { data: session, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session.session) {
        console.error("No active session:", sessionError);
        router.push("/login");
        return;
      }

      const user = session.session.user;
      setUser(user);
      fetchProfile(user.id);
    };

    fetchUserSession();
  }, [router]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      setProfile(data);
      setNewFullName(data.full_name || "");
      setNewUsername(data.username || "");
      setNewBio(data.bio || "");
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  const updateProfile = async () => {
    if (!user) return;
    setLoading(true);

    try {
      let avatarUrl = profile?.avatar_url || "";
      if (avatarFile) {
        const fileExt = avatarFile.name.split(".").pop();
        const filePath = `avatars/${user.id}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, avatarFile, { upsert: true });

        if (uploadError) throw uploadError;

        avatarUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${filePath}`;
      }

      const updates = {
        id: user.id,
        full_name: newFullName || profile?.full_name || "",
        username: newUsername || profile?.username || "",
        bio: newBio || profile?.bio || "",
        avatar_url: avatarUrl,
      };

      const { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;

      await fetchProfile(user.id);
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      localStorage.removeItem("userProfile");
      router.push("/join-the-movement");
    } else {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-[#6C4C94] text-white py-6 text-center shadow-md">
        <h1 className="text-4xl font-bold">User Dashboard</h1>
      </header>

      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6 text-center w-full max-w-md">
          <h2 className="text-2xl font-bold text-[#4FC3A1]">Profile</h2>
          <ProfileAvatar avatarPath={profile?.avatar_url || ""} />
          <p className="mt-2 text-lg font-semibold">{profile?.full_name || "User"}</p>
          <p className="text-gray-600">{profile?.bio || "No bio added yet"}</p>
          <p className="text-sm text-gray-500 mt-2">Email: {user?.email}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-4 py-2 bg-[#6C4C94] text-white rounded-lg hover:bg-[#543875] transition"
          >
            Edit Profile
          </button>
        </div>

        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
              <h2 className="text-2xl font-bold text-[#4FC3A1] text-center">Edit Profile</h2>
              <label className="block mt-4 text-gray-700">Full Name</label>
              <input type="text" value={newFullName} onChange={(e) => setNewFullName(e.target.value)}
                className="w-full p-2 border rounded-lg mt-1" />

              <label className="block mt-4 text-gray-700">Username</label>
              <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)}
                className="w-full p-2 border rounded-lg mt-1" />

              <label className="block mt-4 text-gray-700">Bio</label>
              <textarea value={newBio} onChange={(e) => setNewBio(e.target.value)}
                className="w-full p-2 border rounded-lg mt-1" />

              <label className="block mt-4 text-gray-700">Profile Picture</label>
              <input type="file" accept="image/*" onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                className="w-full p-2 border rounded-lg mt-1" />

              {profile?.avatar_url && (
                <div className="flex justify-center mt-4">
                  <Image src={profile.avatar_url} alt="Profile Picture" width={100} height={100} className="rounded-full" />
                </div>
              )}

              <button onClick={updateProfile}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full">
                {loading ? "Uploading..." : "Upload New Avatar"}
              </button>

              <div className="flex justify-between mt-6">
                <button onClick={updateProfile} className="px-6 py-2 bg-[#4FC3A1] text-white rounded-lg hover:bg-[#3C9C7B] transition" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button onClick={() => setIsEditing(false)} className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <button onClick={handleLogout} className="mt-6 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition">
          Log Out
        </button>
      </div>
    </div>
  );
}
