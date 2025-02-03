"use client";
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../../supabase/client";

function OAuthHandler() {
  const router = useRouter();
  const params = useSearchParams();

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
      const { data: existingProfile, error: fetchError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();

      if (fetchError) {
        console.error("Error checking profile existence:", fetchError);
      }

      if (!existingProfile) {
        console.log("Creating new profile for user...");
        const { error: profileError } = await supabase
          .from("profiles")
          .upsert({
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || "",
            username: user.user_metadata?.preferred_username || "",
            bio: "",
            avatar_url: "",
            hedera_wallet: "",
            carbon_points: 0,
            staked_nfts: [],
          });

        if (profileError) {
          console.error("Error saving profile:", profileError);
          alert("Database error: Failed to save user profile.");
          return;
        }
      } else {
        console.log("User profile already exists.");
      }

      router.push("/dashboard");
    };

    completeSignIn();
  }, [router, params]);

  return <div>Completing sign-in...</div>;
}

export default function AuthCallback() {
  return (
    <Suspense fallback={<div>Loading authentication...</div>}>
      <OAuthHandler />
    </Suspense>
  );
}
