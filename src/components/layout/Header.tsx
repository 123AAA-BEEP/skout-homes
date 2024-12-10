"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-blue-600">Skout Homes</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <Link href="/locations/toronto" className="text-gray-600 hover:text-blue-600 transition-colors">
            Toronto
          </Link>
          <Link href="/locations/richmond-hill" className="text-gray-600 hover:text-blue-600 transition-colors">
            Richmond Hill
          </Link>
          <Link href="/services/home-valuation" className="text-gray-600 hover:text-blue-600 transition-colors">
            Home Valuation
          </Link>
          <Link href="/calculators/land-transfer-tax" className="text-gray-600 hover:text-blue-600 transition-colors">
            LTT Calculator
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 hover:text-blue-600 transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md md:hidden">
            <div className="flex flex-col space-y-4 p-4">
              <Link
                href="/locations/toronto"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Toronto
              </Link>
              <Link
                href="/locations/richmond-hill"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Richmond Hill
              </Link>
              <Link
                href="/services/home-valuation"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home Valuation
              </Link>
              <Link
                href="/calculators/land-transfer-tax"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                LTT Calculator
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 