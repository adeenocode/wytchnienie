import React from 'react';
import { motion } from 'framer-motion';
import logoHero from '../../assets/logo/logo-hero.svg';

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] md:min-h-screen flex items-center bg-gradient-to-b from-cream-300 via-cream-200 via-cream-100 to-transparent pt-32 md:pt-12 pb-24 md:py-0 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="relative flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-[55%] relative z-10 flex flex-col items-center lg:items-start">
            <div className="relative z-10">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl md:text-5xl lg:text-7xl font-serif text-gray-800 mb-4 md:mb-6 leading-tight">
                Wsparcie<br />zaczyna się<br />od zrozumienia
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-gray-600 text-lg md:text-xl leading-relaxed mb-6 md:mb-8 max-w-lg font-light">
                Jesteśmy grupą kobiet, które tworzą przestrzeń wsparcia, rozwoju i wytchnienia.
                Wierzymy w siłę wspólnoty i wzajemnej pomocy.
              </motion.p>
              <div className="h-px w-24 md:w-32 bg-beige-300 mb-4 md:mb-6"></div>
              <p className="text-beige-400 font-light tracking-[0.2em] uppercase text-xs md:text-sm mb-8 md:mb-12">
                Odpocznij • Znajdź siłę • Działaj
              </p>
              <a
                href="#o-nas"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#o-nas')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-beige-400 text-white rounded-full hover:bg-beige-500 transition-colors text-sm md:text-base"
              >
                Poznaj nas bliżej
              </a>
            </div>
          </div>
          <div className="w-full lg:w-[45%]">
            <div className="relative aspect-[3/4] lg:aspect-auto lg:h-[600px]">
              <div className="relative h-full w-full overflow-hidden rounded-[2rem] lg:rounded-[5rem_2rem_2rem_5rem]">
                <div className="absolute inset-0 bg-gradient-to-t from-cream-50/80 via-transparent to-transparent z-10 pointer-events-none"></div>
                <img
                  src="/images/hero.jpeg"
                  alt="Uśmiechnięte kobiety"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}