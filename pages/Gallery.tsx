
import React, { useState, useEffect } from 'react';
import type { GalleryImage } from '../types';

function thumbSrc(src: string): string {
  return src.replace('/images/gallery/', '/images/gallery/thumbs/');
}

const images: GalleryImage[] = [
  { id:  1, src: '/images/gallery/Picsart_24-04-21_11-28-33-465.jpg',        alt: 'Medha Srigiri — mudra silhouette' },
  { id:  2, src: '/images/gallery/medha-yamini-dalal-photography-29.jpg',     alt: 'Medha Srigiri — photography by Yamini Dalal' },
  { id:  3, src: '/images/gallery/_GMD5568.jpg',                              alt: 'Kuchipudi classical dance performance' },
  { id:  4, src: '/images/gallery/4M1A1225.jpg',                              alt: 'Kuchipudi performance' },
  { id:  5, src: '/images/gallery/medha-yamini-dalal-photography-24.jpg',     alt: 'Medha Srigiri — photography by Yamini Dalal' },
  { id:  6, src: '/images/gallery/DSC06621.jpg',                              alt: 'Kuchipudi stage performance' },
  { id:  7, src: '/images/gallery/_GMD5533.jpg',                              alt: 'Kuchipudi classical dance performance' },
  { id:  8, src: '/images/gallery/medha-yamini-dalal-photography-36.jpg',     alt: 'Medha Srigiri — photography by Yamini Dalal' },
  { id:  9, src: '/images/gallery/4M1A1082.jpg',                              alt: 'Kuchipudi performance' },
  { id: 10, src: '/images/gallery/_GMD5554.jpg',                              alt: 'Kuchipudi classical dance performance' },
  { id: 11, src: '/images/gallery/medha-yamini-dalal-photography-38.jpg',     alt: 'Medha Srigiri — photography by Yamini Dalal' },
  { id: 12, src: '/images/gallery/_GMD3298.jpg',                              alt: 'Kuchipudi classical dance performance' },
  { id: 13, src: '/images/gallery/4M1A1054.jpg',                              alt: 'Kuchipudi performance' },
  { id: 14, src: '/images/gallery/_GMD5395.jpg',                              alt: 'Kuchipudi classical dance performance' },
  { id: 15, src: '/images/gallery/medha-yamini-dalal-photography-35.jpg',     alt: 'Medha Srigiri — photography by Yamini Dalal' },
  { id: 16, src: '/images/gallery/DSC06669.jpg',                              alt: 'Kuchipudi stage performance' },
  { id: 17, src: '/images/gallery/_GMD4784.jpg',                              alt: 'Kuchipudi classical dance performance' },
  { id: 18, src: '/images/gallery/4M1A1156.jpg',                              alt: 'Kuchipudi performance' },
  { id: 19, src: '/images/gallery/medha-yamini-dalal-photography-42.jpg',     alt: 'Medha Srigiri — photography by Yamini Dalal' },
  { id: 20, src: '/images/gallery/_GMD2682.jpg',                              alt: 'Kuchipudi classical dance performance' },
  { id: 21, src: '/images/gallery/4M1A1004.jpg',                              alt: 'Kuchipudi performance' },
  { id: 22, src: '/images/gallery/medha-yamini-dalal-photography-50.jpg',     alt: 'Medha Srigiri — photography by Yamini Dalal' },
  { id: 23, src: '/images/gallery/_GMD5427.jpg',                              alt: 'Kuchipudi classical dance performance' },
  { id: 24, src: '/images/gallery/_GMD5279.jpg',                              alt: 'Kuchipudi classical dance performance' },
  { id: 25, src: '/images/gallery/_GMD5036.jpg',                              alt: 'Kuchipudi — ghungroo detail' },
];

const Gallery: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);
  const selected = selectedIdx >= 0 ? images[selectedIdx] : null;

  const open = (idx: number) => setSelectedIdx(idx);
  const close = () => setSelectedIdx(-1);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIdx(i => (i - 1 + images.length) % images.length);
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIdx(i => (i + 1) % images.length);
  };

  // Keyboard nav — single persistent listener; guard is inside functional updaters so deps can be []
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIdx(-1);
      if (e.key === 'ArrowLeft') setSelectedIdx(i => i < 0 ? i : (i - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') setSelectedIdx(i => i < 0 ? i : (i + 1) % images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="pt-24 md:pt-28 pb-20">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-3">Portfolio</p>
          <h1 className="font-display text-5xl md:text-6xl font-light text-gray-900 dark:text-white">
            Gallery
          </h1>
          <p className="text-gray-400 text-sm mt-4">Click any image to view full size</p>
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
          {images.map((img, i) => (
            <div
              key={img.id}
              className="mb-4 break-inside-avoid group relative cursor-pointer overflow-hidden rounded-xl animate-slide-in-up"
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={() => open(i)}
            >
              <img
                src={thumbSrc(img.src)}
                alt={img.alt}
                loading="lazy"
                onError={e => { (e.currentTarget as HTMLImageElement).src = img.src; }}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={close}
        >
          <button
            onClick={prev}
            className="absolute left-4 md:left-8 z-10 p-3 text-white/60 hover:text-white transition-colors"
            aria-label="Previous image"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <img
            src={selected.src}
            alt={selected.alt}
            className="max-h-[85vh] max-w-[85vw] object-contain rounded-xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />

          <button
            onClick={next}
            className="absolute right-4 md:right-8 z-10 p-3 text-white/60 hover:text-white transition-colors"
            aria-label="Next image"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={close}
            className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest">
            {selectedIdx + 1} / {images.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
