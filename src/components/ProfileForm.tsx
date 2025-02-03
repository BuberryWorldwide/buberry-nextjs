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

  useEffect(() => {
    if (!user?.id) return;

    const fetchProfile = async () => {
      try {
        let { data, error } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .single();

        if (error && error.code === "PGRST116") {
          console.log("No profile found, creating one...");

          // ✅ If no profile exists, create a new one
          const { error: insertError } = await supabase.from("profiles").insert({
            id: user.id,
            full_name: "", // Default empty
          });

          if (insertError) throw insertError;
          console.log("Profile created!");

          // ✅ Fetch again after creating
          ({ data, error } = await supabase
            .from("profiles")
            .select("full_name")
            .eq("id", user.id)
            .single());
        }

        if (error) throw error;
        setFullName(data?.full_name || "");
      } catch (err) {
        console.error("Error fetching/creating profile:", err);
      }
    };

    fetchProfile();
  }, [user]);

  const handleUpdate = async () => {
    if (!user?.id) return;
    setLoading(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({ id: user.id, full_name: fullName }); // ✅ Use `upsert` to create if missing

      if (error) throw error;
      alert("Profile updated!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Error updating profile.");
    } finally {
      setLoading(false);
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
