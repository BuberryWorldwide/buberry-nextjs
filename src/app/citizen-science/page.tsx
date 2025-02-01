"use client";
import Head from "next/head";
import Image from "next/image";

export default function CitizenScience() {
  return (
    <div className="min-h-screen text-gray-900">
      <Head>
        <title>Citizen Science | Buberry</title>
        <meta name="description" content="Contribute real-world environmental data and earn rewards through Buberry's citizen science initiative." />
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
          <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">Citizen Science</h1>
          <p className="mt-4 text-xl text-gray-200 max-w-3xl">
            Buberry empowers communities to <b>track, verify, and contribute environmental data</b>, creating a decentralized sustainability network.
          </p>
          <button className="mt-6 px-8 py-3 bg-[#6C4C94] text-white font-semibold rounded-lg shadow-lg hover:bg-[#543875] transition">
            Get Involved
          </button>
        </div>
      </section>

      {/* Why Citizen Science Matters */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-4xl font-bold text-[#4FC3A1]">Why Citizen Science Matters</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Traditional environmental tracking is <b>expensive, slow, and controlled by centralized institutions</b>.  
          Buberry creates a <b>decentralized approach</b> where anyone can contribute real-world sustainability data and earn rewards.
        </p>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {[
            { title: "🌱 Ecosystem Health", desc: "Track soil health, tree growth, water retention, and biodiversity in real-world environments." },
            { title: "🛰️ Open Data Network", desc: "Contribute environmental data to a global regenerative tracking system powered by blockchain transparency." },
            { title: "🎖 Earn Rewards", desc: "Verified contributions are rewarded with stakeable NFTs, in-game assets, and Buberry tokens." }
          ].map((item, index) => (
            <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#6A4C94]">{item.title}</h3>
              <p className="mt-2 text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How Citizen Science Works */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold text-[#4FC3A1]">How It Works</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Buberry makes environmental tracking <b>accessible to everyone</b>.  
          By submitting verified data, users earn <b>rewards and help drive real-world sustainability efforts</b>.
        </p>
        <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "📊 Submit Data", desc: "Upload tree growth, soil health, water cycle, or biodiversity observations to the network." },
            { title: "✅ Verify & Earn", desc: "Once verified, your contribution earns NFTs, in-game staking power, or tradable tokens." }
          ].map((item, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#6A4C94]">{item.title}</h3>
              <p className="mt-2 text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Citizen Science & Gamification */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-4xl font-bold text-[#4FC3A1]">How It Ties Into Buberry’s Game Economy</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Buberry integrates <b>real-world citizen science with gamification</b>, allowing players to <b>stake their data-driven rewards</b> to grow their in-game assets.
        </p>
        <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "🛠️ Data-Based NFTs", desc: "Environmental data is transformed into unique stakeable NFTs, growing in value over time." },
            { title: "🌎 Boost Sustainability Projects", desc: "Use your data rewards to fund on-the-ground regenerative agriculture initiatives." }
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
        <h2 className="text-4xl font-bold text-[#4FC3A1]">Start Contributing to Real-World Change</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Join Buberry’s citizen science movement and help track <b>real-world environmental impact</b> while earning rewards.
        </p>
        <button className="mt-6 px-8 py-3 bg-[#6C4C94] text-white font-semibold rounded-lg shadow-lg hover:bg-[#543875] transition">
          Join Citizen Science
        </button>
      </section>
    </div>
  );
}
