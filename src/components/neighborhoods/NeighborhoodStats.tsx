"use client";

import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils/format";

interface NeighborhoodStatsProps {
  stats: {
    averagePrice: number;
    medianPrice: number;
    totalListings: number;
    daysOnMarket: number;
  };
}

export default function NeighborhoodStats({ stats }: NeighborhoodStatsProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Market Statistics</h2>
        
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <motion.div variants={item} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Average Price</h3>
            <p className="text-2xl font-bold text-blue-600">{formatPrice(stats.averagePrice)}</p>
          </motion.div>

          <motion.div variants={item} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Median Price</h3>
            <p className="text-2xl font-bold text-blue-600">{formatPrice(stats.medianPrice)}</p>
          </motion.div>

          <motion.div variants={item} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Active Listings</h3>
            <p className="text-2xl font-bold text-blue-600">{stats.totalListings}</p>
          </motion.div>

          <motion.div variants={item} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Days on Market</h3>
            <p className="text-2xl font-bold text-blue-600">{stats.daysOnMarket}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 