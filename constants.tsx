
import React from 'react';
import { YouTubeIcon, InstagramIcon, LinkedInIcon } from './components/icons/Icons';
import type { Page } from './App';

export const NAV_ITEMS: { page: Page; label: string }[] = [
  { page: 'About',      label: 'About' },
  { page: 'Highlights', label: 'Performance Highlights' },
  { page: 'Upcoming',   label: 'Upcoming' },
  { page: 'Gallery',    label: 'Gallery' },
  { page: 'Press',      label: 'Press' },
  { page: 'Contact',    label: 'Contact' },
];

export const SOCIAL_LINKS = [
  {
    href:  'https://www.youtube.com/@m3dh5_dance',
    label: 'YouTube',
    icon:  <YouTubeIcon />,
    hover: 'hover:text-red-500',
  },
  {
    href:  'https://www.instagram.com/m3dh5/',
    label: 'Instagram',
    icon:  <InstagramIcon />,
    hover: 'hover:text-pink-500',
  },
  {
    href:  'https://www.linkedin.com/in/medha-srigiri/',
    label: 'LinkedIn',
    icon:  <LinkedInIcon />,
    hover: 'hover:text-blue-500',
  },
];
