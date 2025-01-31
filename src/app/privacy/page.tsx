"use client";
import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Head>
        <title>Privacy Policy | Buberry</title>
        <meta name="description" content="Learn how Buberry Worldwide handles your data with transparency and compliance with global privacy laws." />
      </Head>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-screen text-center px-4 bg-gradient-to-b from-[#4FC3A1] to-[#6C4C94]">
        <div className="absolute inset-0 bg-black/40"></div>
        <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">Privacy Policy</h1>
        <p className="mt-4 text-xl text-gray-200 max-w-3xl">
          Learn how Buberry Worldwide protects your data while enabling transparency and compliance with global privacy laws.
        </p>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16 bg-white text-left px-6 md:px-20">
        <h2 className="text-4xl font-bold text-green-600">📜 Privacy Policy</h2>
        <p className="mt-4 text-lg text-gray-700">
          Buberry Worldwide (“we,” “us,” or “our”) respects your privacy and is committed to protecting your personal data.
          This Privacy Policy explains how we collect, use, and safeguard your information when you use our platform, services, and applications.
        </p>

        {/* 1. Data We Collect */}
        <h3 className="mt-8 text-2xl font-bold text-[#4FC3A1]">1. Data We Collect</h3>
        <p className="mt-2 text-lg text-gray-700">
          We collect the following types of personal and non-personal data:
        </p>

        <ul className="list-disc pl-6 mt-4 text-lg text-gray-700">
          <li><b>Account Registration</b> → Name, email address, username, password (hashed).</li>
          <li><b>OAuth Sign-in</b> → If you log in via Google, GitHub, Discord, etc., we receive basic profile data (email, name, avatar).</li>
          <li><b>Payment & Transactions</b> → Payment processors handle your financial information (we do not store credit card details).</li>
          <li><b>Blockchain Transactions</b> → Public wallet addresses (we do not control or store private keys).</li>
          <li><b>Cookies & Tracking</b> → IP address, browser type, device data, and website interactions.</li>
        </ul>

        {/* 2. How We Use Your Data */}
        <h3 className="mt-8 text-2xl font-bold text-[#4FC3A1]">2. How We Use Your Data</h3>
        <ul className="list-disc pl-6 mt-4 text-lg text-gray-700">
          <li>✅ Provide platform access and services.</li>
          <li>✅ Manage accounts, authentication, and security.</li>
          <li>✅ Process payments, rewards, and transactions.</li>
          <li>✅ Improve Buberry Worldwide through analytics.</li>
          <li>✅ Prevent fraud, enforce terms, and comply with laws.</li>
        </ul>

        {/* 3. How We Share Your Data */}
        <h3 className="mt-8 text-2xl font-bold text-[#4FC3A1]">3. How We Share Your Data</h3>
        <p className="mt-2 text-lg text-gray-700">
          We <b>never sell your data</b>, but we may share it with:
        </p>
        <ul className="list-disc pl-6 mt-4 text-lg text-gray-700">
          <li><b>Third-Party Services</b> (e.g., Supabase, Google OAuth, Stripe, Discord, GitHub) for login, payments, and account management.</li>
          <li><b>Blockchain Networks</b> → Transactions on Hedera or other blockchains are public but pseudonymous.</li>
          <li><b>Legal Authorities</b> → If required by law, subpoena, or fraud prevention.</li>
        </ul>

        {/* 4. Your Rights & Choices */}
        <h3 className="mt-8 text-2xl font-bold text-[#4FC3A1]">4. Your Rights & Choices</h3>
        <p className="mt-2 text-lg text-gray-700">
          Depending on your location, you have rights under <b>GDPR, CCPA, and other privacy laws</b>, including:
        </p>
        <ul className="list-disc pl-6 mt-4 text-lg text-gray-700">
          <li>✅ <b>Right to Access</b> → Request a copy of your data.</li>
          <li>✅ <b>Right to Rectification</b> → Correct inaccurate data.</li>
          <li>✅ <b>Right to Erasure</b> → Request data deletion (except blockchain transactions).</li>
          <li>✅ <b>Right to Restrict Processing</b> → Limit how we use your data.</li>
        </ul>

        {/* 5. Data Security */}
        <h3 className="mt-8 text-2xl font-bold text-[#4FC3A1]">5. Data Security</h3>
        <p className="mt-2 text-lg text-gray-700">
          We take strong security measures to protect your data:
        </p>
        <ul className="list-disc pl-6 mt-4 text-lg text-gray-700">
          <li>🔒 Encrypted authentication (Supabase, OAuth).</li>
          <li>🔒 Secure database storage (Supabase RLS, Postgres).</li>
          <li>🔒 No storage of private wallet keys.</li>
        </ul>

        {/* 6. Data Retention */}
        <h3 className="mt-8 text-2xl font-bold text-[#4FC3A1]">6. Data Retention</h3>
        <p className="mt-2 text-lg text-gray-700">
          <li>Account data is kept <b>until you delete your account</b>.</li>  
          <li>Blockchain transactions are <b>immutable</b>.  </li>
          <li>Analytics and logs are kept for <b>1 year</b>.  </li>
        </p>

        {/* 7. Cookies & Tracking */}
        <h3 className="mt-8 text-2xl font-bold text-[#4FC3A1]">7. Cookies & Tracking</h3>
        <p className="mt-2 text-lg text-gray-700">
          We use cookies for security, analytics, and personalization.  
          You can manage cookies through <b>browser settings</b>.
        </p>

        {/* 8. Contact Us */}
        <h3 className="mt-8 text-2xl font-bold text-[#4FC3A1]">8. Contact Us</h3>
        <p className="mt-2 text-lg text-gray-700">
          For privacy concerns, contact us at:  
          <li>📩 <b>privacy@buberryworldwide.com</b></li>  
          <li>🌍 <a href="https://www.buberryworldwide.com" className="text-blue-500 hover:underline">www.buberryworldwide.com</a></li>
        </p>
      </section>

    </div>
  );
}
