"use client";
import Head from "next/head";
import Image from "next/image"; // ✅ Ensure proper import

export default function BeyondCarbon() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Head>
        <title>Beyond Carbon Credits | Buberry</title>
        <meta name="description" content="Why Buberry Worldwide goes beyond traditional carbon credit systems." />
      </Head>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-screen text-center px-4 bg-gradient-to-b from-[#4FC3A1] to-[#6C4C94]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="/hero-image.png" 
            alt="Hero Background" 
            fill
            className="object-cover opacity-25"
          />
        </div>

        {/* Overlay for Readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10">
        <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">Beyond Carbon Credits</h1>
          <p className="mt-4 text-xl text-gray-200 max-w-2xl">
            Buberry Worldwide is building a <b>regenerative economy</b>, rewarding real-world sustainability beyond simple offsets.
          </p>
        </div>
      </section>

      {/* Why Carbon Offsets Aren’t Enough */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold text-[#4FC3A1]">Why Carbon Offsets Aren’t Enough</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Traditional carbon credits often focus solely on CO₂ reduction, but Buberry creates a <b>participatory system</b> where users actively regenerate ecosystems and receive rewards based on real-world impact.
        </p>
      </section>

      {/* How Buberry Goes Beyond */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-[#4FC3A1]">How Buberry Goes Beyond</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[#4FC3A1]">Inclusive & Scalable Participation</h3>
            <p className="mt-2 text-gray-700">
              Unlike traditional carbon markets that favor corporations, Buberry allows <b>farmers, communities, and individuals</b> to actively engage in sustainability efforts.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[#4FC3A1]">Gamified Impact & Rewards</h3>
            <p className="mt-2 text-gray-700">
              Users <b>stake NFTs & tokens</b> to participate, take action, and earn rewards that can be reinvested into further sustainability efforts.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[#4FC3A1]">Multi-Metric Regeneration</h3>
            <p className="mt-2 text-gray-700">
              Beyond CO₂, Buberry tracks <b>biodiversity, soil health, water retention, and food production</b> as part of a truly regenerative system.
            </p>
          </div>
        </div>
      </section>

      {/* Buberry Ecosystem */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold text-[#4FC3A1]">The Buberry Ecosystem</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Buberry creates a <b>circular economy</b> where learning, action, and rewards reinforce one another. Each step contributes to a <b>self-sustaining regenerative model</b>:
        </p>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[#4FC3A1]">📚 Learn-to-Earn</h3>
            <p className="mt-2 text-gray-700">
              Complete courses on sustainability and regenerative agriculture to unlock NFT rewards and ecosystem tokens.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[#4FC3A1]">🎮 Staking & Participation</h3>
            <p className="mt-2 text-gray-700">
              Stake assets to fund real-world sustainability projects and receive verified impact-based rewards.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[#4FC3A1]">🌍 Citizen Science Contributions</h3>
            <p className="mt-2 text-gray-700">
              Help track biodiversity, soil health, and ecosystem improvements while earning incentives.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[#4FC3A1]">💰 Regenerative Economy</h3>
            <p className="mt-2 text-gray-700">
              Tokens and NFTs provide access to resources, tools, and further educational opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-50 text-center">
        <h2 className="text-3xl font-bold text-[#4FC3A1]">Join the Movement</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Be part of the future of regeneration—earn, stake, and contribute to a system that prioritizes sustainability beyond just carbon offsets.
        </p>
        <button className="mt-6 px-8 py-3 bg-[#6C4C94] text-white font-semibold rounded-lg shadow-lg hover:bg-[#543875] transition">
          Get Involved
        </button>
      </section>
    </div>
  );
}
