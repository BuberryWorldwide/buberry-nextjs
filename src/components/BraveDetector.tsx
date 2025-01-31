"use client"; // ✅ Ensure this runs only in the client

import { useEffect } from "react";

export default function BraveDetector() {
  useEffect(() => {
    if (typeof window !== "undefined" && (navigator as any).brave) {
      (navigator as any).brave.isBrave().then((isBrave: boolean) => {
        if (isBrave) {
          console.log("🚀 Brave detected. Disabling Ethereum injection.");
          (window as any).ethereum = undefined;
        }
      });
    }
  }, []);

  return null; // ✅ This component just runs the effect, no UI needed
}
