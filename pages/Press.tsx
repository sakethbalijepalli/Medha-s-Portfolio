
import React from 'react';
import type { PressArticle } from '../types';

const pressData: PressArticle[] = [
  {
    quote: "Medha brought to life the grandeur of the churning of the ocean and the serene emergence of Goddess Lakshmi, her movements reflecting both cosmic energy and divine grace.",
    publication: "Nirvikalpa",
    link: "https://www.nirvikalpa.art/post/punariksana-5",
  },
  {
    quote: "Srigiri's performance was a masterclass in storytelling, where every gesture and expression conveyed profound meaning.",
    publication: "VoyageSTL",
    link: "https://voyagestl.com/?post_type=interview&p=116062",
  },
  {
    quote: "A spellbinding evening... Medha Srigiri held the audience captive with her impeccable footwork and emotive grace.",
    publication: "The Hans",
    link: "https://www.thehansindia.com/featured/women/kuchipudi-extravaganza-captivates-art-lovers-884481",
  },
  {
    quote: "A true torchbearer of the Kuchipudi tradition, infusing classical purity with a contemporary sensibility.",
    publication: "The New Indian Express",
    link: "https://www.newindianexpress.com/cities/hyderabad/2024/Jun/11/kuchipudi-carousel-enchants-audience-in-hyderabad",
  },
  {
    quote: "Her command over the art form is absolute. A performance that will be remembered for years to come.",
    publication: "The 16th American Natya Festival",
    link: "https://narthaki.com/info/rev25/rev3439.html",
  },
  {
    quote: "Twelve local high-school acts combined to make it a memorable night of performances at the Fox Theatre.",
    publication: "FOX Performing Arts Teen Talent Competition",
    link: "https://www.laduenews.com/gatherings-and-goodwill/fox-performing-arts-teen-talent-competition/collection_7d2977e4-c1c9-5319-beba-59a51e3782ec.html#8",
  },
];

const PressItem: React.FC<{ item: PressArticle }> = ({ item }) => (
  <div className="bg-white dark:bg-gray-800/50 p-6 rounded-lg shadow-lg transition-transform hover:scale-105 duration-300">
    <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 border-l-4 border-gray-400 dark:border-gray-500 pl-4">
      "{item.quote}"
    </blockquote>
    <div className="mt-4 text-right">
      <p className="font-semibold text-gray-800 dark:text-white">{item.publication}</p>
      {item.link && (
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 dark:text-blue-400 hover:underline">
          Read more
        </a>
      )}
    </div>
  </div>
);


const Press: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-28 md:py-36 animate-fade-in">
      <h2 className="text-4xl font-bold mb-12 text-center">Press</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {pressData.map((item, index) => (
          <div key={index} className="animate-slide-in-up" style={{ animationDelay: `${index * 150}ms` }}>
            <PressItem item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Press;
