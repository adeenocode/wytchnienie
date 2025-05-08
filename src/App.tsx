import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navbar } from './components/navigation/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { GoalsSection } from './components/sections/GoalsSection';
import { ActivitiesSection } from './components/sections/ActivitiesSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { FooterSection } from './components/sections/FooterSection';
import { ProjectModal } from './components/projects/ProjectModal';
import { AdminLayout } from './components/admin/AdminLayout';
import { LoginPage } from './components/admin/LoginPage';
import { ProjectList } from './components/admin/ProjectList';
import { ProjectForm } from './components/admin/ProjectForm';
import { Project } from './types/project'

function MainLayout() {
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<ProjectList />} />
          <Route path="projects/new" element={<ProjectForm onSuccess={() => window.location.href = '/admin'} />} />
          <Route path="projects/:id/edit" element={<ProjectForm onSuccess={() => window.location.href = '/admin'} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;