"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";

type UserProfile = {
  full_name: string;
  username: string;
  bio: string;
  avatar_url: string;
  hedera_wallet: string;
  carbon_points: number;
  staked_nfts: string[];
};

export default function Dashboard() {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [newFullName, setNewFullName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newBio, setNewBio] = useState("");


  useEffect(() => {
    const fetchUserSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setUser(data.session.user);
        fetchProfile(data.session.user.id);
      } else {
        router.push("/join-the-movement"); // Redirect if no session
      }
    };
  
    fetchUserSession();
  
    // Listen for auth changes (e.g., login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
        fetchProfile(session.user.id);
      } else {
        router.push("/join-the-movement");
      }
    });
  
    return () => {
      authListener?.subscription.unsubscribe(); // Clean up listener
    };
  }, [router]);
  

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, full_name, username, bio, avatar_url, hedera_wallet, carbon_points, staked_nfts")
        .eq("id", userId)
        .single();
  
      if (error) throw error;
      if (!data) throw new Error("No profile found for user");
  
      console.log("Fetched profile data:", data); // Debugging
  
      setProfile(data);
      setNewFullName(data.full_name || "");
      setNewUsername(data.username || "");
      setNewBio(data.bio || "");
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  
  

  const updateProfile = async () => {
    if (!user || !user.id || !user.email) {
      alert("User is not authenticated");
      return;
    }
  
    setLoading(true);
  
    try {
      const updates = {
        id: user.id, // ✅ Ensure the correct user ID is used
        email: user.email, // ✅ Ensure email is included (fix for the DB error)
        full_name: newFullName || profile?.full_name || "",
        username: newUsername || profile?.username || "",
        bio: newBio || profile?.bio || "",
        updated_at: new Date().toISOString(),
      };
  
      console.log("Updating profile with:", updates); // Debugging
  
      // ✅ Fix: `upsert()` must receive an array!
      const { data, error } = await supabase
        .from("profiles")
        .upsert([updates]) // ✅ Wrapping in an array fixes TypeScript error
        .select()
        .single();
  
      if (error) throw error;
      if (!data) throw new Error("Update failed: No data returned");
  
      console.log("Profile updated in DB:", data); // Debugging
  
      // ✅ Update state to refresh UI immediately
      setProfile(data);
  
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
      localStorage.removeItem("userProfile"); // Clear cached profile
      router.push("/join-the-movement"); // Redirect after logout
    } else {
      console.error("Logout error:", error);
    }
  };
  
  


  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* 🔹 Header */}
      <header className="bg-[#6C4C94] text-white py-6 text-center shadow-md">
        <h1 className="text-4xl font-bold">User Dashboard</h1>
      </header>

      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* 🔹 Profile Section */}
<div className="bg-white shadow-md rounded-lg p-6 text-center w-full">
          <h2 className="text-2xl font-bold text-[#4FC3A1]">Profile</h2>

          {/* Avatar */}
          {profile?.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt="Profile Picture"
              width={100}
              height={100}
              className="mx-auto rounded-full mt-4"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mt-4"></div>
          )}

          {/* User Info */}
          <p className="mt-2 text-lg font-semibold">{profile?.full_name || "User"}</p>
          <p className="text-gray-600">{profile?.bio || "No bio added yet"}</p>
          <p className="text-sm text-gray-500 mt-2">Email: {user?.email}</p>

          {/* 🔹 Edit Profile Button */}
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-4 py-2 bg-[#6C4C94] text-white rounded-lg hover:bg-[#543875] transition"
          >
            Edit Profile
          </button>
        </div>


        {/* 🔹 Profile Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
              <h2 className="text-2xl font-bold text-[#4FC3A1] text-center">Edit Profile</h2>

              <label className="block mt-4 text-gray-700">Full Name</label>
              <input
                type="text"
                value={profile?.full_name || ""}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value } as UserProfile)}
                className="w-full p-2 border rounded-lg mt-1"
              />

              <label className="block mt-4 text-gray-700">Username</label>
              <input
                type="text"
                value={profile?.username || ""}
                onChange={(e) => setProfile({ ...profile, username: e.target.value } as UserProfile)}
                className="w-full p-2 border rounded-lg mt-1"
              />

              <label className="block mt-4 text-gray-700">Bio</label>
              <textarea
                value={profile?.bio || ""}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value } as UserProfile)}
                className="w-full p-2 border rounded-lg mt-1"
              />

              {/* Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => updateProfile()}
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


        {/* 🔹 Wallet Section */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-[#4FC3A1]">Hedera Wallet</h2>
          <p className="mt-2 text-lg">{profile?.hedera_wallet || "No wallet connected"}</p>
          <button className="mt-4 px-4 py-2 bg-[#6C4C94] text-white rounded-lg hover:bg-[#543875] transition">
            Connect Wallet
          </button>
        </div>

        {/* 🔹 Carbon Points & Staked NFTs */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-[#4FC3A1]">Your Impact</h2>
          <p className="mt-2 text-lg font-semibold">Carbon Points: {profile?.carbon_points || 0}</p>
          <p className="text-lg">Staked NFTs: {profile?.staked_nfts?.length || 0}</p>
        </div>


        {/* 🔹 Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
