'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBrain, FaRocket, FaSkull, FaMoneyBillWave, FaBomb, FaFlask, FaUserSecret, FaArrowRight, FaLock, FaBolt, FaDollarSign, FaUsers, FaCoins, FaTelegram } from 'react-icons/fa';
import InterdimensionalCable from '../components/InterdimensionalCable';
import PickleRick from '../components/PickleRick';
import PortalCursor from '../components/PortalCursor';
import RickTransactions from '@/components/RickTransactions';
import MeeseeksBox from '@/components/MeeseeksBox';
import GlitchAnimation from '@/components/GlitchAnimation';
import CollectFlurbos from '@/components/CollectFlurbos';
import CatchMorty from '@/components/CatchMorty';

export default function HomePage() {
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [randomQuote, setRandomQuote] = useState('');
  const [showPickleRick, setShowPickleRick] = useState(false);
  const [secretCounter, setSecretCounter] = useState(0);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [showEvilMessage, setShowEvilMessage] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Увеличиваем безумие: случайные глючи интерфейса
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.15) {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 200 + Math.random() * 300);
      }
    }, 5000);
    
    return () => clearInterval(glitchInterval);
  }, []);
  
  // Счетчик для пасхалки с Pickle Rick
  const incrementSecretCounter = () => {
    setSecretCounter(prev => {
      const newCount = prev + 1;
      // Если нажали 5 раз, показываем Pickle Rick
      if (newCount === 5) {
        setShowPickleRick(true);
        // Сбрасываем счетчик через 10 секунд
        setTimeout(() => {
          setShowPickleRick(false);
          setSecretCounter(0);
        }, 10000);
      }
      return newCount;
    });
  };

  // Злодейские цитаты Рика о финансах
  const rickEvilFinanceQuotes = [
    "Твоя экономика работает на рабском труде с дополнительными шагами, Морти!",
    "Деньги – это социальный конструкт, Морти! Я изобрел 50 валют до завтрака!",
    "Богатство – это всего лишь то, что придумали люди, чтобы купить себе дерьмо, которое им не нужно.",
    "Знаешь, что пострашнее неизвестной планеты? Кредитный рейтинг, Морти!",
    "Я не злой, Морти. Я финансово предприимчивый!",
    "Инфляция опаснее любого инопланетного паразита, Морти. И вдвойне заразнее!",
    "Запомни, Морти: когда все говорят 'HODL', умные украдут кошельки!",
    "Банки – это всего лишь культы, где жрецы в костюмах прячут твои деньги в другом измерении.",
    "Я взломал вселенскую экономику, Морти! Теперь мы будем питаться страданиями финансовых аналитиков!"
  ];

  // Случайная цитата при загрузке страницы
  useEffect(() => {
    setRandomQuote(rickEvilFinanceQuotes[Math.floor(Math.random() * rickEvilFinanceQuotes.length)]);
  }, []);

  // Анимация портала при наведении на кнопки
  const handlePortalOpen = () => setIsPortalOpen(true);
  const handlePortalClose = () => setIsPortalOpen(false);
  
  // Показ злобного финансового послания
  const toggleEvilMessage = () => {
    setShowEvilMessage(prev => !prev);
    if (videoRef.current) {
      if (!showEvilMessage) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  // Секция со статистикой
  const statsSection = (
    <section className="rickified-panel p-8 my-8 rounded-lg">
      <h2 className="text-3xl font-bold mb-6 portal-glow text-center">Финансовые Показатели Мультивселенной</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg bg-[rgba(60,0,60,0.3)] border border-[#ff36ab] backdropBlur flex flex-col items-center">
          <FaDollarSign className="text-4xl mb-4 portal-glow" />
          <span className="text-3xl font-bold portal-glow">{showEvilMessage ? "∞" : "$4.2B"}</span>
          <span className="text-lg mt-2">Общий Объем</span>
        </div>
        <div className="p-6 rounded-lg bg-[rgba(60,0,60,0.3)] border border-[#5cff32] backdropBlur flex flex-col items-center">
          <FaUsers className="text-4xl mb-4 portal-glow" />
          <span className="text-3xl font-bold portal-glow">{showEvilMessage ? "9000+" : "13,427"}</span>
          <span className="text-lg mt-2">Активных Торговцев</span>
        </div>
        <div className="p-6 rounded-lg bg-[rgba(60,0,60,0.3)] border border-[#36c5f4] backdropBlur flex flex-col items-center">
          <FaCoins className="text-4xl mb-4 portal-glow" />
          <span className="text-3xl font-bold portal-glow">{showEvilMessage ? "69" : "42"}</span>
          <span className="text-lg mt-2">Токенов Поддерживается</span>
        </div>
      </div>
    </section>
  );

  // Добавляем секцию межпространственных транзакций
  const transactionsSection = (
    <section className="my-12 relative">
      <div className="absolute inset-0 bg-[#220833] opacity-40 rounded-lg blur-md"></div>
      <div className="relative z-10 p-4">
        <div className="flex items-center justify-center mb-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#5cff32] mr-4"></div>
          <h2 className="text-3xl font-bold portal-glow text-center text-[#5cff32]">
            <span className="relative px-4 py-1">
              <span className="absolute inset-0 bg-[#220833] rounded-lg -z-10"></span>
              Межпространственная Активность
            </span>
          </h2>
          <div className="h-px w-16 bg-gradient-to-r from-[#5cff32] to-transparent ml-4"></div>
        </div>
        <p className="text-center mb-6 text-white font-medium px-4 py-1 bg-[#220833] bg-opacity-70 rounded-lg inline-block mx-auto">
          Отслеживайте межпространственные переводы в режиме реального времени
        </p>
        <RickTransactions 
          maxTransactions={8}
          autoRefresh={true}
          refreshInterval={showEvilMessage ? 2000 : 4000} 
          height={450}
          onSelectTransaction={(tx) => {
            if (tx.isShady && Math.random() > 0.7) {
              setShowPickleRick(true);
              setTimeout(() => setShowPickleRick(false), 4000);
            }
          }}
        />
        <div className="text-center mt-4 text-xs bg-[#220833] py-2 px-4 rounded-lg bg-opacity-80 inline-block mx-auto">
          <p className="text-[#ff36ab]">* Транзакции с пометкой <span className="text-[#ff36ab] font-bold">⚠</span> могут нарушать межпространственные законы</p>
          <p className="text-[#5cff32]">* РПИ БАНК не несет ответственности за сбои в пространственно-временном континууме</p>
        </div>
      </div>
    </section>
  );

  return (
    <div className={`min-h-screen bg-[#1d111f] text-white portal-background ${glitchEffect ? 'animate-portal-glitch' : ''} crt-effect`}>
      {/* Статичный фон */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#1d111f] z-0"></div>
      </div>

      {/* Активируем кастомный курсор */}
      <PortalCursor enabled={true} />

      {/* Новая шапка с якорными ссылками */}
      <div className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="relative z-10 text-center px-4 py-12">
          {/* Логотип банка стилизованный под злого Рика */}
          <div className="mb-6 relative inline-block">
            <h1 
              className="text-6xl md:text-8xl font-mono font-bold mb-6 cursor-pointer relative" 
              onClick={incrementSecretCounter}
            >
              <GlitchAnimation 
                text="РПИ БАНК" 
                color="#5cff32"
                highlightColor="#5cff32"
                glitchIntensity="medium"
                fontSize="inherit"
                fontWeight="inherit"
                className="portal-glow"
              />
            </h1>
            {/* Подзаголовок со злодейской темой */}
            <div className="text-xl md:text-2xl text-[#ff36ab] mb-2 font-mono">
              <GlitchAnimation 
                text="ФИНАНСОВОЕ ЗЛО ИЗ ИЗМЕРЕНИЯ C-137" 
                color="#ff36ab"
                glitchIntensity="low"
                fontSize="inherit"
                fontWeight="inherit"
                randomizeInterval={8000}
              />
            </div>
          </div>
          
          {/* Анимированная РПИ монета как центральный элемент */}
          <div className="my-12 relative">
            <div className="coin-container mx-auto">
              <div className="coin">
                <div className="coin-face coin-front"></div>
                <div className="coin-face coin-back"></div>
                <div className="coin-edge"></div>
              </div>
              <div className="coin-shadow"></div>
              
              {/* Дополнительные элементы вокруг монеты */}
              <div className="coin-glow"></div>
              <div className="coin-particles">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="coin-particle"
                    style={{
                      '--delay': `${Math.random() * 5}s`,
                      '--size': `${4 + Math.random() * 8}px`,
                      '--distance': `${30 + Math.random() * 70}px`,
                      '--angle': `${Math.random() * 360}deg`,
                    } as React.CSSProperties}
                  ></div>
                ))}
              </div>
            </div>
            
            {/* Дополнительная информация рядом с монетой */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 max-w-4xl mx-auto">
              <div className="bg-[rgba(34,8,51,0.6)] border border-[#5cff32] p-4 rounded-lg backdrop-blur-sm rickified-panel">
                <div className="font-mono text-[#5cff32] text-xl mb-2">Токен РПИ</div>
                <div className="text-2xl font-bold">$6.66</div>
                <div className="text-[#ff36ab] text-sm">+13.37% за 24ч</div>
              </div>
              
              <div className="bg-[rgba(34,8,51,0.6)] border border-[#5cff32] p-4 rounded-lg backdrop-blur-sm rickified-panel">
                <div className="font-mono text-[#5cff32] text-xl mb-2">Рыночная Кап.</div>
                <div className="text-2xl font-bold">$616M</div>
                <div className="text-sm">Рейтинг #42</div>
              </div>
              
              <div className="bg-[rgba(34,8,51,0.6)] border border-[#5cff32] p-4 rounded-lg backdrop-blur-sm rickified-panel">
                <div className="font-mono text-[#5cff32] text-xl mb-2">Выпущено</div>
                <div className="text-2xl font-bold">137M РПИ</div>
                <div className="text-sm">Из 616M макс.</div>
              </div>
            </div>
          </div>
          
          {/* Злобная цитата Рика */}
          <div 
            className="max-w-2xl mx-auto mb-8 p-4 bg-[#220833] rounded-lg rickified-panel cursor-pointer scan-lines"
            onClick={toggleEvilMessage}
          >
            <p className="text-xl italic text-[#ff36ab]">
              "{randomQuote}"
            </p>
            <p className="mt-2 text-sm text-white">- Рик Санчез, Финансовый Диктатор</p>
          </div>
          
          {/* Злодейское послание при клике */}
          {showEvilMessage && (
            <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
              <div className="max-w-4xl bg-[#220833] rounded-xl rickified-panel p-6 relative scan-lines">
                <button 
                  onClick={toggleEvilMessage}
                  className="absolute top-2 right-2 text-[#ff36ab] text-2xl"
                >
                  ✕
                </button>
                <h3 className="text-2xl md:text-3xl font-mono font-bold mb-4 text-[#5cff32]">
                  ПЛАН ФИНАНСОВОГО ПОРАБОЩЕНИЯ ВСЕЛЕННОЙ
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-4 relative">
                    <div className="absolute inset-0 bg-portal-grid opacity-10 pointer-events-none"></div>
                    <p className="text-[#ff36ab] relative z-10">
                      Привет, тупицы! Полагаю, вы достаточно глупы, чтобы поверить в обычный банк. 
                      Ха! Вы попались в мою гениальную ловушку!
                    </p>
                    <p className="text-white relative z-10">
                      Каждый раз, когда вы открываете счет в моем банке, я собираю вашу межпространственную
                      финансовую подпись. С каждой транзакцией я становлюсь сильнее!
                    </p>
                    <p className="text-[#ff36ab] italic relative z-10 screen-glitch">
                      "Финансы – это всего лишь еще один способ контроля над тупыми существами. 
                      Моя система просто более честна насчет этого."
                    </p>
                    <p className="text-white relative z-10">
                      К тому моменту, как вы поймете, что произошло, я уже буду контролировать экономику 
                      всех известных измерений. Все валюты будут привязаны к Flurbos. 
                      <span className="text-[#5cff32]">Все дороги ведут к РПИ БАНК!</span>
                    </p>
                  </div>
                  
                  <div className="rounded-lg overflow-hidden bg-black bg-opacity-50 h-64 md:h-auto rickified-panel">
                    <video 
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      autoPlay 
                      muted 
                      loop
                    >
                      <source src="/evil_laugh.mp4" type="video/mp4" />
                      Ваш браузер не поддерживает видео
                    </video>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={toggleEvilMessage}
                    className="px-6 py-2 bg-[#ff36ab] text-black font-bold rounded-lg hover:bg-opacity-80 transition-all portal-pulse-btn"
                  >
                    Я все равно хочу участвовать
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link 
              href="/exchange"
              className="neon-btn-green relative group overflow-hidden"
              onMouseEnter={handlePortalOpen}
              onMouseLeave={handlePortalClose}
            >
              <span className="neon-btn-text">Начать Торговлю</span>
              <span className="neon-btn-glitch"></span>
              <span className="neon-btn-blink"></span>
            </Link>
            
            <Link 
              href="/wallet"
              className="neon-btn-pink relative group overflow-hidden"
              onMouseEnter={handlePortalOpen}
              onMouseLeave={handlePortalClose}
            >
              <span className="neon-btn-text">Подключить Кошелёк</span>
              <span className="neon-btn-glitch"></span>
              <span className="neon-btn-blink"></span>
            </Link>
          </div>
        </div>
      </div>

      {/* Межпространственный кабельный канал */}
      <div className="max-w-6xl mx-auto px-4 py-12 scan-lines">
        <InterdimensionalCable />
      </div>

      {/* Компонент Meeseeks Box */}
      <div className="my-12 flex justify-center">
        <MeeseeksBox />
      </div>

      {/* Особенности */}
      <section className="my-16">
        <h2 className="text-3xl font-bold mb-10 portal-glow text-center relative z-10 text-[#5cff32]">
          <span className="relative">
            <span className="absolute -inset-1 blur-md bg-[#220833] -z-10 rounded-lg"></span>
            В Чем Наше Превосходство
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-lg rickified-panel">
            <div className="flex items-center mb-4">
              <div className="mr-4 p-3 rounded-full bg-[#361052]">
                <FaLock className="text-2xl portal-glow" />
              </div>
              <h3 className="text-xl font-bold">Безопасный Кошелек</h3>
            </div>
            <p>Защищен технологией Рика из измерения C-137, непробиваемой даже для Совета Риков</p>
          </div>
          
          <div className="p-6 rounded-lg rickified-panel">
            <div className="flex items-center mb-4">
              <div className="mr-4 p-3 rounded-full bg-[#361052]">
                <FaBolt className="text-2xl portal-glow" />
              </div>
              <h3 className="text-xl font-bold">Быстрая Торговля</h3>
            </div>
            <p>Скорость обработки транзакций увеличена с помощью концентрированной темной материи</p>
          </div>
          
          <div className="p-6 rounded-lg rickified-panel">
            <div className="flex items-center mb-4">
              <div className="mr-4 p-3 rounded-full bg-[#361052]">
                <FaFlask className="text-2xl portal-glow" />
              </div>
              <h3 className="text-xl font-bold">Графики Реального Времени</h3>
            </div>
            <p>Данные поступают из будущего благодаря технологии временных микроволн (не спрашивайте, как это работает)</p>
          </div>
          
          <div className="p-6 rounded-lg rickified-panel">
            <div className="flex items-center mb-4">
              <div className="mr-4 p-3 rounded-full bg-[#361052]">
                <FaBrain className="text-2xl portal-glow" />
              </div>
              <h3 className="text-xl font-bold">Сообщество в Приоритете</h3>
            </div>
            <p>Команда из лучших версий Рика из разных измерений объединилась для создания лучшего опыта</p>
          </div>
        </div>
      </section>
      
      {/* Секция мини-игр */}
      <section className="my-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 portal-glow text-center relative z-10">
          <GlitchAnimation 
            text="ИГРАЙ И ЗАРАБАТЫВАЙ" 
            color="#5cff32"
            glitchIntensity="medium"
            fontSize="inherit"
            fontWeight="inherit"
          />
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#220833] p-6 rounded-lg rickified-panel">
            <h3 className="text-xl font-bold mb-4 text-[#ff36ab]">Поймай Морти</h3>
            <p className="text-sm mb-4 text-gray-300">
              Докажи, что ты быстрее Морти! За каждую поимку получаешь 5 Flurbos.
            </p>
            <CatchMorty 
              onScoreChange={(score) => {
                setGameScore(prev => prev + score * 5);
                if (score > 10) {
                  setShowPickleRick(true);
                  setTimeout(() => setShowPickleRick(false), 3000);
                }
              }}
              duration={20}
              difficulty="medium"
            />
          </div>
          
          <div className="bg-[#220833] p-6 rounded-lg rickified-panel">
            <h3 className="text-xl font-bold mb-4 text-[#36c5f4]">Собери Flurbos</h3>
            <p className="text-sm mb-4 text-gray-300">
              Я превратил себя в соленый огурец, Морти! Собирай меня и зарабатывай Flurbos.
            </p>
            <CollectFlurbos 
              onScoreChange={(score) => {
                setGameScore(prev => prev + score);
                if (score > 20) {
                  setRandomQuote(rickEvilFinanceQuotes[Math.floor(Math.random() * rickEvilFinanceQuotes.length)]);
                }
              }}
              duration={25}
              difficulty="medium"
            />
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <div className="inline-block bg-[rgba(60,0,60,0.3)] border border-[#5cff32] p-4 rounded-lg">
            <span className="text-lg">Ваш игровой счет: </span>
            <span className="text-2xl font-bold text-[#5cff32]">{gameScore}</span>
            <span className="text-lg"> Flurbos</span>
          </div>
          <p className="mt-2 text-xs text-gray-400">* Flurbos не имеют реальной ценности и могут исчезнуть в любое время.</p>
        </div>
      </section>

      {/* Статистика */}
      {statsSection}
      
      {/* Межпространственные транзакции */}
      {transactionsSection}

      {/* Призыв к действию - усовершенствованный */}
      <section className="my-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#220833] rounded-xl mx-6 md:mx-20 opacity-70 blur-md"></div>
        
        {/* Анимированный неоновый контур */}
        <div className="absolute inset-0 mx-6 md:mx-20 rounded-xl opacity-30 cta-border"></div>
        
        {/* Фоновая сетка */}
        <div className="absolute inset-0 mx-6 md:mx-20 rounded-xl opacity-10 bg-portal-grid"></div>
        
        {/* Световые эффекты */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-80 h-40 bg-[#5cff32] opacity-10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-1/4 w-60 h-30 bg-[#ff36ab] opacity-10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-60 h-30 bg-[#36c5f4] opacity-10 blur-3xl rounded-full"></div>
        
        <div className="relative z-10 py-16 px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <GlitchAnimation 
              text="ЗАХВАТИ МУЛЬТИВСЕЛЕННУЮ" 
              color="transparent"
              glitchIntensity="high"
              fontSize="inherit"
              fontWeight="inherit"
              className="bg-clip-text bg-gradient-to-r from-[#5cff32] via-[#36c5f4] to-[#ff36ab]"
            />
          </h2>
          
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-medium text-white">
            <span className="text-[#ff36ab] font-semibold">Финансовые наркоманы</span> уже <span className="text-[#5cff32]">зарабатывают миллионы</span> на межпространственных валютах. А ты?
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link 
              href="/exchange"
              className="mega-neon-btn relative group overflow-hidden"
              onMouseEnter={handlePortalOpen}
              onMouseLeave={handlePortalClose}
            >
              <span className="relative z-10 flex items-center">
                СТАТЬ БОГОМ ДЕНЕГ
                <FaArrowRight className="ml-2" />
              </span>
              <span className="mega-neon-glow"></span>
            </Link>
            
            <span className="text-[#36c5f4] font-mono md:text-lg">или</span>
            
            <Link 
              href="/FAQ"
              className="underline-link text-white text-lg hover:text-[#ff36ab] transition-colors relative group"
            >
              <span>почитать FAQ от Рика</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ff36ab] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-3 backdrop-blur-sm bg-[rgba(34,8,51,0.3)] rounded-lg">
              <span className="text-2xl md:text-3xl font-bold text-[#5cff32]">24/7</span>
              <span className="text-sm text-gray-300">работа портала</span>
            </div>
            <div className="flex flex-col items-center p-3 backdrop-blur-sm bg-[rgba(34,8,51,0.3)] rounded-lg">
              <span className="text-2xl md:text-3xl font-bold text-[#ff36ab]">∞</span>
              <span className="text-sm text-gray-300">измерений для обмена</span>
            </div>
            <div className="flex flex-col items-center p-3 backdrop-blur-sm bg-[rgba(34,8,51,0.3)] rounded-lg">
              <span className="text-2xl md:text-3xl font-bold text-[#36c5f4]">0%</span>
              <span className="text-sm text-gray-300">совести</span>
            </div>
            <div className="flex flex-col items-center p-3 backdrop-blur-sm bg-[rgba(34,8,51,0.3)] rounded-lg">
              <span className="text-2xl md:text-3xl font-bold text-[#c6ff00]">100%</span>
              <span className="text-sm text-gray-300">риска</span>
            </div>
          </div>
        </div>
      </section>

      {/* Видео с Риком, если включен режим зла */}
      {showEvilMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-90">
          <div className="max-w-2xl p-6 rickified-panel rounded-lg">
            <h2 className="text-3xl font-bold mb-4 text-[#ff36ab] portal-glow">Послание от Рика</h2>
            <div className="relative pb-[56.25%] h-0 overflow-hidden mb-4">
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                title="Rick's Financial Message"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="mb-4">Вся финансовая система мультивселенной теперь в моих руках! *отрыжка* Я построил величайшую межпространственную финансовую пирамиду, и вы все станете её частью!</p>
            <button 
              onClick={() => setShowEvilMessage(false)}
              className="p-2 bg-[#361052] hover:bg-[#4a1070] text-white rounded-lg"
            >
              Я с тобой, Рик
            </button>
          </div>
        </div>
      )}

      {/* Плавающие формулы и символы на фоне */}
      <div className="floating-formulas">
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i}
            className="formula"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${15 + Math.random() * 20}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.2,
            }}
          >
            {Math.random() > 0.5 ? '∞' : Math.random() > 0.5 ? '∑' : '∫'}
          </div>
        ))}
      </div>

      {/* Пасхалка Pickle Rick */}
      {showPickleRick && <PickleRick 
        trigger="auto" 
        duration={5000} 
        position="random"
        quotes={[
          "Я превратил себя в соленый огурец, Морти!",
          "Ваша финансовая статистика... *отрыжка* ...впечатляет",
          "Эта биржа работает на 20% концентрированной темной материи!",
          "Ваши инвестиции так же безопасны, как Морти в моих приключениях!",
        ]}
      />}
    </div>
  );
}
