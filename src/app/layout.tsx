"use client";

import { useRouter, usePathname } from "next/navigation";
import { supabase } from "../supabase/client";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { useEffect } from "react"; // ✅ Remove `useState`


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user && pathname === "/join-the-movement") {
        router.push("/dashboard"); // ✅ Only redirect AFTER successful login
      }
    };

    checkUser();
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
