import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { projects } from './data/projects';
import { Navbar } from './components/navigation/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { GoalsSection } from './components/sections/GoalsSection';
import { ActivitiesSection } from './components/sections/ActivitiesSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { FooterSection } from './components/sections/FooterSection';
import { ProjectModal } from './components/projects/ProjectModal';
import { Project } from './types/project';

function App() {
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
  const [activeProjectType, setActiveProjectType] = React.useState<'current' | 'completed'>('current');

  return (
    <div className="min-h-screen bg-cream-50 overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <GoalsSection />
      <ActivitiesSection />
      <ProjectsSection
        projects={projects}
        activeProjectType={activeProjectType}
        setActiveProjectType={setActiveProjectType}
        onSelectProject={setSelectedProject}
      />
      <FooterSection />
      
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

export default App;