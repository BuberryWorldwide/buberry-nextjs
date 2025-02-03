"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../supabase/client";
import { useRouter } from "next/navigation";
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

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
        fetchProfile(session.user.id);
      } else {
        router.push("/login");
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [router]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error && error.code === "PGRST116") {
        console.log("Profile does not exist, creating new profile...");
        await supabase.from("profiles").upsert({
          id: userId,
          email: user?.email || "",
          full_name: "",
          username: "",
          bio: "",
          avatar_url: "",
          hedera_wallet: "",
          carbon_points: 0,
          staked_nfts: [],
        });
      } else if (error) {
        throw error;
      }

      setProfile(data);
      setNewFullName(data?.full_name || "");
      setNewUsername(data?.username || "");
      setNewBio(data?.bio || "");
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

        <button onClick={handleLogout} className="mt-6 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition">
          Log Out
        </button>
      </div>
    </div>
  );
}
