"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Join() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Head>
        <title>Join the Movement | Buberry</title>
        <meta name="description" content="Join Buberry and be part of a regenerative future." />
      </Head>

      {/* 🌿 Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-screen text-center px-4 bg-gradient-to-b from-[#4FC3A1] to-[#6C4C94]">
        <Image 
          src="/hero-image.png" 
          alt="Hero Background" 
          fill 
          style={{ objectFit: "cover" }}
          className="absolute inset-0 z-0 opacity-25"
        />
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="relative z-10">
          <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">Join the Movement</h1>
          <p className="mt-4 text-xl text-gray-200 max-w-3xl">
            Become part of a <b>global regenerative network</b> where you can learn, contribute, and earn rewards.
          </p>
        </div>
      </section>

      {/* 🚀 Signup Section - Redirects to Central Auth */}
      <section className="py-16 bg-[#fafafa] text-center">
        <h2 className="text-4xl font-bold text-[#4FC3A1]">Sign Up & Get Started</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Create an account to access Buberry’s features, track your impact, and earn rewards.
        </p>

        {/* ✅ Redirect Buttons */}
        <div className="mt-8 flex flex-col items-center space-y-4">
          <Link href="https://auth.buberryworldwide.com/auth/signup">
            <button className="px-6 py-3 bg-[#6C4C94] text-white font-semibold rounded-lg shadow-lg hover:bg-[#543875] transition">
              📝 Sign Up
            </button>
          </Link>

          <div className="flex items-center w-80">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="px-4 text-gray-600">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <Link href="https://auth.buberryworldwide.com/auth/login">
            <button className="px-6 py-3 bg-[#4FC3A1] text-white font-semibold rounded-lg shadow-lg hover:bg-[#3BA58D] transition">
              🔐 Log In
            </button>
          </Link>
        </div>
      </section>

      {/* 🌎 Why Join Buberry? */}
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
