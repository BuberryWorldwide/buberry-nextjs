import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies(); // ✅ Await cookies() since it returns a Promise

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name) {
          return (await cookies()).get(name)?.value || null; // ✅ Await before using
        },
        async set(name, value, options) {
          (await cookies()).set(name, value, options); // ✅ Await before using
        },
        async remove(name, options) {
          (await cookies()).set(name, "", { ...options, maxAge: -1 }); // ✅ Await before using
        },
      },
    }
  );
}
