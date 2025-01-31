"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabase/client";
import Head from "next/head";
import Image from "next/image";

export default function Join() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Redirect if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        router.push("/dashboard");
      }
    };
    checkUser();
  }, [router]);

  const handleEmailSignup = async () => {
    setMessage("");
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Check your email for the login link!");
    }
  };

  const handleOAuthLogin = async (provider: "google") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
    if (error) alert(error.message);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Head>
        <title>Join the Movement | Buberry</title>
        <meta name="description" content="Join Buberry and be part of a regenerative future." />
      </Head>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-screen text-center px-4">
        <div className="absolute inset-0">
          <Image 
            src="/hero-image.png" 
            alt="Hero Background" 
            fill 
            className="object-cover opacity-75"
          />
        </div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10">
          <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">Join the Movement</h1>
          <p className="mt-4 text-xl text-gray-200 max-w-3xl">
            Become part of a <b>global regenerative network</b> where you can learn, contribute, and earn rewards.
          </p>
        </div>
      </section>

      {/* Signup Section */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-4xl font-bold text-[#4FC3A1]">Sign Up & Get Started</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Create an account to access Buberry’s features, track your impact, and earn rewards.
        </p>

        {/* Signup Form */}
        <div className="mt-8 flex flex-col items-center space-y-4">
          {/* Email Signup */}
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 border border-gray-300 rounded-lg w-80 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4FC3A1]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleEmailSignup}
            className="px-6 py-3 bg-[#6C4C94] text-white font-semibold rounded-lg shadow-lg hover:bg-[#543875] transition"
          >
            Sign Up with Email
          </button>
          {message && <p className="mt-2 text-lg text-gray-600">{message}</p>}

          {/* Divider */}
          <div className="flex items-center w-80">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="px-4 text-gray-600">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* OAuth Login */}
          <button
            onClick={() => handleOAuthLogin("google")}
            className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition flex items-center space-x-3"
          >
            <Image src="/google-icon.svg" alt="Google Logo" width={20} height={20} />
            <span>Continue with Google</span>
          </button>
        </div>
      </section>

      {/* Why Join Buberry? */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold text-[#4FC3A1]">Why Join Buberry?</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[#4FC3A1]">🌱 Make an Impact</h3>
            <p className="mt-2 text-gray-700">Track your regenerative actions and contribute to real-world sustainability.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[#4FC3A1]">🎮 Earn Rewards</h3>
            <p className="mt-2 text-gray-700">Get NFTs, tokens, and exclusive benefits for participating.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[#4FC3A1]">📚 Learn & Grow</h3>
            <p className="mt-2 text-gray-700">Access educational content to enhance your knowledge of sustainability.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
