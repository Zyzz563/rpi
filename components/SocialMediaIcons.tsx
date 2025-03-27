'use client';

import { useState } from 'react';
import { FaTelegram, FaTwitter, FaDiscord, FaReddit, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface SocialMediaIconsProps {
  className?: string;
  iconSize?: number;
  showLabels?: boolean;
  alignment?: 'horizontal' | 'vertical';
  theme?: 'light' | 'dark' | 'neon';
}

export default function SocialMediaIcons({
  className = '',
  iconSize = 24,
  showLabels = false,
  alignment = 'horizontal',
  theme = 'neon'
}: SocialMediaIconsProps) {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  
  const socialLinks = [
    { name: 'Telegram', icon: <FaTelegram size={iconSize} />, url: 'https://t.me/rickfinanceportal', color: '#36c5f4' },
    { name: 'Twitter', icon: <FaTwitter size={iconSize} />, url: 'https://twitter.com/rickfinance', color: '#5cff32' },
    { name: 'Discord', icon: <FaDiscord size={iconSize} />, url: 'https://discord.gg/rickfinance', color: '#7289da' },
    { name: 'Reddit', icon: <FaReddit size={iconSize} />, url: 'https://reddit.com/r/rickfinance', color: '#ff36ab' },
    { name: 'GitHub', icon: <FaGithub size={iconSize} />, url: 'https://github.com/rickfinance', color: '#ffffff' }
  ];
  
  // Анимации для значков
  const iconVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2, y: -5 }
  };
  
  // Стили в зависимости от темы
  const getIconStyles = (color: string) => {
    switch (theme) {
      case 'light':
        return {
          background: 'white',
          color: color,
          boxShadow: 'none'
        };
      case 'dark':
        return {
          background: '#1d111f',
          color: color,
          boxShadow: 'none'
        };
      case 'neon':
      default:
        return {
          background: 'rgba(29,17,31,0.7)',
          color: color,
          boxShadow: hoveredIcon ? `0 0 10px ${color}, 0 0 20px ${color}` : 'none'
        };
    }
  };
  
  return (
    <div className={`${className} ${alignment === 'vertical' ? 'flex flex-col space-y-4' : 'flex flex-row space-x-4'}`}>
      {socialLinks.map((social) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            flex items-center justify-center 
            ${alignment === 'vertical' ? 'w-12 h-12' : 'w-10 h-10'} 
            rounded-full transition-all duration-300
            transform hover:rotate-[360deg]
            ${showLabels ? 'sm:w-auto sm:px-4 sm:rounded-full' : ''}
          `}
          style={getIconStyles(social.color)}
          variants={iconVariants}
          initial="initial"
          whileHover="hover"
          onMouseEnter={() => setHoveredIcon(social.name)}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          {social.icon}
          {showLabels && (
            <span className="hidden sm:inline-block ml-2 font-medium">{social.name}</span>
          )}
          
          {hoveredIcon === social.name && theme === 'neon' && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full opacity-30"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ background: social.color }}
              />
              <motion.div
                className="absolute inset-0 rounded-full blur-sm"
                initial={{ scale: 1 }}
                animate={{ scale: 1.2, opacity: 0.5 }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                style={{ background: social.color }}
              />
            </>
          )}
        </motion.a>
      ))}
    </div>
  );
} 