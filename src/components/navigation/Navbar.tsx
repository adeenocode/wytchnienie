import React from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NavLink, MobileNavLink } from './NavLink';
import logoHeader from '../../assets/logo/logo-header.svg';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`fixed w-full bg-white/10 backdrop-blur-md z-50 shadow-sm transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-lg' : ''
    }`}>
      <div className="container mx-auto px-6">
        <div className={`flex justify-between items-center transition-all duration-300 ${
          isScrolled ? 'h-24' : 'h-28'
        }`}>
          <div className="flex items-center space-x-2">
            <img
              src={logoHeader}
              alt="Logo Wytchnienie"
              className={`w-auto transition-all duration-300 ${
                isScrolled ? 'h-12 md:h-16' : 'h-16 md:h-20'
              }`}
            />
          </div>
          
          <div className="hidden md:flex space-x-8">
            <NavLink href="#o-nas">O nas</NavLink>
            <NavLink href="#cele">Cele</NavLink>
            <NavLink href="#dzialania">Działania</NavLink>
            <NavLink href="#projekty">Projekty</NavLink>
            <NavLink href="#kontakt">Kontakt</NavLink>
          </div>
          
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white/95 backdrop-blur-md border-t">
          <div className="container mx-auto px-6 py-4 space-y-4">
            <MobileNavLink href="#o-nas" onClick={() => setIsOpen(false)}>O nas</MobileNavLink>
            <MobileNavLink href="#cele" onClick={() => setIsOpen(false)}>Cele</MobileNavLink>
            <MobileNavLink href="#dzialania" onClick={() => setIsOpen(false)}>Działania</MobileNavLink>
            <MobileNavLink href="#projekty" onClick={() => setIsOpen(false)}>Projekty</MobileNavLink>
            <MobileNavLink href="#kontakt" onClick={() => setIsOpen(false)}>Kontakt</MobileNavLink>
          </div>
        </motion.div>
      )}
    </nav>
  );
}