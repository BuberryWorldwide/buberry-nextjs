"use client";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";

// ✅ Define Type for User
type UserProfile = {
  id: string;
  full_name?: string;
};

export default function ProfileForm({ user }: { user: UserProfile }) {
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Profile only if user is defined
  useEffect(() => {
    if (!user?.id) return; // ✅ Ensure user exists before fetching

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setFullName(data?.full_name || "");
      }
    };

    fetchProfile();
  }, [user]);

  // ✅ Update profile in Supabase
  const handleUpdate = async () => {
    if (!user?.id) return; // ✅ Ensure user exists before updating

    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName })
      .eq("id", user.id);

    setLoading(false);
    if (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile.");
    } else {
      alert("Profile updated!");
    }
  };

  return (
    <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Update Profile</h2>
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="mt-4 p-2 border rounded w-full"
        placeholder="Enter full name"
      />
      <button
        onClick={handleUpdate}
        className="mt-4 px-6 py-2 bg-[#6C4C94] text-white rounded-lg"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
