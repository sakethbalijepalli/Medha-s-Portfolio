
import React from 'react';
import { YouTubeIcon, InstagramIcon, LinkedInIcon } from './icons/Icons';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
            <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left mb-4 md:mb-0">
                    <p className="text-sm">&copy; {new Date().getFullYear()} Medha Srigiri. All Rights Reserved.</p>
                </div>
                <div className="flex space-x-6">
                    <a href="#" aria-label="YouTube" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">
                        <YouTubeIcon />
                    </a>
                    <a href="#" aria-label="Instagram" className="hover:text-pink-600 dark:hover:text-pink-500 transition-colors">
                        <InstagramIcon />
                    </a>
                    <a href="#" aria-label="LinkedIn" className="hover:text-blue-600 dark:hover:text-blue-500 transition-colors">
                        <LinkedInIcon />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
