"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Skout Homes</h3>
            <p className="text-gray-400 text-sm">
              Your trusted partner in real estate, helping you find the perfect home in the Greater Toronto Area.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/locations/toronto" className="text-gray-400 hover:text-white transition-colors">
                  Toronto Real Estate
                </Link>
              </li>
              <li>
                <Link href="/locations/richmond-hill" className="text-gray-400 hover:text-white transition-colors">
                  Richmond Hill Real Estate
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services/home-valuation" className="text-gray-400 hover:text-white transition-colors">
                  Home Valuation
                </Link>
              </li>
              <li>
                <Link href="/calculators/land-transfer-tax" className="text-gray-400 hover:text-white transition-colors">
                  Land Transfer Tax Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <p className="text-gray-400">
              Greater Toronto Area
              <br />
              Ontario, Canada
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm text-center">
            The information provided on this website is for general informational purposes only and should not be considered as professional advice. Property details, market conditions, and other data are subject to change. Please verify all information independently.
          </p>
          <p className="text-gray-400 text-sm text-center mt-4">
            © {new Date().getFullYear()} Skout Homes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 