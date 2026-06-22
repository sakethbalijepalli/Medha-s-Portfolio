
import React from 'react';
import type { Page } from '../App';
import { NAV_ITEMS, SOCIAL_LINKS } from '../constants';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-950 dark:bg-black text-gray-400 border-t border-gray-800">
      <div className="container mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <button onClick={() => onNavigate('Home')} className="block mb-1">
              <span className="font-display text-2xl text-white">Medha Srigiri</span>
            </button>
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold-500 mb-4">Kuchipudi Artist</p>
            <p className="text-sm leading-relaxed text-gray-500">
              Classical Kuchipudi artist and choreographer based in the U.S. and India,
              performing in the Vempati tradition for over 17 years.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-[10px] tracking-widest uppercase text-gray-600 mb-4">Navigate</p>
            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map(({ page, label }) => (
                <button
                  key={page}
                  onClick={() => onNavigate(page)}
                  className="text-sm text-gray-400 hover:text-white transition-colors text-left"
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <p className="text-[10px] tracking-widest uppercase text-gray-600 mb-4">Connect</p>
            <a
              href="mailto:m3dh5.dance@gmail.com"
              className="block text-sm text-gray-400 hover:text-gold-400 transition-colors mb-5"
            >
              m3dh5.dance@gmail.com
            </a>
            <div className="flex gap-5">
              {SOCIAL_LINKS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-500 ${s.hover} transition-colors duration-300`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} Medha Srigiri. All rights reserved.</p>
          <p>Designed with care for classical dance.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
