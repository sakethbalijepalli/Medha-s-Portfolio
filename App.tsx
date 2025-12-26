
import React, { useState, useCallback } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Performances from './pages/Performances';
import Press from './pages/Press';
import Gallery from './pages/Gallery';
import Professional from './pages/Professional';
import Contact from './pages/Contact';

export type Page = 'Home' | 'About' | 'Performances' | 'Press' | 'Gallery' | 'Professional' | 'Contact';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Home');

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <Home />;
      case 'About':
        return <About />;
      case 'Performances':
        return <Performances />;
      case 'Press':
        return <Press />;
      case 'Gallery':
        return <Gallery />;
      case 'Professional':
        return <Professional />;
      case 'Contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };
  
  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col font-sans text-gray-800 dark:text-gray-200">
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        <main className="flex-grow">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
