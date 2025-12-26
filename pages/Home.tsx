import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <img
        src="/images/Home_page_photo.JPG"
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center text-white p-8 animate-fade-in-slow">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Medha Srigiri
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-light tracking-wider">
            Professional Kuchipudi Artist | Choreographer
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
