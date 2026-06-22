
import React from 'react';

const EDUCATION = [
  {
    degree: 'Master of Arts in Kuchipudi',
    institution: 'Aria University',
    period: '2023 - 2025',
    note: 'Research focus: evolving pedagogies in classical dance — modernizing education while honoring traditional foundations.',
  },
  {
    degree: 'Master of Science in Healthcare Management',
    institution: 'Weatherhead School of Management, Case Western Reserve University',
    period: '2020 – 2021',
    note: '',
  },
  {
    degree: 'Bachelor of Science in Biochemistry',
    institution: 'Case Western Reserve University',
    period: '2017 – 2021',
    note: 'Minors in Biology, Chemistry, and Mathematics.',
  },
];

const PAST_PERFORMANCES = [
  { title: 'Kuchipudi Chamber Concert Series', location: 'Dallas, TX',        date: 'June 2026' },
  { title: 'MANH',                             location: 'Hyderabad, India',   date: 'March 2026' },
  { title: 'Medai',                            location: 'Bangalore, India',   date: 'September 2025' },
  { title: 'New York Kuchipudi Dance Festival', location: 'New York, NY',      date: 'August 2025' },
  { title: '16th American Natya Festival',     location: 'St. Louis, MO',      date: 'June 2025' },
];

const About: React.FC = () => {
  return (
    <div className="pt-24 md:pt-28">

      {/* ── Hero ── */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-2 animate-slide-in-left">
            <div className="relative">
              <img
                src="/images/gallery/_GMD5568.jpg"
                alt="Medha Srigiri"
                loading="eager"
                className="rounded-xl shadow-2xl object-cover w-full aspect-[3/4]"
              />
            </div>
          </div>

          <div className="md:col-span-3 animate-slide-in-up" style={{ animationDelay: '150ms' }}>
            <p className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-3">About</p>
            <h1 className="font-display text-5xl md:text-6xl font-light text-gray-900 dark:text-white leading-tight mb-8">
              The art of<br />
              <span className="italic font-semibold">living the dance.</span>
            </h1>

            <div className="space-y-5 text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-light">
              <p>
                Medha Srigiri has been training in the <strong className="text-gray-900 dark:text-white font-medium">Vempati style</strong> of
                Kuchipudi for over 17 years. Her foundation was built in the United States under the
                mentorship of <strong className="text-gray-900 dark:text-white font-medium">Sujatha Vinjamuri</strong> and
                her aunt <strong className="text-gray-900 dark:text-white font-medium">Shailaja Akula</strong> — a lineage
                of guidance that shaped not only her technique but her understanding of the art form's deeper purpose.
              </p>
              <p>
                A defining milestone in her journey was her <strong className="text-gray-900 dark:text-white font-medium">Rangapravesam in 2017</strong>,
                her solo debut that announced the arrival of a serious classical artist. Growing up in the
                Kuchipudi community in the U.S., she was cast in lead roles in several celebrated ballets —
                including <em>Vedas</em>, <em>Navagraha</em>, and <em>Cosmic Shiva</em>.
              </p>
              <p>
                What defines Medha's dance life now is the balance she maintains. She works full-time
                in healthcare strategy and operations,
                yet refuses to let her artistic life take a backseat. She splits her time between the U.S. and India,
                performing in both countries and immersing herself in each art world she encounters.
              </p>
              <p>
                She recently completed her <strong className="text-gray-900 dark:text-white font-medium">Master's in Kuchipudi from Aria University</strong>,
                with research focused on <em>evolving pedagogies</em> — examining how to modernize dance
                education while staying rooted in classical foundations. She is currently mentored by
                <strong className="text-gray-900 dark:text-white font-medium"> Katyayani Kanak</strong>, who has been instrumental
                in shaping Medha as a solo artist over the past year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="container mx-auto px-6">
        <hr className="border-gray-100 dark:border-gray-800" />
      </div>

      {/* ── Past Performances ── */}
      <section className="py-20 md:py-24 bg-gray-50 dark:bg-gray-900/30">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-14">
            <p className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-3">On Stage</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-gray-900 dark:text-white">
              Past <span className="italic text-gold-500">Performances</span>
            </h2>
          </div>
          <div className="space-y-0">
            {PAST_PERFORMANCES.map((p, i) => (
              <div
                key={p.title}
                className="flex items-center justify-between py-6 border-b border-gray-200 dark:border-gray-800 last:border-0 animate-slide-in-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div>
                  <h3 className="font-display text-xl font-semibold text-gray-900 dark:text-white">{p.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{p.location}</p>
                </div>
                <span className="text-sm text-gold-500 font-medium whitespace-nowrap ml-6">{p.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Education ── */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-14">
            <p className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-3">Academic Journey</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-gray-900 dark:text-white">
              Education
            </h2>
          </div>
          <div className="space-y-0">
            {EDUCATION.map((ed, i) => (
              <div
                key={ed.degree}
                className="flex gap-6 py-8 border-b border-gray-100 dark:border-gray-800 last:border-0 animate-slide-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex-shrink-0 w-12 flex flex-col items-center pt-1">
                  <div className="w-3 h-3 rounded-full bg-gold-500" />
                  {i < EDUCATION.length - 1 && (
                    <div className="w-px flex-1 bg-gray-200 dark:bg-gray-800 mt-2" />
                  )}
                </div>
                <div className="pb-2">
                  <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">{ed.period}</p>
                  <h3 className="font-display text-2xl font-semibold text-gray-900 dark:text-white">{ed.degree}</h3>
                  <p className="text-gold-600 dark:text-gold-400 font-medium mt-0.5">{ed.institution}</p>
                  {ed.note && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">{ed.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Professional note ── */}
      <section className="py-20 bg-gray-950 dark:bg-black">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-4">Beyond the Stage</p>
          <h2 className="font-display text-3xl md:text-4xl font-light text-white mb-6">
            Healthcare strategy by day,<br />
            <span className="italic text-gold-400">Kuchipudi by heart.</span>
          </h2>
          <p className="text-gray-400 font-light leading-relaxed">
            Medha holds roles in healthcare strategy and operations, bringing the same rigorous
            discipline she applies to classical dance — focus, precision, and meaningful expression
            — into her professional work. She holds an MS in Healthcare Management and a BS in
            Biochemistry from Case Western Reserve University.
          </p>
        </div>
      </section>

    </div>
  );
};

export default About;
