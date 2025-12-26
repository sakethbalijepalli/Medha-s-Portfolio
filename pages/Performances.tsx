
import React from 'react';
import type { Performance } from '../types';

const performancesData: Performance[] = [
  { year: 2024, title: "Festival of Arts", venue: "The Grand Theatre", location: "New York, NY", link: "#" },
  { year: 2024, title: "Cultural Crossroads", venue: "Museum of Fine Arts", location: "Boston, MA" },
  { year: 2023, title: "Nritya Darpan", venue: "Indian Cultural Center", location: "San Francisco, CA", link: "#" },
  { year: 2023, title: "An Evening of Kuchipudi", venue: "Symphony Hall", location: "Chicago, IL" },
  { year: 2022, title: "Global Dance Summit", venue: "Royal Albert Hall", location: "London, UK", link: "#" },
  { year: 2022, title: "Solo Recital", venue: "National Arts Centre", location: "Ottawa, ON" },
];

const PerformanceItem: React.FC<{ item: Performance }> = ({ item }) => (
    <div className="py-6 border-b border-gray-200 dark:border-gray-700 grid grid-cols-6 gap-4 items-center">
        <div className="col-span-1 text-lg font-semibold text-gray-600 dark:text-gray-400">{item.year}</div>
        <div className="col-span-5 md:col-span-2 font-medium text-lg text-gray-900 dark:text-white">{item.title}</div>
        <div className="col-span-6 md:col-span-2 text-gray-500 dark:text-gray-300">{item.venue}, {item.location}</div>
        <div className="col-span-6 md:col-span-1 text-right">
            {item.link && (
                <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 dark:text-blue-400 hover:underline font-medium"
                >
                    Details
                </a>
            )}
        </div>
    </div>
);

const Performances: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-28 md:py-36 animate-fade-in">
      <h2 className="text-4xl font-bold mb-8 text-center">Performances</h2>
      <div className="bg-white dark:bg-gray-800/50 p-8 rounded-lg shadow-lg">
        <div className="border-b border-gray-300 dark:border-gray-600 pb-4 mb-4 grid-cols-6 gap-4 hidden md:grid">
          <div className="col-span-1 font-bold text-gray-500 dark:text-gray-400">YEAR</div>
          <div className="col-span-2 font-bold text-gray-500 dark:text-gray-400">EVENT</div>
          <div className="col-span-2 font-bold text-gray-500 dark:text-gray-400">VENUE</div>
          <div className="col-span-1"></div>
        </div>
        <div>
            {performancesData.map((item, index) => (
                <div key={index} className="animate-slide-in-up" style={{ animationDelay: `${index * 100}ms`}}>
                    <PerformanceItem item={item} />
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Performances;
