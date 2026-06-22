
import React from 'react';
import type { UpcomingShow } from '../types';

// TODO: Replace with real upcoming performance dates when available
const UPCOMING: UpcomingShow[] = [
  {
    dateLabel: 'TBD 2025',
    title: 'Solo Recital — Hyderabad Season',
    venue: 'Ravindra Bharathi',
    location: 'Hyderabad, India',
    description: 'A solo Kuchipudi recital as part of the Hyderabad cultural season. Details to be announced.',
  },
  {
    dateLabel: 'TBD 2025',
    title: 'U.S. Tour — Kuchipudi Evening',
    venue: 'To Be Announced',
    location: 'United States',
    description: 'An evening of classical Kuchipudi for U.S. audiences. Venue and date to be confirmed.',
  },
];

const UpcomingPage: React.FC = () => {
  const hasShows = UPCOMING.length > 0;

  return (
    <div className="pt-24 md:pt-28 pb-20 min-h-screen">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-3">Calendar</p>
          <h1 className="font-display text-5xl md:text-6xl font-light text-gray-900 dark:text-white">
            Upcoming <span className="italic text-gold-500">Performances</span>
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400 text-base max-w-lg mx-auto">
            Stay updated with Medha's schedule across India and the U.S. Sign up for the newsletter below to be notified of new shows.
          </p>
        </div>

        {hasShows ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {UPCOMING.map((show, i) => (
              <div
                key={i}
                className="group flex gap-6 bg-white dark:bg-gray-900 rounded-xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800 hover:border-gold-400 dark:hover:border-gold-600 transition-all duration-300 animate-slide-in-up"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                {/* Date badge */}
                <div className="flex-shrink-0 flex flex-col items-center justify-start pt-1">
                  <div className="w-14 h-14 rounded-xl bg-gold-50 dark:bg-gold-900/20 border border-gold-200 dark:border-gold-800 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] tracking-widest uppercase text-gold-500 font-medium mb-1">{show.dateLabel}</p>
                      <h3 className="font-display text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
                        {show.title}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                        {show.venue} · {show.location}
                      </p>
                    </div>
                    {show.ticketLink && (
                      <a
                        href={show.ticketLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-white text-xs font-medium tracking-widest uppercase rounded-full transition-colors duration-300"
                      >
                        Tickets
                      </a>
                    )}
                  </div>
                  {show.description && (
                    <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm leading-relaxed">
                      {show.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-lg font-light">No upcoming performances announced yet.</p>
            <p className="text-sm mt-2 opacity-70">Check back soon or subscribe to the newsletter.</p>
          </div>
        )}

        {/* Newsletter signup strip */}
        <div className="mt-20 max-w-2xl mx-auto bg-gray-950 dark:bg-black rounded-2xl p-8 md:p-10 text-center animate-slide-in-up">
          <p className="text-gold-400 text-xs tracking-[0.3em] uppercase mb-3">Stay in the Loop</p>
          <h2 className="font-display text-2xl md:text-3xl font-light text-white mb-2">
            Never miss a performance.
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Subscribe to receive show announcements, behind-the-scenes updates, and more.
          </p>
          <NewsletterForm />
        </div>

      </div>
    </div>
  );
};

const NewsletterForm: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-4">
        <svg className="w-10 h-10 text-gold-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-white font-light">You're subscribed — thank you!</p>
        <p className="text-gray-400 text-sm mt-1">You'll hear from us when new shows are announced.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        placeholder="your@email.com"
        className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-gold-400 transition-colors"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-3 bg-gold-500 hover:bg-gold-400 disabled:opacity-60 text-white text-sm font-medium tracking-widest uppercase rounded-full transition-colors duration-300 flex-shrink-0"
      >
        {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
      </button>
    </form>
  );
};

export default UpcomingPage;
