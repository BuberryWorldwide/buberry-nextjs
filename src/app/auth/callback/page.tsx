"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../supabase/client";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const completeSignIn = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        console.error("Authentication failed:", error);
        router.push("/login"); // Redirect back to login if it fails
      } else {
        router.push("/dashboard"); // ✅ Redirect to dashboard after successful login
      }
    };

    completeSignIn();
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg text-gray-700">Logging in...</p>
    </div>
  );
}
