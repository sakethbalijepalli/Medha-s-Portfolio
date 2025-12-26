
import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { SunIcon, MoonIcon, MenuIcon, XIcon } from './icons/Icons';
import type { Page } from '../App';

interface HeaderProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
}

const NavLink: React.FC<{
  page: Page;
  currentPage: Page;
  onClick: (page: Page) => void;
  children: React.ReactNode;
}> = ({ page, currentPage, onClick, children }) => (
  <button
    onClick={() => onClick(page)}
    className={`px-4 py-2 text-sm font-medium transition-colors duration-300 relative ${
      currentPage === page
        ? 'text-gray-900 dark:text-white'
        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
    }`}
  >
    {children}
    {currentPage === page && (
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gray-900 dark:bg-white rounded-full"></span>
    )}
  </button>
);


const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const pages: Page[] = ['Home', 'About', 'Performances', 'Press', 'Gallery', 'Professional', 'Contact'];
    
    const handleNavClick = (page: Page) => {
        onNavigate(page);
        setIsMenuOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md transition-colors duration-500">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-xl font-bold tracking-wider cursor-pointer" onClick={() => onNavigate('Home')}>
                    Medha Srigiri
                </div>
                <nav className="hidden md:flex items-center space-x-2">
                    {pages.map(p => (
                        p !== 'Home' && <NavLink key={p} page={p} currentPage={currentPage} onClick={handleNavClick}>{p}</NavLink>
                    ))}
                </nav>
                <div className="flex items-center">
                    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                    </button>
                    <div className="md:hidden ml-4">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                            {isMenuOpen ? <XIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 pb-4">
                    <nav className="flex flex-col items-center space-y-2">
                        {pages.map(p => (
                             <NavLink key={p} page={p} currentPage={currentPage} onClick={handleNavClick}>{p}</NavLink>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
