"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../../supabase/client";

export default function AuthCallback() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const completeSignIn = async () => {
      const error = params.get("error");
      if (error) {
        console.error("OAuth Error:", error, params.get("error_description"));
        alert(`OAuth Failed: ${params.get("error_description")}`);
        router.push("/login");
        return;
      }

      const { data, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !data.session) {
        console.error("Authentication failed:", sessionError);
        alert("Authentication failed. Please try again.");
        return;
      }

      const user = data.session.user;
      console.log("OAuth Login Successful:", user);

      // ✅ Force insert the user into `profiles` if missing
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || "",
        });

      if (profileError) {
        console.error("Error saving profile:", profileError);
        alert("Database error: Failed to save user profile.");
        return;
      }

      router.push("/dashboard");
    };

    completeSignIn();
  }, [router, params]);

  return <div>Completing sign-in...</div>;
}
