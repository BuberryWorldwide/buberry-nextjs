"use client";

import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { User } from "@supabase/supabase-js"; // ✅ Import User type
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let isMounted = true;

    const checkUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (isMounted) {
          setUser(data.user || null);
        }
      } catch (error) {
        console.error("❌ Error fetching user:", error);
      }
    };

    checkUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <html lang="en">
      <body className="antialiased">
        <Analytics />
        {/* ✅ Moved Navbar inside body to ensure proper hydration */}
        <Navbar user={user} />
        <main className="flex-grow">{children}</main>
        <footer className="py-10 bg-[#6C4C94] text-white text-center">
          {/* ✅ Prevents SSR mismatch by ensuring a static year */}
          <p>&copy; {new Date().getFullYear()} Buberry Worldwide. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
