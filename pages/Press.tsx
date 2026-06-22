
import React from 'react';
import type { PressArticle } from '../types';

const pressData: PressArticle[] = [
  {
    quote: 'Medha brought to life the grandeur of the churning of the ocean and the serene emergence of Goddess Lakshmi, her movements reflecting both cosmic energy and divine grace.',
    publication: 'Nirvikalpa',
    link: 'https://www.nirvikalpa.art/post/punariksana-5',
  },
  {
    quote: "Srigiri's performance was a masterclass in storytelling, where every gesture and expression conveyed profound meaning.",
    publication: 'VoyageSTL',
    link: 'https://voyagestl.com/?post_type=interview&p=116062',
  },
  {
    quote: 'A spellbinding evening... Medha Srigiri held the audience captive with her impeccable footwork and emotive grace.',
    publication: 'The Hans India',
    link: 'https://www.thehansindia.com/featured/women/kuchipudi-extravaganza-captivates-art-lovers-884481',
  },
  {
    quote: 'A true torchbearer of the Kuchipudi tradition, infusing classical purity with a contemporary sensibility.',
    publication: 'The New Indian Express',
    link: 'https://www.newindianexpress.com/cities/hyderabad/2024/Jun/11/kuchipudi-carousel-enchants-audience-in-hyderabad',
  },
  {
    quote: 'Her command over the art form is absolute. A performance that will be remembered for years to come.',
    publication: 'The 16th American Natya Festival',
    link: 'https://narthaki.com/info/rev25/rev3439.html',
  },
  {
    quote: 'Twelve local high-school acts combined to make it a memorable night of performances at the Fox Theatre.',
    publication: 'FOX Performing Arts Teen Talent Competition',
    link: 'https://www.laduenews.com/gatherings-and-goodwill/fox-performing-arts-teen-talent-competition/collection_7d2977e4-c1c9-5319-beba-59a51e3782ec.html#8',
  },
];

const PUBLICATIONS = pressData.map(d => d.publication);

const Press: React.FC = () => {
  return (
    <div className="pt-24 md:pt-28 pb-20">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-3">In the News</p>
          <h1 className="font-display text-5xl md:text-6xl font-light text-gray-900 dark:text-white">
            Press <span className="italic text-gold-500">&amp; Media</span>
          </h1>
        </div>

        {/* Publication logos strip */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {PUBLICATIONS.map(pub => (
            <span
              key={pub}
              className="px-4 py-2 text-xs tracking-widest uppercase text-gray-400 border border-gray-200 dark:border-gray-700 rounded-full"
            >
              {pub}
            </span>
          ))}
        </div>

        {/* Quotes grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {pressData.map((item, i) => (
            <div
              key={i}
              className="group bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 hover:border-gold-300 dark:hover:border-gold-700 hover:shadow-md transition-all duration-300 animate-slide-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Quote mark */}
              <svg className="w-8 h-8 text-gold-400 mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <blockquote className="font-display text-xl md:text-2xl font-light italic text-gray-800 dark:text-gray-200 leading-relaxed">
                "{item.quote}"
              </blockquote>

              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{item.publication}</p>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gold-500 hover:underline underline-offset-4 font-medium tracking-wider"
                  >
                    Read article →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* YouTube section */}
        <div className="mt-20 max-w-3xl mx-auto text-center">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-4">Video</p>
          <h2 className="font-display text-3xl md:text-4xl font-light text-gray-900 dark:text-white mb-4">
            Watch Medha Perform
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
            Full performances and excerpts available on YouTube.
          </p>
          <a
            href="https://www.youtube.com/@m3dh5_dance"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium tracking-widest uppercase rounded-full transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
            YouTube Channel
          </a>
        </div>

      </div>
    </div>
  );
};

export default Press;
