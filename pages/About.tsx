
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-28 md:py-36 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
        <div className="md:col-span-2 animate-slide-in-up">
          <img 
            src="https://picsum.photos/600/800" 
            alt="Medha Srigiri" 
            className="rounded-lg shadow-2xl object-cover w-full h-full"
          />
        </div>
        <div className="md:col-span-3 animate-slide-in-up" style={{ animationDelay: '200ms' }}>
          <h2 className="text-4xl font-bold mb-6 border-b-2 border-gray-500 dark:border-gray-400 pb-2">
            About Me
          </h2>
          <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
            <p>
              Medha Srigiri is a visionary artist in the realm of Kuchipudi, one of India's ancient classical dance forms. Her journey into dance began at a tender age, under the tutelage of revered gurus, where she imbibed the intricate nuances and spiritual depth of the art form.
            </p>
            <p>
              Her performances are a captivating blend of precision, grace, and emotive storytelling, earning her accolades on national and international stages. Medha is not only a performer but also a dedicated teacher and choreographer, committed to preserving the purity of Kuchipudi while exploring its contemporary relevance.
            </p>
            <p>
              Beyond the stage, Medha brings the same discipline, creativity, and dedication to her professional career, excelling in [Your Professional Field]. She believes that the principles of art—focus, expression, and connection—are universally applicable and enrich every facet of life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
