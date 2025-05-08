import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { ProjectCard } from './ProjectCard';
import { supabase } from '../../lib/supabase';
import { Project } from '../../types/project';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProjectsSectionProps {
  activeProjectType: 'current' | 'completed';
  setActiveProjectType: (type: 'current' | 'completed') => void;
  onSelectProject: (project: Project) => void;
}

export function ProjectsSection({ 
  activeProjectType, 
  setActiveProjectType,
  onSelectProject 
}: ProjectsSectionProps) {
  const swiperRef = React.useRef<SwiperType>();
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const currentProjectsCount = projects.filter(p => p.status === 'current').length;
  const completedProjectsCount = projects.filter(p => p.status === 'completed').length;

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        setError('Nie udało się pobrać projektów');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  React.useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0, 0);
    }
  }, [activeProjectType]);

  if (loading) {
    return (
      <section id="projekty" className="py-20 bg-cream-100">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-1 bg-gray-200 rounded w-24 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projekty" className="py-20 bg-cream-100">
        <div className="container mx-auto px-6 text-center text-red-600">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section id="projekty" className="py-20 bg-cream-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-gray-800 mb-4">Nasze projekty</h2>
          <div className="w-24 h-1 bg-beige-400 mx-auto rounded-full"></div>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg bg-cream-200 p-1">
            <button
              onClick={() => setActiveProjectType('current')}
              className={`px-6 py-2.5 rounded-md text-sm font-medium transition-colors ${
                activeProjectType === 'current'
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Aktualne
                <span className="bg-beige-400/10 px-2 py-0.5 rounded-full text-xs">
                  {currentProjectsCount}
                </span>
              </span>
            </button>
            <button
              onClick={() => setActiveProjectType('completed')}
              className={`px-6 py-2.5 rounded-md text-sm font-medium transition-colors ${
                activeProjectType === 'completed'
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Zakończone
                <span className="bg-beige-400/10 px-2 py-0.5 rounded-full text-xs">
                  {completedProjectsCount}
                </span>
              </span>
            </button>
          </div>
        </div>

        <motion.div className="relative px-4 md:px-12">
          <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors custom-swiper-button-prev">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors custom-swiper-button-next">
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Pagination]}
            navigation={{
              enabled: true,
              prevEl: '.custom-swiper-button-prev',
              nextEl: '.custom-swiper-button-next',
            }}
            pagination={{ clickable: true }}
            spaceBetween={32}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-12"
          >
            {projects
              .filter(p => p.status === activeProjectType)
              .map(project => (
                <SwiperSlide key={project.id} className="h-auto">
                  <ProjectCard
                    project={project}
                    onSelect={onSelectProject}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}