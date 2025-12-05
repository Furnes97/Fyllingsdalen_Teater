import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ImageAsset } from '../types';

interface ProductionCarouselProps {
  images: ImageAsset[];
}

export const ProductionCarousel: React.FC<ProductionCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [landscapeImages, setLandscapeImages] = useState<ImageAsset[]>([]);

  // Filter images to only include landscape (wider than tall)
  useEffect(() => {
    const filterLandscapeImages = async () => {
      // Load all images in parallel
      const imagePromises = images.map((img) => {
        return new Promise<ImageAsset | null>((resolve) => {
          const image = new Image();
          image.src = img.src;
          
          image.onload = () => {
            // Check if image is landscape (width > height)
            if (image.naturalWidth > image.naturalHeight) {
              resolve(img);
            } else {
              resolve(null);
            }
          };
          
          image.onerror = () => {
            console.warn(`Failed to load image: ${img.src}`);
            resolve(null);
          };
        });
      });
      
      const results = await Promise.all(imagePromises);
      const landscape = results.filter((img): img is ImageAsset => img !== null);
      
      setLandscapeImages(landscape);
    };

    if (images.length > 0) {
      filterLandscapeImages();
    }
  }, [images]);

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    if (landscapeImages.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % landscapeImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [landscapeImages.length, isPaused]);

  // Reset index when filtered images change
  useEffect(() => {
    if (landscapeImages.length > 0 && currentIndex >= landscapeImages.length) {
      setCurrentIndex(0);
    }
  }, [landscapeImages, currentIndex]);

  if (landscapeImages.length === 0) {
    return null;
  }

  const currentImage = landscapeImages[currentIndex];

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + landscapeImages.length) % landscapeImages.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % landscapeImages.length);
  };

  return (
    <section className="bg-theater-primary py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
            Produksjonskvalitet
          </h2>
          <div className="h-1 w-24 bg-theater-accent mx-auto mb-8" />
          <p className="text-xl text-theater-muted max-w-2xl mx-auto font-light">
            Vi setter vår ære i å levere produksjoner av høyeste kvalitet, med profesjonelle aktører, imponerende scenografi og magiske øyeblikk.
          </p>
        </motion.div>

        <div
          className="relative w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Carousel Image */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-lg bg-gray-900 overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <img
                  src={currentImage.src}
                  alt={currentImage.alt}
                  className="max-w-full max-h-full w-auto h-auto object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {landscapeImages.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                  aria-label="Forrige bilde"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                  aria-label="Neste bilde"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Progress Indicator */}
            {landscapeImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                {landscapeImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-theater-accent w-8'
                        : 'bg-white/40 w-2 hover:bg-white/60'
                    }`}
                    aria-label={`Gå til bilde ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          {landscapeImages.length > 1 && (
            <div className="mt-6 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {landscapeImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`flex-shrink-0 relative aspect-video w-24 md:w-32 rounded overflow-hidden transition-all duration-200 ${
                    index === currentIndex
                      ? 'ring-2 ring-theater-accent scale-105'
                      : 'opacity-60 hover:opacity-100 hover:scale-105'
                  }`}
                  aria-label={`Vis bilde ${index + 1}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-theater-accent/20" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

