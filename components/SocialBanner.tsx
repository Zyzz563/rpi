'use client';

import React, { useState } from 'react';
import { FaTelegram, FaVk, FaDiscord, FaReddit } from 'react-icons/fa';

interface SocialBannerProps {
  telegramUrl?: string;
  vkUrl?: string;
  discordUrl?: string;
  redditUrl?: string;
  className?: string;
}

export default function SocialBanner({
  telegramUrl = 'https://t.me/rpibank',
  vkUrl = 'https://vk.com/rpibank',
  discordUrl = 'https://discord.gg/rpibank',
  redditUrl = 'https://reddit.com/r/rpibank',
  className = ''
}: SocialBannerProps) {
  const [glitchIndex, setGlitchIndex] = useState<number | null>(null);
  
  const socialLinks = [
    { url: telegramUrl, icon: FaTelegram, label: 'Telegram', color: '#36c5f4' },
    { url: vkUrl, icon: FaVk, label: 'ВКонтакте', color: '#4c75a3' },
    { url: discordUrl, icon: FaDiscord, label: 'Discord', color: '#7289da' },
    { url: redditUrl, icon: FaReddit, label: 'Reddit', color: '#ff4500' }
  ];
  
  const handleShare = (platform: string, url: string) => {
    // Подготовка текста для шаринга
    const text = "Я присоединился к финансовой империи РПИ БАНКа! Присоединяйся и ты!";
    const shareUrl = encodeURIComponent(window.location.href);
    const hashTags = "РПИБАНК,fintech,rickandmorty,криптовалюта";
    
    let shareLink = '';
    
    switch (platform) {
      case 'Telegram':
        shareLink = `https://t.me/share/url?url=${shareUrl}&text=${encodeURIComponent(text)}`;
        break;
      case 'ВКонтакте':
        shareLink = `https://vk.com/share.php?url=${shareUrl}&title=${encodeURIComponent(text)}`;
        break;
      case 'Discord':
        // Discord не имеет прямой ссылки для шеринга, поэтому открываем Discord
        shareLink = url;
        break;
      case 'Reddit':
        shareLink = `https://www.reddit.com/submit?url=${shareUrl}&title=${encodeURIComponent(text)}`;
        break;
      default:
        shareLink = url;
    }
    
    window.open(shareLink, '_blank');
  };
  
  const rickQuotes = [
    "Вместе мы разрушим галактическую экономику, *бурп* один банк за другим!",
    "Распространи инфекцию РПИ БАНКа по всей мультивселенной!",
    "Пригласи своих тупых друзей, они заслуживают хотя бы нормальный банк.",
    "Сделай репост, Морти! *бурп* Сделай это для деда!",
    "Хочешь стать частью чего-то великого? Как насчет межгалактической банковской махинации?",
    "Поделись ссылкой или я превращу тебя в огурец. Не шучу."
  ];
  
  const randomQuote = rickQuotes[Math.floor(Math.random() * rickQuotes.length)];
  
  return (
    <div className={`w-full rickified-panel rounded-lg overflow-hidden ${className}`}>
      <div className="bg-[#220833] p-4 border-b border-[#5cff32]">
        <h3 className="text-xl font-bold text-[#5cff32] portal-glow text-center">
          Распространи Хаос по Мультивселенной
        </h3>
        <p className="text-white text-center mt-2 text-sm italic">
          "{randomQuote}"
        </p>
      </div>
      
      <div className="p-6 bg-[#1d111f] flex flex-wrap justify-center gap-4">
        {socialLinks.map((social, index) => (
          <div 
            key={index} 
            className="text-center"
            onMouseEnter={() => setGlitchIndex(index)}
            onMouseLeave={() => setGlitchIndex(null)}
          >
            <button
              onClick={() => handleShare(social.label, social.url)}
              className="relative flex flex-col items-center transition-all hover:scale-110"
              aria-label={`Поделиться в ${social.label}`}
            >
              <div 
                className={`w-16 h-16 flex items-center justify-center rounded-full 
                  ${glitchIndex === index ? 'animate-shake' : ''}`}
                style={{ 
                  backgroundColor: social.color,
                  boxShadow: `0 0 15px ${social.color}` 
                }}
              >
                <social.icon 
                  className="text-white text-3xl"
                />
                {glitchIndex === index && (
                  <div className="absolute inset-0 bg-white mix-blend-overlay opacity-10 animate-glitch rounded-full"></div>
                )}
              </div>
              <span className="mt-2 text-sm text-white">{social.label}</span>
            </button>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-[#1a0c27] border-t border-[#361052]">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Уже с нами: 42,137 безумцев</span>
          <div className="flex gap-2">
            <span className="text-[#5cff32] text-sm animate-pulse">•</span>
            <span className="text-gray-400 text-sm">Онлайн: 731</span>
          </div>
        </div>
      </div>
    </div>
  );
} 