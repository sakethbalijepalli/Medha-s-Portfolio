
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Highlights from './pages/Highlights';
import Upcoming from './pages/Upcoming';
import Press from './pages/Press';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

export type Page = 'Home' | 'About' | 'Gallery' | 'Highlights' | 'Upcoming' | 'Press' | 'Contact';

const TITLES: Record<Page, string> = {
  Home:       'Medha Srigiri — Kuchipudi Artist',
  About:      'About — Medha Srigiri',
  Gallery:    'Gallery — Medha Srigiri',
  Highlights: 'Performance Highlights — Medha Srigiri',
  Upcoming:   'Upcoming Performances — Medha Srigiri',
  Press:      'Press & Media — Medha Srigiri',
  Contact:    'Contact — Medha Srigiri',
};

const FADE_MS = 220; // 20ms buffer over the 0.2s CSS animation

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Home');
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleNavigate = useCallback((page: Page) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setFading(true);
    timerRef.current = setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setFading(false);
    }, FADE_MS);
  }, []);

  useEffect(() => {
    document.title = TITLES[currentPage];
  }, [currentPage]);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':       return <Home onNavigate={handleNavigate} />;
      case 'About':      return <About />;
      case 'Gallery':    return <Gallery />;
      case 'Highlights': return <Highlights />;
      case 'Upcoming':   return <Upcoming />;
      case 'Press':      return <Press />;
      case 'Contact':    return <Contact />;
      default:           return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col font-sans text-gray-800 dark:text-gray-200">
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        <main className="flex-grow">
          <div className={`page-wrapper${fading ? ' page-fading-out' : ''}`}>
            {renderPage()}
          </div>
        </main>
        <Footer onNavigate={handleNavigate} />
      </div>
    </ThemeProvider>
  );
};

export default App;
