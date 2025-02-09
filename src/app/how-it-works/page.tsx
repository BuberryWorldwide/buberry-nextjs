"use client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function HowItWorks() {
  return (
    <div className="min-h-screen text-gray-900">
      <Head>
        <title>How It Works | Buberry</title>
        <meta name="description" content="Learn how Buberry Worldwide works and its impact." />
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
          <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">How Buberry Works</h1>
          <p className="mt-4 text-xl text-gray-200 max-w-3xl">
            Buberry is a <b>real-world regenerative economy</b> that integrates education, citizen science, and tokenized incentives.
          </p>
          <Link href="/join-the-movement">
            <button className="mt-6 px-8 py-3 bg-[#6C4C94] text-white font-semibold rounded-lg shadow-lg hover:bg-[#543875] transition">
              Get Involved
            </button>
          </Link>
        </div>
      </section>

      {/* Buberry’s Three Pillars */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-4xl font-bold text-[#4FC3A1]">The Three Pillars of Buberry</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Buberry is <b>not just a game</b>—it’s a full regenerative system that rewards learning, participation, and environmental impact.
        </p>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {[
            { title: "📚 Education & Learning", desc: "Take courses on regenerative agriculture, sustainability, and Web3 to earn tokenized rewards." },
            { title: "🌱 Citizen Science", desc: "Contribute real-world environmental data to help track ecosystem health while earning rewards." },
            { title: "🎮 Gamified Impact", desc: "Stake assets in a strategic staking game that translates in-game progress into real-world sustainability efforts." }
          ].map((item, index) => (
            <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#6A4C94]">{item.title}</h3>
              <p className="mt-2 text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Learn & Earn */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold text-[#4FC3A1]">Learn & Earn</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Buberry’s <b>Learning Management System (LMS)</b> allows users to earn <b>tokenized rewards and NFTs</b> by taking courses on <b>regenerative practices</b>.
        </p>
        <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "📖 Courses", desc: "Take courses, complete quizzes, and gain knowledge on farming, forestry, and ecosystem restoration." },
            { title: "🎖 Earn Rewards", desc: "Earn stakeable NFTs, tokens, and in-game assets for completing lessons and applying knowledge." }
          ].map((item, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#6A4C94]">{item.title}</h3>
              <p className="mt-2 text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
        <Link href="/education">
          <button className="mt-6 px-8 py-3 bg-[#4FC3A1] text-white font-semibold rounded-lg shadow-lg hover:bg-[#3C9C7B] transition">
            Start Learning
          </button>
        </Link>
      </section>

      {/* Citizen Science */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-4xl font-bold text-[#4FC3A1]">Citizen Science</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Users can <b>contribute real-world data</b> on soil health, biodiversity, and climate impact, earning tokenized rewards for verified contributions.
        </p>
        <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "📊 Track Data", desc: "Record tree growth, soil health, and water retention to build a comprehensive dataset." },
            { title: "🎯 Earn & Contribute", desc: "Verified contributions generate gameplay rewards and fund real-world sustainability initiatives." }
          ].map((item, index) => (
            <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#6A4C94]">{item.title}</h3>
              <p className="mt-2 text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
        <Link href="/citizen-science">
          <button className="mt-6 px-8 py-3 bg-[#4FC3A1] text-white font-semibold rounded-lg shadow-lg hover:bg-[#3C9C7B] transition">
            Contribute Data
          </button>
        </Link>
      </section>

      {/* Gamified Staking */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold text-[#4FC3A1]">Strategic NFT Staking</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Players <b>stake character and item NFTs</b> in <b>strategic combinations</b> to <b>enhance sustainability projects</b> and <b>gain in-game advantages</b>.
        </p>
        <Link href="/economy">
          <button className="mt-6 px-8 py-3 bg-[#6C4C94] text-white font-semibold rounded-lg shadow-lg hover:bg-[#543875] transition">
            Learn More
          </button>
        </Link>
      </section>
    </div>
  );
}
