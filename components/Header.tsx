
import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { SunIcon, MoonIcon, MenuIcon, XIcon } from './icons/Icons';
import type { Page } from '../App';
import { NAV_ITEMS } from '../constants';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const NavLink: React.FC<{
  page: Page;
  label: string;
  currentPage: Page;
  onClick: (page: Page) => void;
}> = ({ page, label, currentPage, onClick }) => {
  const isActive = currentPage === page;
  return (
    <button
      onClick={() => onClick(page)}
      className={`relative px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-300 nav-link-hover ${
        isActive
          ? 'text-gold-500 dark:text-gold-400'
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
      }`}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gold-500 rounded-full" />
      )}
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll(); // sync check on mount — correct initial state if page loads scrolled
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-md shadow-sm'
          : 'bg-white/60 dark:bg-gray-950/60 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('Home')}
          className="flex flex-col items-start leading-none"
        >
          <span className="font-display text-xl font-semibold tracking-widest text-gray-900 dark:text-white">
            Medha Srigiri
          </span>
          <span className="text-[10px] tracking-[0.25em] text-gold-500 uppercase mt-0.5">
            Kuchipudi Artist
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ page, label }) => (
            <NavLink
              key={page}
              page={page}
              label={label}
              currentPage={currentPage}
              onClick={handleNavClick}
            />
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 pb-4 animate-fade-in">
          <nav className="flex flex-col items-center gap-1 pt-2">
            {NAV_ITEMS.map(({ page, label }) => (
              <NavLink
                key={page}
                page={page}
                label={label}
                currentPage={currentPage}
                onClick={handleNavClick}
              />
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
