"use client";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#6C4C94] text-white py-12 px-6 text-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* Brand Section */}
        <div>
          <h3 className="text-2xl font-extrabold tracking-wide">Buberry Worldwide</h3>
          <p className="mt-3 text-gray-200 max-w-xs">
            Transforming sustainability through blockchain-powered regenerative agriculture.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <Link href="/beyond-carbon" className="hover:text-gray-300 transition">Beyond Carbon</Link>
          <Link href="/how-it-works" className="hover:text-gray-300 transition">How It Works</Link>
          <Link href="/education" className="hover:text-gray-300 transition">Education</Link>
          <Link href="/citizen-science" className="hover:text-gray-300 transition">Citizen Science</Link>
          <Link href="/economy" className="hover:text-gray-300 transition">Economy</Link>
        </div>

        {/* Terms and Privacy */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <Link href="/terms" className="hover:text-gray-300 transition">Terms of Use</Link>
          <Link href="/privacy" className="hover:text-gray-300 transition">Privacy Policy</Link>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-end">
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-[#6C4C94] rounded-full hover:bg-gray-200 transition">
              <FaFacebookF className="text-lg" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-[#6C4C94] rounded-full hover:bg-gray-200 transition">
              <FaTwitter className="text-lg" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-[#6C4C94] rounded-full hover:bg-gray-200 transition">
              <FaInstagram className="text-lg" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-[#6C4C94] rounded-full hover:bg-gray-200 transition">
              <FaLinkedinIn className="text-lg" />
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-300">Email: <a href="mailto:bu@buberryworldwide.com" className="hover:underline">bu@buberryworldwide.com</a></p>
        </div>
      </div>
    </footer>
  );
}
