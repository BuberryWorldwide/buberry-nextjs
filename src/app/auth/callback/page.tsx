"use client";
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../../supabase/client";

function OAuthHandler() {
  const router = useRouter();
  const params = useSearchParams(); // Wrapped inside Suspense

  useEffect(() => {
    const completeSignIn = async () => {
      console.log("AuthCallback params:", params.toString());

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

      // ✅ Check if user exists before inserting profile
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();

      if (!existingProfile) {
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
      } else {
        console.log("User already exists in profiles.");
      }

      router.push("/dashboard");
    };

    completeSignIn();
  }, [router, params]);

  return <div>Completing sign-in...</div>;
}

// ✅ Fix: Wrap `useSearchParams()` inside Suspense to prevent prerendering issues
export default function AuthCallback() {
  return (
    <Suspense fallback={<div>Loading authentication...</div>}>
      <OAuthHandler />
    </Suspense>
  );
}
