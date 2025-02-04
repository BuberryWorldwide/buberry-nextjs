"use client";

import { useRouter, usePathname } from "next/navigation";
import { supabase } from "../supabase/client";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js"; // ✅ Import User type
import { WalletProvider } from "../../contexts/WalletContext";
import { Analytics } from "@vercel/analytics/react"


export default function RootLayout({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState<User | null>(null); // ✅ Fix type

  useEffect(() => {
    let isMounted = true; // ✅ Prevents running when unmounted

    const checkUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
  
        if (!data.user) {
          console.warn("⚠️ No user session found.");
          if (isMounted) setUser(null);
          return;
        }
  
        console.log("✅ User session found:", data.user);
        if (isMounted) setUser(data.user);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("❌ Error fetching user:", error.message);
        } else {
          console.error("❌ Error fetching user:", error);
        }
      }
    };

    checkUser();

    return () => {
      isMounted = false; // ✅ Prevents setting state after unmount
    };
  }, []); // ✅ Runs once on mount

  return (
    <html lang="en">
      <body className="antialiased">
        <WalletProvider>
        <Analytics/>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <footer className="py-10 bg-[#6C4C94] text-white text-center">
          <p>&copy; {new Date().getFullYear()} Buberry Worldwide. All rights reserved.</p>
        </footer>
        </WalletProvider>
      </body>
    </html>
  );
}
