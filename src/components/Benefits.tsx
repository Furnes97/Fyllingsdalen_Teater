import React from 'react';
import { motion } from 'framer-motion';
import type { GroupContent } from '../types';
import { getIcon } from './Icons';
import { ArrowRight } from 'lucide-react';

interface BenefitsProps {
  content: GroupContent;
}

export const Benefits: React.FC<BenefitsProps> = ({ content }) => {
  const scrollToDates = () => {
    const element = document.getElementById('dates');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-zinc-900 py-24 px-4 md:px-8 border-y border-white/5">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          
          {/* Left Column: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 font-serif text-3xl font-bold text-white md:text-5xl">
              {content.heading}
            </h2>
            <p className="mb-8 text-xl text-theater-accent">
              {content.subheading}
            </p>
            
            {/* Optional Image */}
            {content.image && (
              <div className="mb-8 rounded-xl bg-black/40">
                <img 
                  src={content.image} 
                  alt="Bedriftsevent" 
                  className="w-full max-h-[520px] object-contain mx-auto transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            )}

            <div className="prose prose-invert mb-8 text-gray-400">
               <p>{content.body}</p>
            </div>

            <button
              onClick={scrollToDates}
              className="inline-flex items-center gap-2 text-lg font-medium text-white underline decoration-theater-accent decoration-2 underline-offset-4 hover:text-theater-accent transition-colors"
            >
              Ta kontakt for gruppeavtale
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>

          {/* Right Column: Benefit Cards */}
          <div className="grid gap-6">
            {content.benefits.map((benefit, index) => {
              const Icon = getIcon(benefit.icon);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-start gap-4 rounded-xl bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/10"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-theater-accent/10 text-theater-accent">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-400">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
