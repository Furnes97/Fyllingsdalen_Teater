import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { ShowContent } from '../types';

interface HeroProps {
  content: ShowContent;
  image: string;
}

export const Hero: React.FC<HeroProps> = ({ content, image }) => {
  const scrollToDates = () => {
    const element = document.getElementById('dates');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-theater-primary">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {image ? (
          <img 
            src={image} 
            alt={content.title} 
            className="h-full w-full object-cover opacity-60"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-gray-900 to-gray-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-theater-primary via-theater-primary/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h2 className="mb-4 text-xl font-medium uppercase tracking-widest text-theater-accent md:text-2xl">
            Fyllingsdalen Teater presenterer
          </h2>
          <h1 className="mb-6 font-serif text-5xl font-bold text-white md:text-7xl lg:text-8xl">
            {content.title}
          </h1>
          <p className="mb-8 text-xl text-theater-light/90 md:text-2xl font-light italic">
            {content.tagline}
          </p>
          
          <button
            onClick={scrollToDates}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-theater-accent px-8 py-4 text-lg font-semibold text-theater-primary transition-all hover:bg-white hover:text-theater-primary"
          >
            <span>Bestill billetter</span>
            <ChevronDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
        <ChevronDown className="h-8 w-8" />
      </div>
    </section>
  );
};

