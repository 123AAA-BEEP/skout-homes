"use client";

import { motion } from "framer-motion";
import { FaTree, FaTrain, FaGraduationCap, FaShoppingBag } from "react-icons/fa";

interface NeighborhoodFeaturesProps {
  features: {
    parks?: string[];
    transit?: string[];
    schools?: string[];
    shopping?: string[];
  };
}

export default function NeighborhoodFeatures({ features }: NeighborhoodFeaturesProps) {
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
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Neighborhood Features</h2>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.parks && features.parks.length > 0 && (
            <motion.div variants={item} className="space-y-4">
              <div className="flex items-center gap-3 text-blue-600">
                <FaTree size={24} />
                <h3 className="text-xl font-semibold">Parks & Recreation</h3>
              </div>
              <ul className="space-y-2">
                {features.parks.map((park) => (
                  <li key={park} className="text-gray-600">{park}</li>
                ))}
              </ul>
            </motion.div>
          )}

          {features.transit && features.transit.length > 0 && (
            <motion.div variants={item} className="space-y-4">
              <div className="flex items-center gap-3 text-blue-600">
                <FaTrain size={24} />
                <h3 className="text-xl font-semibold">Transit</h3>
              </div>
              <ul className="space-y-2">
                {features.transit.map((station) => (
                  <li key={station} className="text-gray-600">{station}</li>
                ))}
              </ul>
            </motion.div>
          )}

          {features.schools && features.schools.length > 0 && (
            <motion.div variants={item} className="space-y-4">
              <div className="flex items-center gap-3 text-blue-600">
                <FaGraduationCap size={24} />
                <h3 className="text-xl font-semibold">Schools</h3>
              </div>
              <ul className="space-y-2">
                {features.schools.map((school) => (
                  <li key={school} className="text-gray-600">{school}</li>
                ))}
              </ul>
            </motion.div>
          )}

          {features.shopping && features.shopping.length > 0 && (
            <motion.div variants={item} className="space-y-4">
              <div className="flex items-center gap-3 text-blue-600">
                <FaShoppingBag size={24} />
                <h3 className="text-xl font-semibold">Shopping</h3>
              </div>
              <ul className="space-y-2">
                {features.shopping.map((shop) => (
                  <li key={shop} className="text-gray-600">{shop}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
} 