import React from 'react';
import { Hero } from '../components/Hero';
import { Showcase } from '../components/Showcase';
import { Benefits } from '../components/Benefits';
import { Dates } from '../components/Dates';
import type { ShowContent, GroupContent, DatesContent, ImageAsset } from '../types';

interface PlayPageProps {
  showContent: ShowContent;
  heroImage: string;
  galleryImages: ImageAsset[];
  groupContent: GroupContent;
  datesContent: DatesContent;
}

export const PlayPage: React.FC<PlayPageProps> = ({
  showContent,
  heroImage,
  galleryImages,
  groupContent,
  datesContent
}) => {
  return (
    <main className="bg-theater-primary min-h-screen text-theater-light antialiased selection:bg-theater-accent selection:text-theater-primary pt-16">
      <Hero content={showContent} image={heroImage} />
      <Showcase images={galleryImages} />
      <Benefits content={groupContent} />
      <Dates content={datesContent} />
      
      <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Fyllingsdalen Teater. Alle rettigheter reservert.</p>
      </footer>
    </main>
  );
};

