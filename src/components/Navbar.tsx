"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-2">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Image src="/OGO_A_Transparaent.svg" alt="Buberry Logo" width={90} height={70} />
          <h1 className="text-2xl font-bold text-[#4FC3A1]">Buberry Worldwide</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link href="/">Home</Link>
          <Link href="/beyond-carbon">Beyond Carbon</Link>
          <Link href="/how-it-works">How It Works</Link>
          <Link href="/education">Education</Link>
          <Link href="/citizen-science">Citizen Science</Link>
          <Link href="/economy">Economy</Link>
          <Link href="/join-the-movement" className="px-4 py-2 bg-[#6AD4B0] text-white rounded-lg hover:bg-[#319070] transition">
            Get Started
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-8 h-8 text-[#4FC3A1]" /> : <Menu className="w-8 h-8 text-[#4FC3A1]" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg">
          <nav className="flex flex-col items-center space-y-4 py-6 text-gray-700 font-medium">
            <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/beyond-carbon" onClick={() => setIsOpen(false)}>Beyond Carbon</Link>
            <Link href="/how-it-works" onClick={() => setIsOpen(false)}>How It Works</Link>
            <Link href="/education" onClick={() => setIsOpen(false)}>Education</Link>
            <Link href="/citizen-science" onClick={() => setIsOpen(false)}>Citizen Science</Link>
            <Link href="/economy" onClick={() => setIsOpen(false)}>Economy</Link>
            <Link href="/join-the-movement" onClick={() => setIsOpen(false)} className="px-4 py-2 bg-[#6AD4B0] text-white rounded-lg">
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
