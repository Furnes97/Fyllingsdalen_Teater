import { Hero } from './components/Hero';
import { Showcase } from './components/Showcase';
import { Benefits } from './components/Benefits';
import { Dates } from './components/Dates';
import { 
  getShowContent, 
  getHeroImage, 
  getGalleryImages,
  getGroupContent,
  getDatesContent 
} from './utils/content';

function App() {
  const showContent = getShowContent();
  const heroImage = getHeroImage();
  const galleryImages = getGalleryImages();
  const groupContent = getGroupContent();
  const datesContent = getDatesContent();

  return (
    <main className="bg-theater-primary min-h-screen text-theater-light antialiased selection:bg-theater-accent selection:text-theater-primary">
      <Hero content={showContent} image={heroImage} />
      <Showcase images={galleryImages} />
      <Benefits content={groupContent} />
      <Dates content={datesContent} />
      
      <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Fyllingsdalen Teater. Alle rettigheter reservert.</p>
      </footer>
    </main>
  );
}

export default App;
