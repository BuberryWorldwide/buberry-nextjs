"use client";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen text-gray-900">
      <Head>
        <title>Buberry Worldwide</title>
        <meta name="description" content="Regenerative Agriculture Meets Web3 – Grow, Stake, Regenerate." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* 🌿 Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-screen text-center px-4 bg-gradient-to-b from-[#4FC3A1] to-[#6C4C94]">
        {/* ✅ Background Image */}
        <Image 
          src="/hero-image.png" 
          alt="Hero Background" 
          fill 
          style={{ objectFit: "cover" }}
          className="absolute inset-0 z-0 opacity-25"
        />

        {/* ✅ Overlay for Readability */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        {/* ✅ Content */}
        <div className="relative z-10">
          <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">Regenerative Agriculture Meets Web3</h1>
          <p className="mt-4 text-xl text-gray-300 drop-shadow-md">
            Grow, Stake, Regenerate – Earn rewards while supporting real-world sustainability.
          </p>
          <Link href="/join-the-movement">
            <button className="mt-6 px-8 py-3 bg-[#6C4C94] text-white font-semibold rounded-lg shadow-lg hover:bg-[#543875] transition">
              Join the Movement
            </button>
          </Link>
        </div>
      </section>

      {/* 🚀 How Buberry Works */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-4xl font-bold text-[#4FC3A1]">How Buberry Works</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Buberry combines <b>education, citizen science, and tokenized incentives</b> to drive regenerative sustainability.
        </p>
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {[
            { title: "🎮 Gamification", desc: "Stake NFTs & Tokens to unlock rewards." },
            { title: "📚 Education", desc: "Complete courses to earn stakeable items." },
            { title: "🔬 Citizen Science", desc: "Track & verify real-world data for rewards." },
            { title: "💰 Buberry Economy", desc: "Use tokens to expand participation & shop." }
          ].map((item, index) => (
            <motion.div 
              key={index} 
              whileHover={{ scale: 1.1 }} 
              className="p-6 w-64 bg-gray-100 shadow-lg rounded-lg cursor-pointer hover:bg-green-50 transition"
            >
              <h3 className="text-xl font-bold text-[#6A4C94]">{item.title}</h3>
              <p className="mt-2 text-gray-700">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔗 Call to Action */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold text-[#4FC3A1]">Get Started with Buberry</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Join our movement and be part of the regenerative future.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="https://auth.buberryworldwide.com/auth/login">
            <button className="btn btn-primary">🔐 Log In</button>
          </Link>
          <Link href="https://auth.buberryworldwide.com/auth/signup">
            <button className="btn btn-accent">📝 Sign Up</button>
          </Link>
        </div>
      </section>

      {/* 📜 Footer */}
      <Footer />
    </div>
  );
}
