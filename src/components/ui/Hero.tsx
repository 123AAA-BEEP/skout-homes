"use client";

import { motion } from "framer-motion";

interface HeroProps {
  title: string;
  subtitle: string;
  type: "city" | "neighborhood";
  breadcrumbs?: {
    text: string;
    href: string;
  }[];
}

export default function Hero({ title, subtitle, type, breadcrumbs }: HeroProps) {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24 md:py-32">
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="container mx-auto px-4 relative">
        {/* Breadcrumbs */}
        {breadcrumbs && (
          <div className="mb-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-2">
                {breadcrumbs.map((crumb, index) => (
                  <li key={crumb.href} className="inline-flex items-center">
                    {index > 0 && <span className="mx-2 text-gray-300">/</span>}
                    <a
                      href={crumb.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {crumb.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        )}

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </div>
  );
} 