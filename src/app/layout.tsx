"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "../supabase/client";
import { User } from "@supabase/supabase-js";
import Navbar from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
      }
    };

    checkUser();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        if (pathname === "/join-the-movement") {
          router.push("/dashboard"); // ✅ Only redirect AFTER successful login
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router, pathname]);

  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <footer className="py-10 bg-[#6C4C94] text-white text-center">
          <p>&copy; {new Date().getFullYear()} Buberry Worldwide. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
