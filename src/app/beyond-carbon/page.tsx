"use client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function BeyondCarbon() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Head>
        <title>Beyond Carbon Credits | Buberry</title>
        <meta name="description" content="Why Buberry Worldwide goes beyond traditional carbon credit systems." />
      </Head>

      {/* 🌿 Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-screen text-center px-4 bg-gradient-to-b from-[#4FC3A1] to-[#6C4C94]">
        {/* ✅ Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="/hero-image.png" 
            alt="Hero Background" 
            fill
            className="object-cover opacity-25"
          />
        </div>

        {/* ✅ Overlay for Readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* ✅ Content */}
        <div className="relative z-10">
          <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">Beyond Carbon Credits</h1>
          <p className="mt-4 text-xl text-gray-200 max-w-2xl">
            Buberry Worldwide is building a <b>regenerative economy</b>, rewarding real-world sustainability beyond simple offsets.
          </p>
        </div>
      </section>

      {/* 🏆 Why Carbon Offsets Aren’t Enough */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold text-[#4FC3A1]">Why Carbon Offsets Aren’t Enough</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Traditional carbon credits often focus solely on CO₂ reduction, but Buberry creates a <b>participatory system</b> where users actively regenerate ecosystems and receive rewards based on real-world impact.
        </p>
      </section>

      {/* 🌍 How Buberry Goes Beyond */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-[#4FC3A1]">How Buberry Goes Beyond</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {[
            { title: "Inclusive & Scalable Participation", desc: "Unlike traditional carbon markets that favor corporations, Buberry allows farmers, communities, and individuals to actively engage in sustainability efforts." },
            { title: "Gamified Impact & Rewards", desc: "Users stake NFTs & tokens to participate, take action, and earn rewards that can be reinvested into further sustainability efforts." },
            { title: "Multi-Metric Regeneration", desc: "Beyond CO₂, Buberry tracks biodiversity, soil health, water retention, and food production as part of a truly regenerative system." }
          ].map((item, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#6A4C94]">{item.title}</h3>
              <p className="mt-2 text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔄 Buberry Ecosystem */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold text-[#4FC3A1]">The Buberry Ecosystem</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Buberry creates a <b>circular economy</b> where learning, action, and rewards reinforce one another.
        </p>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {[
            { title: "📚 Learn-to-Earn", desc: "Complete courses on sustainability and regenerative agriculture to unlock NFT rewards and ecosystem tokens." },
            { title: "🎮 Staking & Participation", desc: "Stake assets to fund real-world sustainability projects and receive verified impact-based rewards." },
            { title: "🌍 Citizen Science Contributions", desc: "Help track biodiversity, soil health, and ecosystem improvements while earning incentives." },
            { title: "💰 Regenerative Economy", desc: "Tokens and NFTs provide access to resources, tools, and further educational opportunities." }
          ].map((item, index) => (
            <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#6A4C94]">{item.title}</h3>
              <p className="mt-2 text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🚀 Call to Action */}
      <section className="py-16 bg-green-50 text-center">
        <h2 className="text-3xl font-bold text-[#4FC3A1]">Get Involved</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Learn how Buberry is redefining sustainability beyond carbon offsets, or take action and join the movement today.
        </p>
              
        {/* ✅ Two Logical Button Flows */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          {/* 📚 "Learn More" → Goes to deeper educational content */}
          <Link href="/how-it-works">
            <button className="px-8 py-3 bg-[#4FC3A1] text-white font-semibold rounded-lg shadow-lg hover:bg-[#3C9C7B] transition">
              Learn More
            </button>
          </Link>
              
          {/* 🔑 "Join the Movement" → Redirects to Central Auth Signup */}
          <Link href="https://auth.buberryworldwide.com/signup">
            <button className="px-8 py-3 bg-[#6C4C94] text-white font-semibold rounded-lg shadow-lg hover:bg-[#543875] transition">
              Join the Movement
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}
