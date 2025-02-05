"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User } from "@supabase/supabase-js";
import ProfileAvatar from "../../components/ProfileAvatar";

// ✅ Define UserProfile Type
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
  skills: string[];
  projects: string[];
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ Editable Fields
  const [newFullName, setNewFullName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newHederaWallet, setNewHederaWallet] = useState("");
  const [newSkills, setNewSkills] = useState<string[]>([]);
  const [newProjects, setNewProjects] = useState<string[]>([]);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // ✅ Fetch User Session
  useEffect(() => {
    const fetchUserSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        fetchProfile(session.user.id);
      } else {
        router.push("/join-the-movement");
      }
    };
    fetchUserSession();
  }, [router]);

    // ✅ Fetch Profile from Supabase
    const fetchProfile = async (userId: string) => {
        try {
          const { data, error } = await supabase
            .from("profiles")
            .select("id, email, full_name, username, bio, avatar_url, hedera_wallet, carbon_points, staked_nfts, skills, projects")
            .eq("id", userId)
            .single();
    
          if (error) throw error;
    
          setProfile(data);
          setNewFullName(data.full_name || "");
          setNewUsername(data.username || "");
          setNewBio(data.bio || "");
          setNewEmail(data.email || "");
          setNewHederaWallet(data.hedera_wallet || "");
          setNewSkills(Array.isArray(data.skills) ? data.skills : []);
          setNewProjects(Array.isArray(data.projects) ? data.projects : []);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };
    
      // ✅ Update Profile in Supabase
      const updateProfile = async () => {
        if (!user) return;
        setLoading(true);
    
        try {
          let avatarUrl = profile?.avatar_url || "";
          if (avatarFile) {
            const fileExt = avatarFile.name.split(".").pop();
            const filePath = `${user.id}-${Date.now()}.${fileExt}`;
    
            const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, avatarFile);
            if (uploadError) throw uploadError;
    
            avatarUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${filePath}`;
          }
    
          const updates = {
            id: user.id,
            email: newEmail,
            full_name: newFullName,
            username: newUsername,
            bio: newBio,
            avatar_url: avatarUrl,
            hedera_wallet: newHederaWallet,
            skills: Array.isArray(newSkills) ? newSkills : [],
            projects: Array.isArray(newProjects) ? newProjects : [],
            updated_at: new Date().toISOString(),
          };
    
          const { error } = await supabase.from("profiles").upsert(updates);
          if (error) throw error;
    
          await fetchProfile(user.id);
          alert("Profile updated successfully!");
          setIsEditing(false);
        } catch (error) {
          console.error("Error updating profile:", error);
          alert("Failed to update profile. Check console for details.");
        } finally {
          setLoading(false);
        }
      };
    
/*    // ✅ Logout Function
      const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
          localStorage.removeItem("userProfile");
          router.push("/join-the-movement");
        } else {
          console.error("Logout error:", error);
        }
      };
*/
      return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
          {/* 🔹 Header */}
          <header className="bg-[#6C4C94] text-white py-6 text-center shadow-md">
            <h1 className="text-4xl font-bold">Your Profile</h1>
          </header>
    
          <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 🔹 Profile Info */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h2 className="text-2xl font-bold text-[#4FC3A1]">Profile</h2>
              <ProfileAvatar avatarPath={profile?.avatar_url || ""} />
              <p className="mt-2 text-lg font-semibold">{profile?.full_name || "User"}</p>
              <p className="text-gray-600">{profile?.bio || "No bio added yet"}</p>
              <p className="text-sm text-gray-500 mt-2">Email: {newEmail}</p>
              <p className="text-sm text-gray-500 mt-2">Hedera Wallet: {newHederaWallet}</p>
              <button onClick={() => setIsEditing(true)} className="mt-4 px-4 py-2 bg-[#6C4C94] text-white rounded-lg">Edit Profile</button>
            </div>
    
            {/* 🔹 Quick Links to Dashboards */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold text-[#4FC3A1]">Quick Access</h2>
              <ul className="mt-4 space-y-3">
                <li><a href="https://lms.buberryworldwide.com" className="block p-3 bg-blue-500 text-white rounded-lg">📚 LMS Dashboard</a></li>
                <li><a href="https://omnia.buberryworldwide.com" className="block p-3 bg-green-500 text-white rounded-lg">🌱 Staking Dashboard</a></li>
                <li><a href="https://citizen-science.buberryworldwide.com" className="block p-3 bg-purple-500 text-white rounded-lg">🔬 Citizen Science</a></li>
              </ul>
            </div>
          </div>
    
          
{/* Profile Edit Modal */}
{isEditing && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-xl max-h-[70vh] overflow-y-auto p-6 relative">
      
      {/* Close Button */}
      <button 
        onClick={() => setIsEditing(false)} 
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
      >
        ✖
      </button>

      {/* Modal Title */}
      <h2 className="text-2xl font-bold text-[#4FC3A1] text-center mb-4">Edit Profile</h2>

      {/* Full Name */}
      <label className="block mt-4 text-gray-700">Full Name</label>
      <input
        type="text"
        value={newFullName}
        onChange={(e) => setNewFullName(e.target.value)}
        className="w-full p-2 border rounded-lg mt-1"
      />

      {/* Username */}
      <label className="block mt-4 text-gray-700">Username</label>
      <input
        type="text"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
        className="w-full p-2 border rounded-lg mt-1"
      />

      {/* Bio */}
      <label className="block mt-4 text-gray-700">Bio</label>
      <textarea
        value={newBio}
        onChange={(e) => setNewBio(e.target.value)}
        className="w-full p-2 border rounded-lg mt-1"
      />

      {/* Hedera Wallet */}
      <label className="block mt-4 text-gray-700">Hedera Wallet</label>
      <input
        type="text"
        value={newHederaWallet}
        onChange={(e) => setNewHederaWallet(e.target.value)}
        className="w-full p-2 border rounded-lg mt-1"
      />

      {/* Avatar Upload */}
      <label className="block mt-4 text-gray-700">Profile Picture</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
        className="w-full p-2 border rounded-lg mt-1"
      />

      {/* Show Current Avatar */}
      {profile?.avatar_url && (
        <div className="flex justify-center mt-4">
          <Image
            src={profile.avatar_url}
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
      )}

      {/* Upload Avatar Button */}
      <button
        onClick={updateProfile}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full"
      >
        {loading ? "Uploading..." : "Upload New Avatar"}
      </button>

      {/* Save & Cancel Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={updateProfile}
          className="px-6 py-2 bg-[#4FC3A1] text-white rounded-lg hover:bg-[#3C9C7B] transition"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
        <button
          onClick={() => setIsEditing(false)}
          className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
        >
          Cancel
        </button>
      </div>

    </div>
  </div>
)}


        </div>
      );
    }
    