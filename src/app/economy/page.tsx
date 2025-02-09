"use client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Economy() {
  return (
    <div className="min-h-screen text-gray-900">
      <Head>
        <title>Buberry Economy | Buberry</title>
        <meta name="description" content="Learn how the Buberry economy drives regenerative sustainability through digital and real-world incentives." />
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
          <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">The Buberry Economy</h1>
          <p className="mt-4 text-xl text-gray-200 max-w-3xl">
            Buberry combines <b>gameplay, real-world incentives, and digital finance</b> to drive sustainability.
          </p>
          <Link href="https://economy.buberryworldwide.com">
            <button className="mt-6 px-8 py-3 bg-[#6C4C94] text-white font-semibold rounded-lg shadow-lg hover:bg-[#543875] transition">
              Explore the Economy
            </button>
          </Link>
        </div>
      </section>

      {/* What is the Buberry Economy? */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-4xl font-bold text-[#4FC3A1]">What is the Buberry Economy?</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          The Buberry economy is a <b>hybrid system</b> where <b>digital rewards translate into real-world sustainability efforts</b>.  
          Users earn, stake, and spend <b>Buberry Coin</b> to support regenerative projects, engage in educational systems, and expand their in-game progress.
        </p>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {[
            { title: "🔄 Circular Economy", desc: "Every token and NFT has utility—whether in gameplay, education, or real-world funding." },
            { title: "💰 Buberry Coin", desc: "The currency that fuels the system—usable for learning, staking, and sustainability investments." },
            { title: "🌍 Real-World Impact", desc: "Every transaction supports on-the-ground sustainability efforts." }
          ].map((item, index) => (
            <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#6A4C94]">{item.title}</h3>
              <p className="mt-2 text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How Buberry Coin Works */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold text-[#4FC3A1]">How Buberry Coin Works</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Buberry Coin is <b>earned, staked, and spent</b> within the ecosystem. It creates a <b>closed-loop system</b> where <b>value circulates and compounds</b>.
        </p>
        <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "🎮 Earn Through Participation", desc: "Players earn Buberry Coin through gameplay, staking, learning, and contributing to citizen science projects." },
            { title: "🛒 Spend in the Ecosystem", desc: "Buberry Coin can be used to buy NFTs, access exclusive content, and support regenerative projects." }
          ].map((item, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#6A4C94]">{item.title}</h3>
              <p className="mt-2 text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
        <Link href="https://economy.buberryworldwide.com">
          <button className="mt-6 px-8 py-3 bg-[#4FC3A1] text-white font-semibold rounded-lg shadow-lg hover:bg-[#3C9C7B] transition">
            Learn More About Buberry Coin
          </button>
        </Link>
      </section>

      {/* Bridging the Digital & Real-World Economy */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-4xl font-bold text-[#4FC3A1]">Bridging Digital & Real-World Value</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Buberry ensures that <b>gameplay benefits the real world</b>.  
          Users can <b>stake assets to fund sustainability projects</b> or use Buberry Coin for <b>real-world transactions</b>.
        </p>
        <Link href="https://omnia.buberryworldwide.com">
          <button className="mt-6 px-8 py-3 bg-[#6C4C94] text-white font-semibold rounded-lg shadow-lg hover:bg-[#543875] transition">
            Explore Staking & Sustainability
          </button>
        </Link>
      </section>
    </div>
  );
}
