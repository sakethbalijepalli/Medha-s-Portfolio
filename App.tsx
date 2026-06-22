
import React, { useState, useCallback, useEffect } from 'react';
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

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Home');

  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    document.title = TITLES[currentPage];
  }, [currentPage]);

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
          <div className="page-wrapper">
            {renderPage()}
          </div>
        </main>
        <Footer onNavigate={handleNavigate} />
      </div>
    </ThemeProvider>
  );
};

export default App;
