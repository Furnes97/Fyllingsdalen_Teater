import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { PlayPage } from './pages/PlayPage';
import { BookingPage } from './pages/BookingPage';
import { 
  getShowContent, 
  getHeroImage, 
  getGalleryImages,
  getGroupContent,
  getDatesContent 
} from './utils/content';

function App() {
  // Helper to get all content for a specific play
  const getPlayData = (playId: string) => ({
    showContent: getShowContent(playId),
    heroImage: getHeroImage(playId),
    galleryImages: getGalleryImages(playId),
    groupContent: getGroupContent(playId),
    datesContent: getDatesContent(playId),
  });

  const play1Data = getPlayData('play1');
  const play2Data = getPlayData('play2');
  const play3Data = getPlayData('play3');

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/ronja-roverdatter" 
          element={<PlayPage {...play1Data} />} 
        />
        <Route 
          path="/hakkebakkeskogen" 
          element={<PlayPage {...play2Data} />} 
        />
        <Route 
          path="/i-blanke-messingen" 
          element={<PlayPage {...play3Data} />} 
        />
        <Route path="/bestilling" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
