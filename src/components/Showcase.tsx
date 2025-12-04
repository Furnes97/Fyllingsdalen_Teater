import React from 'react';
import { motion } from 'framer-motion';
import type { ImageAsset } from '../types';

interface ShowcaseProps {
  images: ImageAsset[];
}

export const Showcase: React.FC<ShowcaseProps> = ({ images }) => {
  // Fallback if no images
  const displayImages = images.length > 0 ? images : Array(6).fill({ src: '', alt: 'Placeholder' });

  // Optional featured image (e.g. HB1) that should span full width
  const featuredIndex = displayImages.findIndex(
    (img) => img.alt && img.alt.toLowerCase() === 'hb1'
  );
  const featuredImage = featuredIndex >= 0 ? displayImages[featuredIndex] : null;
  const restImages =
    featuredIndex >= 0
      ? displayImages.filter((_, idx) => idx !== featuredIndex)
      : displayImages;

  return (
    <section className="bg-theater-primary py-20 px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-serif text-4xl font-bold text-theater-light md:text-5xl">
            En storslått opplevelse
          </h2>
          <div className="mx-auto h-1 w-24 bg-theater-accent" />
          <p className="mt-6 text-lg text-theater-muted max-w-2xl mx-auto">
            Vi setter vår ære i å levere produksjoner av høyeste kvalitet, med profesjonelle aktører, imponerende scenografi og magiske øyeblikk.
          </p>
        </motion.div>

        {/* Featured wide image on top */}
        {featuredImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden group mb-2"
          >
            <img
              src={featuredImage.src}
              alt={featuredImage.alt}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors pointer-events-none" />
          </motion.div>
        )}

        {/* Grid for remaining images, edges touching (no gaps) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 items-stretch">
          {restImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="relative overflow-hidden group"
            >
              {img.src ? (
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center bg-gray-800 text-gray-600">
                  <span>Bilde kommer</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

