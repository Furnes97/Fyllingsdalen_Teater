import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { getHeroImage, getShowContent, getAudienceImages, getAllGalleryImages } from '../utils/content';
import { ProductionCarousel } from '../components/ProductionCarousel';

export const HomePage: React.FC = () => {
  const plays = [
    {
      id: 'ronja-roverdatter',
      playId: 'play1',
      image: getHeroImage('play1'),
      content: getShowContent('play1')
    },
    {
      id: 'hakkebakkeskogen',
      playId: 'play2',
      image: getHeroImage('play2'),
      content: getShowContent('play2')
    },
    {
      id: 'i-blanke-messingen',
      playId: 'play3',
      image: getHeroImage('play3'),
      content: getShowContent('play3')
    }
  ];

  // Get images for the audience section
  const audienceImages = getAudienceImages().slice(0, 4);
  
  // Get all gallery images from all plays for production carousel
  const productionImages = getAllGalleryImages();

  return (
    <div className="bg-theater-primary min-h-screen font-sans text-theater-light">
      {/* Main Content */}
      <div className="pt-24 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-center mb-4 text-white">
            Fyllingsdalen Teater
          </h1>
          <p className="text-center text-xl text-theater-muted mb-20 font-light">
            Opplev magien på scenen
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 gap-y-16">
            {plays.map((play) => (
              <div key={play.id} className="relative">
                 {/* Playing Period Badge (Above Card) */}
                 {play.content.playing_period && (
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-20 w-full text-center">
                      <span className="bg-theater-accent text-theater-primary px-4 py-1 text-sm font-bold uppercase tracking-wider rounded-full shadow-lg whitespace-nowrap inline-block">
                        Spilles {play.content.playing_period}
                      </span>
                    </div>
                  )}

                <div className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors group flex flex-col h-full">
                  <div className="aspect-video bg-gray-800 relative overflow-hidden">
                    {play.content.premiere && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 text-sm font-medium rounded shadow-lg border border-white/10">
                          Premiere {play.content.premiere}
                        </span>
                      </div>
                    )}
                    
                    {play.image ? (
                      <img 
                        src={play.image} 
                        alt={play.content.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                       <div className="absolute inset-0 flex items-center justify-center text-gray-600 bg-gray-900">
                        <span className="text-lg">Bilde kommer</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow min-h-[280px]">
                    <div className="flex justify-between items-start mb-2">
                       <h2 className="text-2xl font-serif font-bold text-theater-accent">{play.content.title}</h2>
                    </div>
                    <p className="text-gray-300 mb-2 font-medium">{play.content.tagline}</p>
                    <div className="text-gray-400 mb-6 flex-grow text-sm prose prose-invert prose-sm max-w-none min-h-[80px]">
                      <ReactMarkdown>{play.content.description || ''}</ReactMarkdown>
                    </div>
                    <div className="mt-auto space-y-4">
                      <Link
                        to={`/${play.id}`}
                        className="inline-block w-full text-center bg-theater-accent text-theater-primary font-semibold py-3 rounded hover:bg-white transition-colors"
                      >
                        Les mer
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audience Experience Section */}
      <section className="bg-zinc-900 py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
              Magiske øyeblikk i salen
            </h2>
            <div className="h-1 w-24 bg-theater-accent mx-auto mb-8" />
            <p className="text-xl text-theater-muted max-w-2xl mx-auto font-light">
              Det er ikke bare på scenen magien skjer. Se gleden, spenningen og latteren hos vårt fantastiske publikum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {audienceImages.map((img, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-[4/5] overflow-hidden rounded-lg group"
              >
                <img 
                  src={img.src} 
                  alt="Publikum koser seg" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Quality Carousel Section */}
      {productionImages.length > 0 && (
        <ProductionCarousel images={productionImages} />
      )}

      <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-500 bg-theater-primary relative">
        <p>&copy; {new Date().getFullYear()} Fyllingsdalen Teater. Alle rettigheter reservert.</p>
        
        {/* Scroll to Top Button */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute right-12 bottom-12 p-4 bg-theater-accent text-theater-primary rounded-full hover:bg-white transition-colors shadow-lg group"
          aria-label="Til toppen"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 transform group-hover:-translate-y-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </footer>
    </div>
  );
};
