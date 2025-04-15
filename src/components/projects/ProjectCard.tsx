import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { Project } from '../../types/project';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col min-h-[420px]"
    >
      <div className="relative aspect-[16/9]">
        <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <span className={`
            px-3 py-1 rounded-full text-sm font-medium
            ${project.status === 'current' 
              ? 'bg-green-500/80 text-white' 
              : 'bg-gray-500/80 text-white'}
          `}>
            {project.status === 'current' ? 'W trakcie' : 'Zakończony'}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-medium mb-2 text-gray-800">{project.title}</h3>
        <p className="text-gray-600 mb-6 font-light line-clamp-2">{project.description}</p>
        <div className="mt-auto space-y-4">
        {project.status === 'current' && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Projekt w trakcie realizacji</span>
          </div>
        )}
        {project.status === 'completed' && project.endDate && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>Zakończony: {project.endDate}</span>
          </div>
        )}
          <button
            onClick={() => onSelect(project)}
            className="w-full px-4 py-2.5 bg-beige-400 text-white rounded-md hover:bg-beige-500 transition-colors flex items-center justify-center gap-2 group"
          >
            <span>Zobacz szczegóły</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}