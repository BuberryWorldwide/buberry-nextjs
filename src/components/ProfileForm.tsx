"use client";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";

export default function ProfileForm({ user }: { user: any }) {
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();

      if (error) console.error("Error fetching profile:", error);
      else setFullName(data.full_name || "");
    };

    fetchProfile();
  }, [user]);

  const handleUpdate = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName })
      .eq("id", user.id);

    setLoading(false);
    if (error) console.error("Error updating profile:", error);
    else alert("Profile updated!");
  };

  return (
    <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Update Profile</h2>
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="mt-4 p-2 border rounded w-full"
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
