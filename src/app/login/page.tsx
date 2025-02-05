"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabase/client";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  // ✅ Redirect if already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        router.push("/profile");
      }
    };
    checkUser();
  }, [router]);

  // ✅ Handle email login (magic link)
  const handleEmailLogin = async () => {
    setMessage("");
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Check your email for the login link!");
    }
  };

  // ✅ Handle OAuth login (Google)
  const handleOAuthLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` }, 
    });
    if (error) alert(error.message);
  };
  
  
  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#4FC3A1] text-center">Login</h2>
        <p className="text-gray-600 text-center mt-2">Sign in to your Buberry account</p>

        {/* Email Login */}
        <div className="mt-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#4FC3A1] focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleEmailLogin}
            className="w-full mt-4 px-4 py-3 bg-[#6C4C94] text-white font-semibold rounded-lg shadow-lg hover:bg-[#543875] transition"
          >
            Send Magic Link
          </button>
          {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="px-4 text-gray-500">or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        {/* OAuth Login */}
        <button
          onClick={handleOAuthLogin}
          className="w-full flex items-center justify-center px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-lg hover:bg-gray-100 transition"
        >
          <Image src="/google-icon.svg" alt="Google Logo" width={20} height={20} />
          <span className="ml-3 font-semibold text-gray-700">Sign in with Google</span>
        </button>

        {/* Signup Link */}
        <p className="text-center text-gray-600 mt-6">
  Don&apos;t have an account?{" "}
  <a href="/join-the-movement" className="text-[#4FC3A1] font-semibold hover:underline">
    Sign Up
  </a>
</p>

      </div>
    </div>
  );
}