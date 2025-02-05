"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "../../../supabase/client";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

function AuthCallbackHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const processOAuth = async () => {
      const code = searchParams.get("code");
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
          router.push("/profile"); // ✅ Redirect to Profile after login
        } else {
          console.error("OAuth error:", error);
        }
      }
    };
    processOAuth();
  }, [searchParams, router]);

  return <p className="text-center">Processing login...</p>;
}

// ✅ Wrap in <Suspense> to prevent Next.js CSR error
export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<p className="text-center">Loading authentication...</p>}>
      <AuthCallbackHandler />
    </Suspense>
  );
}
