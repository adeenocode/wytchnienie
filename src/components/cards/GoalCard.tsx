import React from 'react';
import { motion } from 'framer-motion';

interface GoalCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function GoalCard({ icon, title, description }: GoalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-medium mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 font-light">{description}</p>
    </motion.div>
  );
}