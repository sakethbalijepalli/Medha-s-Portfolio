
import React, { useState, useEffect, useRef } from 'react';
import type { Page } from '../App';
import { HIGHLIGHTS } from './Highlights';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div>
      {/* ── Parallax Hero ── */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <img
          src="/images/Home_page_photo.JPG"
          alt="Medha Srigiri performing Kuchipudi"
          className="parallax-hero absolute inset-0 w-full h-full object-cover object-top scale-110"
          style={{ transform: `translateY(${scrollY * 0.38}px) scale(1.12)` }}
          loading="eager"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70 z-10" />

        {/* Hero content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
          <p
            className="text-gold-400 uppercase tracking-[0.4em] text-xs md:text-sm font-light mb-5 animate-fade-in-slow"
            style={{ animationDelay: '200ms' }}
          >
            Kuchipudi Artist
          </p>
          <h1
            className="font-display text-6xl md:text-8xl lg:text-9xl font-light text-white leading-none tracking-tight animate-fade-in-slow"
            style={{ animationDelay: '500ms' }}
          >
            Medha
            <br />
            <span className="italic font-semibold text-gold-gradient">Srigiri</span>
          </h1>
          <p
            className="mt-6 text-white/70 text-base md:text-lg font-light tracking-widest animate-fade-in-slow"
            style={{ animationDelay: '900ms' }}
          >
            Performer · Choreographer · Educator
          </p>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-col sm:flex-row gap-4 animate-slide-in-up"
            style={{ animationDelay: '1200ms' }}
          >
            <button
              onClick={() => onNavigate('Upcoming')}
              className="px-8 py-3 bg-gold-500 hover:bg-gold-400 text-white text-sm font-medium tracking-widest uppercase transition-colors duration-300 rounded-full"
            >
              Upcoming Shows
            </button>
            <button
              onClick={() => onNavigate('Contact')}
              className="px-8 py-3 border border-white/60 hover:border-white text-white text-sm font-medium tracking-widest uppercase transition-colors duration-300 rounded-full backdrop-blur-sm"
            >
              Book · Collaborate
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50 animate-pulse-soft">
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>


      {/* ── About teaser ── */}
      <section className="py-24 md:py-32 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <p className="ornament text-gray-400 text-sm tracking-widest uppercase mb-8">
            About Medha
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-gray-900 dark:text-white leading-tight mb-8">
            Rooted in tradition,<br />
            <span className="italic text-gold-500">alive in every movement.</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-2xl mx-auto mb-10">
            Trained for over 17 years in the Vempati style, Medha Srigiri brings Kuchipudi to stages
            across the U.S. and India — balancing a career in healthcare strategy with an uncompromising
            commitment to the classical arts.
          </p>
          <button
            onClick={() => onNavigate('About')}
            className="text-gold-500 dark:text-gold-400 text-sm font-medium tracking-widest uppercase hover:underline underline-offset-4 transition-all"
          >
            Read her story →
          </button>
        </div>
      </section>

      {/* ── Performance highlights teaser ── */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <p className="ornament text-gray-400 text-sm tracking-widest uppercase mb-4">
              On Stage
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-gray-900 dark:text-white">
              Performance <span className="italic text-gold-500">Highlights</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HIGHLIGHTS.slice(0, 3).map((card, i) => (
              <div
                key={card.title}
                className="group relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 animate-slide-in-up cursor-pointer"
                style={{ animationDelay: `${i * 150}ms` }}
                onClick={() => onNavigate('Highlights')}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] tracking-widest uppercase text-gold-500 font-medium">{card.location}</span>
                    <span className="text-[10px] text-gray-400">{card.date}</span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold mt-1 text-gray-900 dark:text-white">{card.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate('Highlights')}
              className="text-gold-500 dark:text-gold-400 text-sm font-medium tracking-widest uppercase hover:underline underline-offset-4 transition-all"
            >
              View all highlights →
            </button>
          </div>
        </div>
      </section>

      {/* ── Press quote strip ── */}
      <section className="py-20 bg-gray-950 dark:bg-black">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <svg className="w-8 h-8 text-gold-500 mx-auto mb-6 opacity-60" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="font-display text-2xl md:text-3xl font-light italic text-white leading-relaxed">
            "A true torchbearer of the Kuchipudi tradition, infusing classical purity
            with a contemporary sensibility."
          </blockquote>
          <p className="mt-6 text-gold-400 text-sm tracking-widest uppercase">
            The New Indian Express
          </p>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="py-24 bg-white dark:bg-gray-950 text-center">
        <div className="container mx-auto px-6">
          <p className="ornament text-gray-400 text-sm tracking-widest uppercase mb-6">
            Let's Connect
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">
            Interested in a <span className="italic text-gold-500">collaboration?</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-8">
            For bookings, workshops, and creative partnerships — reach out and Medha will be in touch.
          </p>
          <button
            onClick={() => onNavigate('Contact')}
            className="px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium tracking-widest uppercase hover:bg-gold-500 dark:hover:bg-gold-400 dark:hover:text-white transition-colors duration-300 rounded-full"
          >
            Get in touch
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
