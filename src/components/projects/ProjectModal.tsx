import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, X as CloseIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Project } from '../../types/project';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          onClose();
        }
      }
      document.body.style.overflow = 'hidden';
    };
    
    document.body.style.overflow = 'hidden';
    
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, isLightboxOpen]);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-hidden"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto overscroll-contain"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b flex justify-between items-center">
          <h3 className="text-2xl font-medium text-gray-800">{project.title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          <div className="aspect-[21/9] rounded-xl overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-600 text-lg">{project.description}</p>
            
            {project.status === 'current' && (
              <div className="flex items-center gap-2 text-gray-500">
                <Clock className="w-5 h-5" />
                <span>Projekt w trakcie realizacji</span>
              </div>
            )}
          </div>
          
          {project.goals && (
            <div>
              <h4 className="text-xl font-medium mb-4 text-gray-800">Cele</h4>
              <ul className="space-y-3">
                {project.goals.map((goal, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-beige-400 mt-2 shrink-0" />
                    <p className="text-gray-600">{goal}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {project.methods && (
            <div>
              <h4 className="text-xl font-medium mb-4 text-gray-800">Metody realizacji</h4>
              <ul className="space-y-3">
                {project.methods.map((method, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-beige-400 mt-2 shrink-0" />
                    <p className="text-gray-600">{method}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {project.scope && (
            <div>
              <h4 className="text-xl font-medium mb-4 text-gray-800">Zakres działania</h4>
              <p className="text-gray-600">{project.scope}</p>
            </div>
          )}
          
          {project.status === 'completed' && project.results && (
            <div>
              <h4 className="text-xl font-medium mb-4 text-gray-800">Rezultaty</h4>
              <ul className="space-y-3">
                {project.results.map((result, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0" />
                    <p className="text-gray-600">{result}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {project.images && project.images.length > 0 && (
            <div>
              <h4 className="text-xl font-medium mb-4 text-gray-800">Galeria</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 cursor-pointer">
                {project.images.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-[4/3] rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={image}
                      alt={`${project.title} - zdjęcie ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {project.status === 'completed' && project.endDate && (
            <div>
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar className="w-5 h-5" />
                <span>Projekt zakończony: {project.endDate}</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>
      
      {/* Lightbox */}
      {isLightboxOpen && project.images && (
        <div className="fixed inset-0 bg-black z-[60] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 transition-colors z-50"
          >
            <CloseIcon className="w-8 h-8" />
          </button>
          
          <div className="w-full h-full relative">
            <button 
              onClick={(e) => e.stopPropagation()}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center text-white hover:text-gray-300 transition-colors custom-swiper-button-prev">
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center text-white hover:text-gray-300 transition-colors custom-swiper-button-next">
              <ChevronRight className="w-8 h-8" />
            </button>
            
            <Swiper
              modules={[Navigation, Pagination]}
              navigation={{
                enabled: true,
                prevEl: '.custom-swiper-button-prev',
                nextEl: '.custom-swiper-button-next',
              }}
              pagination={{ clickable: true }}
              initialSlide={currentImageIndex}
              spaceBetween={0}
              slidesPerView={1}
              className="w-full h-full"
            >
              {project.images.map((image, index) => (
                <SwiperSlide key={index} className="flex items-center justify-center">
                  <img
                    src={image}
                    alt={`${project.title} - zdjęcie ${index + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </motion.div>
  );
}