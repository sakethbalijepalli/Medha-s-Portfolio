
import React from 'react';
import { YouTubeIcon, InstagramIcon, LinkedInIcon } from '../components/icons/Icons';

const Contact: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-28 md:py-36 flex items-center justify-center animate-fade-in" style={{ minHeight: '80vh' }}>
      <div className="text-center bg-white dark:bg-gray-800/50 p-12 rounded-lg shadow-2xl animate-slide-in-up">
        <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
          For performance inquiries, collaborations, or professional opportunities, please feel free to reach out.
        </p>
        <a
          href="mailto:m3dh5.dance@gmail.com"
          className="inline-block bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-700 dark:hover:bg-white transition-colors duration-300"
        >
          m3dh5.dance@gmail.com
        </a>
        <div className="mt-12">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Connect with me on social media</p>
          <div className="flex justify-center space-x-8">
            <a
              href="https://www.youtube.com/@m3dh5_dance"
              aria-label="YouTube"
              className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <YouTubeIcon />
            </a>

            <a
              href="https://www.instagram.com/m3dh5/"
              aria-label="Instagram"
              className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-500 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon />
            </a>

            <a
              href="https://www.linkedin.com/in/medha-srigiri/"
              aria-label="LinkedIn"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
            </a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
