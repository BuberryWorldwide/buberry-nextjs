"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // ✅ No need to check user authentication here
    console.log("Landing page loaded");
  }, []);

  return (
    <html lang="en">
      <body className="antialiased">
        <Analytics />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <footer className="py-10 bg-[#6C4C94] text-white text-center">
          <p>&copy; {new Date().getFullYear()} Buberry Worldwide. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
