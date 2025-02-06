"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabase/client";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    async function logout() {
      await supabase.auth.signOut();

      // ✅ Force cookie expiration across subdomains
      document.cookie = "sb-access-token=; path=/; domain=.buberryworldwide.com; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "sb-refresh-token=; path=/; domain=.buberryworldwide.com; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      // ✅ Redirect to home or login page
      router.replace("/");
    }

    logout();
  }, [router]);

  return <p>Logging out...</p>;
}
