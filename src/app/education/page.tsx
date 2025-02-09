"use client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Education() {
  return (
    <div className="min-h-screen text-gray-900">
      <Head>
        <title>Education | Buberry</title>
        <meta name="description" content="Learn about regenerative agriculture, sustainability, and Web3 to earn rewards." />
      </Head>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-screen text-center px-4 bg-gradient-to-b from-[#4FC3A1] to-[#6C4C94]">
        {/* Background Image */}
        <Image 
          src="/hero-image.png" 
          alt="Hero Background" 
          fill 
          style={{ objectFit: "cover" }}
          className="absolute inset-0 z-0 opacity-25"
        />

        {/* Overlay for Readability */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">Learn & Earn</h1>
          <p className="mt-4 text-xl text-gray-200 max-w-3xl">
            Buberry’s <b>Learning System</b> rewards users for expanding their knowledge of regenerative practices and sustainability.
          </p>
          <Link href="https://lms.buberryworldwide.com">
            <button className="mt-6 px-8 py-3 bg-[#6C4C94] text-white font-semibold rounded-lg shadow-lg hover:bg-[#543875] transition">
              Start Learning
            </button>
          </Link>
        </div>
      </section>

      {/* Why Education Matters */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-4xl font-bold text-[#4FC3A1]">Why Education Matters</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Buberry believes that <b>education is the key to real change</b>. By learning <b>regenerative farming, agroforestry, and sustainability principles</b>, users gain the knowledge to make an impact.
        </p>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {[
            { title: "🌱 Regenerative Agriculture", desc: "Learn how to restore soil, increase biodiversity, and implement sustainable food systems." },
            { title: "🌎 Climate Science", desc: "Understand carbon sequestration, water cycles, and ecosystem resilience." },
            { title: "🔗 Web3 & Sustainability", desc: "Discover how blockchain and tokenization can drive funding for regenerative projects." }
          ].map((item, index) => (
            <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#6A4C94]">{item.title}</h3>
              <p className="mt-2 text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How Learning Connects to Buberry */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold text-[#4FC3A1]">How Learning Ties Into the Buberry Ecosystem</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Education is not just about knowledge—it’s a <b>pathway to earning rewards, unlocking new gameplay mechanics, and contributing to sustainability</b>.
        </p>
        <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "🎓 Earn NFTs & Tokens", desc: "Every completed course rewards you with stakeable NFTs, tokens, or in-game resources." },
            { title: "🎮 Unlock New Gameplay Features", desc: "Some in-game mechanics require educational progress to access advanced staking strategies." }
          ].map((item, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#6A4C94]">{item.title}</h3>
              <p className="mt-2 text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
        <Link href="https://lms.buberryworldwide.com">
          <button className="mt-6 px-8 py-3 bg-[#4FC3A1] text-white font-semibold rounded-lg shadow-lg hover:bg-[#3C9C7B] transition">
            Browse Courses
          </button>
        </Link>
      </section>

      {/* Buberry’s Open Knowledge System */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-4xl font-bold text-[#4FC3A1]">Decentralized, Community-Driven Learning</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Buberry encourages <b>community knowledge sharing</b>—allowing experts to create and verify courses.
        </p>
        <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "📖 User-Created Courses", desc: "Verified experts can create new educational content and receive tokenized rewards." },
            { title: "✅ Community Validation", desc: "Courses are peer-reviewed and validated through on-chain reputation systems." }
          ].map((item, index) => (
            <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#6A4C94]">{item.title}</h3>
              <p className="mt-2 text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-50 text-center">
        <h2 className="text-4xl font-bold text-[#4FC3A1]">Start Learning Today</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Join Buberry’s education platform and take the first step toward <b>regenerative knowledge and real-world impact</b>.
        </p>
        <Link href="https://lms.buberryworldwide.com">
          <button className="mt-6 px-8 py-3 bg-[#6C4C94] text-white font-semibold rounded-lg shadow-lg hover:bg-[#543875] transition">
            Explore Buberry LMS
          </button>
        </Link>
      </section>
    </div>
  );
}
