"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Use Next.js App Router
import { createClient, Session } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export default function GetStartedButton() {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session || null); // ✅ Prevent unnecessary re-renders
    };

    checkAuth();

    // ✅ Prevent re-renders by only setting state if changed
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession((prev) => (prev?.access_token !== newSession?.access_token ? newSession : prev));
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleClick = () => {
    if (session) {
      router.push("/profile"); // Redirect logged-in users
    } else {
      router.push("/how-it-works"); // Redirect guests
    }
  };

  return (
    <button
      onClick={handleClick}
      className="mt-6 px-8 py-3 bg-[#6C4C94] text-white font-semibold rounded-lg shadow-lg hover:bg-[#543875] transition"
    >
      Get Started
    </button>
  );
}
