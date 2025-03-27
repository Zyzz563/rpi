'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaTelegram, FaChevronDown, FaFlask, FaUserSecret, FaMoneyBillWave, FaChartLine, FaRocket, FaBars, FaTimes } from 'react-icons/fa';

export default function RickNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);
  const [paymentsDropdownOpen, setPaymentsDropdownOpen] = useState(false);
  const [tokenDropdownOpen, setTokenDropdownOpen] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);

  // Обработка скролла для изменения стиля навбара
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Случайные глюки в навбаре для эффекта
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 200);
      }
    }, 7000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(glitchInterval);
    };
  }, []);

  // Закрытие всех дропдаунов
  const closeAllDropdowns = () => {
    setEventsDropdownOpen(false);
    setPaymentsDropdownOpen(false);
    setTokenDropdownOpen(false);
  };

  // Переключение мобильного меню
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
    closeAllDropdowns();
  };

  // Классы для навбара
  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled 
      ? 'bg-[#220833] bg-opacity-90 backdrop-blur-md shadow-lg shadow-[#5cff3233]' 
      : 'bg-transparent'
  } ${glitchEffect ? 'animate-navbar-glitch' : ''}`;

  // Классы для логотипа
  const logoClasses = `text-xl md:text-2xl font-bold transition-all duration-300 ${
    scrolled ? 'text-[#5cff32]' : 'text-white'
  } hover:text-[#ff36ab] logo-shadow`;

  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Логотип */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className={logoClasses}>
              <span className="relative">
                <span className="portal-glow">РПИ БАНК</span>
                {glitchEffect && (
                  <span className="absolute top-0 left-0 text-[#ff36ab] opacity-70 transform translate-x-1">
                    РПИ БАНК
                  </span>
                )}
              </span>
            </Link>
          </div>
          
          {/* Десктопное меню */}
          <div className="hidden md:flex items-center space-x-6">
            {/* События */}
            <div className="relative">
              <button
                className="text-white hover:text-[#5cff32] transition-colors flex items-center"
                onClick={() => {
                  closeAllDropdowns();
                  setEventsDropdownOpen(!eventsDropdownOpen);
                }}
              >
                <span>События</span>
                <FaChevronDown className="ml-1 h-3 w-3" />
              </button>
              
              {/* Дропдаун События */}
              {eventsDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[#220833] border border-[#5cff32] overflow-hidden z-50 dropdown-animation">
                  <div className="py-1">
                    <Link href="/events/portal-openings" className="block px-4 py-2 text-sm text-white hover:bg-[#361052] transition-colors">
                      Открытие порталов
                    </Link>
                    <Link href="/events/council-meetings" className="block px-4 py-2 text-sm text-white hover:bg-[#361052] transition-colors">
                      Заседания Совета
                    </Link>
                    <Link href="/events/dimension-hopping" className="block px-4 py-2 text-sm text-white hover:bg-[#361052] transition-colors">
                      Путешествия через измерения
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Выплаты */}
            <div className="relative">
              <button
                className="text-white hover:text-[#5cff32] transition-colors flex items-center"
                onClick={() => {
                  closeAllDropdowns();
                  setPaymentsDropdownOpen(!paymentsDropdownOpen);
                }}
              >
                <span>Выплаты</span>
                <FaChevronDown className="ml-1 h-3 w-3" />
              </button>
              
              {/* Дропдаун Выплаты */}
              {paymentsDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[#220833] border border-[#5cff32] overflow-hidden z-50 dropdown-animation">
                  <div className="py-1">
                    <Link href="/payments/schedule" className="block px-4 py-2 text-sm text-white hover:bg-[#361052] transition-colors">
                      Расписание выплат
                    </Link>
                    <Link href="/payments/history" className="block px-4 py-2 text-sm text-white hover:bg-[#361052] transition-colors">
                      История выплат
                    </Link>
                    <Link href="/payments/calculator" className="block px-4 py-2 text-sm text-white hover:bg-[#361052] transition-colors">
                      Калькулятор прибыли
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Цена токена */}
            <div className="relative">
              <button
                className="text-white hover:text-[#5cff32] transition-colors flex items-center"
                onClick={() => {
                  closeAllDropdowns();
                  setTokenDropdownOpen(!tokenDropdownOpen);
                }}
              >
                <span>Цена</span>
                <FaChevronDown className="ml-1 h-3 w-3" />
              </button>
              
              {/* Дропдаун Цена */}
              {tokenDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[#220833] border border-[#5cff32] overflow-hidden z-50 dropdown-animation">
                  <div className="py-1">
                    <Link href="/price/chart" className="block px-4 py-2 text-sm text-white hover:bg-[#361052] transition-colors">
                      График цены
                    </Link>
                    <Link href="/price/forecast" className="block px-4 py-2 text-sm text-white hover:bg-[#361052] transition-colors">
                      Прогноз Рика
                    </Link>
                    <Link href="/price/market-cap" className="block px-4 py-2 text-sm text-white hover:bg-[#361052] transition-colors">
                      Капитализация
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <Link href="/exchange" className="text-white hover:text-[#5cff32] transition-colors">
              Торговля
            </Link>
            
            <Link href="/about" className="text-white hover:text-[#5cff32] transition-colors">
              О Нас
            </Link>
            
            <Link href="/faq" className="text-white hover:text-[#5cff32] transition-colors">
              FAQ
            </Link>
            
            {/* Кнопка Telegram */}
            <Link 
              href="https://t.me/rpi_bank" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#36c5f4] hover:bg-[#2ba8d8] text-black transition-all rounded-md font-medium flex items-center telegram-btn"
            >
              <FaTelegram className="mr-2" />
              <span>Telegram</span>
            </Link>
          </div>
          
          {/* Мобильная кнопка меню */}
          <div className="md:hidden flex items-center">
            <button 
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#5cff32] focus:outline-none"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Мобильное меню */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#220833] bg-opacity-95 border-t border-[#5cff32] mobile-menu-animation">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              className="w-full text-left block px-3 py-2 rounded-md text-white hover:bg-[#361052] transition-colors"
              onClick={() => setEventsDropdownOpen(!eventsDropdownOpen)}
            >
              <div className="flex justify-between items-center">
                <span>События</span>
                <FaChevronDown className={`ml-1 h-3 w-3 transform transition-transform ${eventsDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>
            
            {eventsDropdownOpen && (
              <div className="pl-4 border-l-2 border-[#5cff32] ml-3 space-y-1">
                <Link 
                  href="/events/portal-openings" 
                  className="block px-3 py-2 text-sm text-white hover:bg-[#361052] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Открытие порталов
                </Link>
                <Link 
                  href="/events/council-meetings" 
                  className="block px-3 py-2 text-sm text-white hover:bg-[#361052] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Заседания Совета
                </Link>
                <Link 
                  href="/events/dimension-hopping" 
                  className="block px-3 py-2 text-sm text-white hover:bg-[#361052] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Путешествия через измерения
                </Link>
              </div>
            )}
            
            <button
              className="w-full text-left block px-3 py-2 rounded-md text-white hover:bg-[#361052] transition-colors"
              onClick={() => setPaymentsDropdownOpen(!paymentsDropdownOpen)}
            >
              <div className="flex justify-between items-center">
                <span>Выплаты</span>
                <FaChevronDown className={`ml-1 h-3 w-3 transform transition-transform ${paymentsDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>
            
            {paymentsDropdownOpen && (
              <div className="pl-4 border-l-2 border-[#5cff32] ml-3 space-y-1">
                <Link 
                  href="/payments/schedule" 
                  className="block px-3 py-2 text-sm text-white hover:bg-[#361052] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Расписание выплат
                </Link>
                <Link 
                  href="/payments/history" 
                  className="block px-3 py-2 text-sm text-white hover:bg-[#361052] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  История выплат
                </Link>
                <Link 
                  href="/payments/calculator" 
                  className="block px-3 py-2 text-sm text-white hover:bg-[#361052] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Калькулятор прибыли
                </Link>
              </div>
            )}
            
            <button
              className="w-full text-left block px-3 py-2 rounded-md text-white hover:bg-[#361052] transition-colors"
              onClick={() => setTokenDropdownOpen(!tokenDropdownOpen)}
            >
              <div className="flex justify-between items-center">
                <span>Цена</span>
                <FaChevronDown className={`ml-1 h-3 w-3 transform transition-transform ${tokenDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>
            
            {tokenDropdownOpen && (
              <div className="pl-4 border-l-2 border-[#5cff32] ml-3 space-y-1">
                <Link 
                  href="/price/chart" 
                  className="block px-3 py-2 text-sm text-white hover:bg-[#361052] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  График цены
                </Link>
                <Link 
                  href="/price/forecast" 
                  className="block px-3 py-2 text-sm text-white hover:bg-[#361052] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Прогноз Рика
                </Link>
                <Link 
                  href="/price/market-cap" 
                  className="block px-3 py-2 text-sm text-white hover:bg-[#361052] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Капитализация
                </Link>
              </div>
            )}
            
            <Link 
              href="/exchange" 
              className="block px-3 py-2 rounded-md text-white hover:bg-[#361052] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Торговля
            </Link>
            
            <Link 
              href="/about" 
              className="block px-3 py-2 rounded-md text-white hover:bg-[#361052] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              О Нас
            </Link>
            
            <Link 
              href="/faq" 
              className="block px-3 py-2 rounded-md text-white hover:bg-[#361052] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            
            <Link 
              href="https://t.me/rpi_bank" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block px-3 py-2 rounded-md text-white bg-[#36c5f4] hover:bg-[#2ba8d8] transition-colors mt-4 text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaTelegram className="inline-block mr-2" />
              <span>Telegram</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 