
import React, { useState } from 'react';
import type { PerformanceHighlight } from '../types';

export const HIGHLIGHTS: PerformanceHighlight[] = [
  {
    title: 'Kuchipudi Chamber Concert Series',
    date: 'June 2026',
    location: 'Dallas, TX',
    imageUrl: '/images/highlights/kuchipudi-chamber-jun-2026.jpg',
  },
  {
    title: 'MANH',
    date: 'March 2026',
    location: 'Hyderabad, India',
    imageUrl: '/images/highlights/manh-mar-2026.jpg',
  },
  {
    title: 'Medai',
    date: 'September 2025',
    location: 'Bangalore, India',
    imageUrl: '/images/highlights/medai-sep-2025.jpg',
  },
  {
    title: 'New York Kuchipudi Dance Festival',
    date: 'August 2025',
    location: 'New York, NY',
    imageUrl: '/images/highlights/ny-kuchipudi-aug-2025.jpg',
  },
  {
    title: '16th American Natya Festival',
    date: 'June 2025',
    location: 'St. Louis, MO',
    imageUrl: '/images/highlights/natya-festival-jun-2025.jpg',
  },
];

const Highlights: React.FC = () => {
  const [lightbox, setLightbox] = useState<PerformanceHighlight | null>(null);

  return (
    <div className="pt-24 md:pt-28 pb-20">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="font-display text-5xl md:text-6xl font-light text-gray-900 dark:text-white">
            Performance <span className="italic text-gold-500">Highlights</span>
          </h1>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HIGHLIGHTS.map((item, i) => (
            <div
              key={item.title}
              className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer animate-slide-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
              onClick={() => setLightbox(item)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{item.location}</span>
                  <span className="text-xs text-gray-400">{item.date}</span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                {item.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={lightbox.imageUrl}
              alt={lightbox.title}
              className="w-full aspect-video object-cover"
            />
            <div className="p-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500 dark:text-gray-400">{lightbox.location}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{lightbox.date}</span>
                  <button
                    onClick={() => setLightbox(null)}
                    className="ml-4 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <h2 className="font-display text-3xl font-semibold text-gray-900 dark:text-white">{lightbox.title}</h2>
              {lightbox.description && (
                <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">{lightbox.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Highlights;
