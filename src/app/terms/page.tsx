"use client";

import Head from "next/head";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Head>
        <title>Terms of Service | Buberry</title>
        <meta name="description" content="Review the Terms of Service for Buberry Worldwide." />
      </Head>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-screen text-center px-4">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#4FC3A1] to-[#6C4C94] opacity-90"></div>

        {/* Overlay for Readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10">
          <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">Terms of Service</h1>
          <p className="mt-4 text-xl text-gray-200 max-w-3xl">
            Please read these terms carefully before using Buberry Worldwide’s services.
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 bg-white text-left max-w-5xl mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-bold text-[#4FC3A1]">1. Introduction</h2>
        <p className="mt-4 text-lg text-gray-700">
          Welcome to Buberry Worldwide. By accessing or using our platform, services, and applications, you agree to these Terms of Service.
        </p>

        {/* User Agreement */}
        <h2 className="mt-12 text-3xl font-bold text-[#4FC3A1]">2. User Agreement</h2>
        <p className="mt-4 text-lg text-gray-700">
          By using Buberry, you affirm that you are at least 18 years old or have the necessary consent from a legal guardian.
        </p>

        {/* Web3 & Blockchain Disclaimer */}
        <h2 className="mt-12 text-3xl font-bold text-[#4FC3A1]">3. Web3 & Blockchain Usage</h2>
        <p className="mt-4 text-lg text-gray-700">
          Buberry integrates <b>blockchain technology</b> to facilitate tokenized rewards, NFT staking, and regenerative economic systems. You acknowledge that:
        </p>
        <ul className="mt-4 text-lg text-gray-700 list-disc pl-6">
          <li>Blockchain transactions are <b>permanent and irreversible</b>.</li>
          <li>You are solely responsible for securing your <b>Hedera wallet and private keys</b>.</li>
          <li>We do not control <b>network fees</b> or the fluctuating value of digital assets.</li>
        </ul>

        {/* Privacy & Data Collection */}
        <h2 className="mt-12 text-3xl font-bold text-[#4FC3A1]">4. Data Collection & Privacy</h2>
        <p className="mt-4 text-lg text-gray-700">
          We respect your privacy and comply with <b>GDPR, CCPA, and other data protection laws</b>. By using Buberry, you agree to the collection and usage of <b>anonymous analytics</b> and user-generated sustainability data.
        </p>

        {/* Content & Intellectual Property */}
        <h2 className="mt-12 text-3xl font-bold text-[#4FC3A1]">5. Content & Intellectual Property</h2>
        <p className="mt-4 text-lg text-gray-700">
          All content, branding, and intellectual property on Buberry are owned by <b>Buberry Worldwide</b>. You may not copy, modify, or distribute Buberry’s materials without permission.
        </p>

        {/* Token Rewards & Economy Disclaimer */}
        <h2 className="mt-12 text-3xl font-bold text-[#4FC3A1]">6. Token Rewards & Economy</h2>
        <p className="mt-4 text-lg text-gray-700">
          Buberry offers <b>utility tokens and NFT-based incentives</b>. These tokens <b>do not constitute financial securities</b> and should be used <b>for in-game and platform utility only</b>.
        </p>

        {/* User Responsibilities */}
        <h2 className="mt-12 text-3xl font-bold text-[#4FC3A1]">7. User Responsibilities</h2>
        <p className="mt-4 text-lg text-gray-700">
          As a user, you agree to:
        </p>
        <ul className="mt-4 text-lg text-gray-700 list-disc pl-6">
          <li>Provide accurate information and not engage in fraudulent activities.</li>
          <li>Follow community guidelines and avoid harmful behavior.</li>
          <li>Accept that Buberry is an <b>experimental ecosystem</b> subject to development changes.</li>
        </ul>

        {/* Account Termination */}
        <h2 className="mt-12 text-3xl font-bold text-[#4FC3A1]">8. Account Termination</h2>
        <p className="mt-4 text-lg text-gray-700">
          We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent behavior.
        </p>

        {/* Liability Limitation */}
        <h2 className="mt-12 text-3xl font-bold text-[#4FC3A1]">9. Limitation of Liability</h2>
        <p className="mt-4 text-lg text-gray-700">
          Buberry Worldwide <b>is not responsible for any financial loss, technical failures, or security breaches</b> related to blockchain usage, third-party integrations, or platform changes.
        </p>

        {/* Governing Law */}
        <h2 className="mt-12 text-3xl font-bold text-[#4FC3A1]">10. Governing Law</h2>
        <p className="mt-4 text-lg text-gray-700">
          These Terms of Service are governed by the <b>laws of [Your Jurisdiction]</b>.
        </p>

        {/* Contact Information */}
        <h2 className="mt-12 text-3xl font-bold text-[#4FC3A1]">11. Contact Us</h2>
        <p className="mt-4 text-lg text-gray-700">
          If you have any questions about these terms, please contact us at <b>info@buberryworldwide.com</b>.
        </p>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-50 text-center">
        <h2 className="text-4xl font-bold text-[#4FC3A1]">Join the Movement</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          By using Buberry, you agree to these Terms of Service. Be part of a <b>sustainable and regenerative</b> future.
        </p>
        <button className="mt-6 px-8 py-3 bg-[#6C4C94] text-white font-semibold rounded-lg shadow-lg hover:bg-[#543875] transition">
          Get Started
        </button>
      </section>
    </div>
  );
}
