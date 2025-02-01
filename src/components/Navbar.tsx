import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "../supabase/client";
import { User } from "@supabase/supabase-js"; // ✅ Import User type

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null); // ✅ Explicitly define User | null
  const router = useRouter();

  // ✅ Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user || null); // ✅ Ensure correct type
    };

    checkUser();

    // ✅ Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null); // ✅ Ensure correct type
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // ✅ Logout function
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-2">
        <div className="flex items-center space-x-3">
          <Image src="/OGO_A_Transparaent.svg" alt="Buberry Logo" width={90} height={70} />
          <h1 className="text-2xl font-bold text-[#4FC3A1]">Buberry Worldwide</h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link href="/">Home</Link>
          <Link href="/beyond-carbon">Beyond Carbon</Link>
          <Link href="/how-it-works">How It Works</Link>
          <Link href="/education">Education</Link>
          <Link href="/citizen-science">Citizen Science</Link>
          <Link href="/economy">Economy</Link>

          {/* ✅ Authenticated User Actions */}
          {user ? (
            <>
              <Link href="/dashboard" className="px-4 py-2 bg-[#4FC3A1] text-white rounded-lg hover:bg-[#3C9C7B] transition">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 bg-[#6A4C94] text-white rounded-lg hover:bg-[#522a8a] transition">
                Login
              </Link>
              <Link href="/join-the-movement" className="px-4 py-2 bg-[#6AD4B0] text-white rounded-lg hover:bg-[#319070] transition">
                Sign Up
              </Link>
            </>
          )}
        </nav>

        {/* Hamburger Button for Mobile */}
        <button
          className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-8 h-8 text-[#4FC3A1]" /> : <Menu className="w-8 h-8 text-[#4FC3A1]" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg">
          <nav className="flex flex-col items-center space-y-4 py-6 text-gray-700 font-medium">
            <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/beyond-carbon" onClick={() => setIsOpen(false)}>Beyond Carbon</Link>
            <Link href="/how-it-works" onClick={() => setIsOpen(false)}>How It Works</Link>
            <Link href="/education" onClick={() => setIsOpen(false)}>Education</Link>
            <Link href="/citizen-science" onClick={() => setIsOpen(false)}>Citizen Science</Link>
            <Link href="/economy" onClick={() => setIsOpen(false)}>Economy</Link>

            {/* ✅ Mobile Auth Actions */}
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setIsOpen(false)} className="px-4 py-2 bg-[#4FC3A1] text-white rounded-lg">
                  Dashboard
                </Link>
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)} className="px-4 py-2 bg-[#6A4C94] text-white rounded-lg ">
                  Login
                </Link>
                <Link href="/join-the-movement" onClick={() => setIsOpen(false)} className="px-4 py-2 bg-[#6AD4B0] text-white rounded-lg hover:bg-[#319070] transition">
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
