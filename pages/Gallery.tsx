
import React from 'react';
import type { GalleryImage } from '../types';

const images: GalleryImage[] = [
  { id: 1, src: "https://picsum.photos/id/1015/800/600", alt: "Dance pose 1" },
  { id: 2, src: "https://picsum.photos/id/1025/800/1200", alt: "Dance pose 2" },
  { id: 3, src: "https://picsum.photos/id/103/800/600", alt: "Dance pose 3" },
  { id: 4, src: "https://picsum.photos/id/1043/1200/800", alt: "Dance pose 4" },
  { id: 5, src: "https://picsum.photos/id/1047/800/600", alt: "Dance pose 5" },
  { id: 6, src: "https://picsum.photos/id/1050/800/1200", alt: "Dance pose 6" },
  { id: 7, src: "https://picsum.photos/id/1057/1200/800", alt: "Dance pose 7" },
  { id: 8, src: "https://picsum.photos/id/106/800/600", alt: "Dance pose 8" },
  { id: 9, src: "https://picsum.photos/id/1060/800/600", alt: "Dance pose 9" },
];

const Gallery: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-28 md:py-36 animate-fade-in">
      <h2 className="text-4xl font-bold mb-12 text-center">Gallery</h2>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
        {images.map((image, index) => (
          <div key={image.id} className="mb-4 break-inside-avoid animate-slide-in-up" style={{ animationDelay: `${index * 50}ms` }}>
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto rounded-lg shadow-lg object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
