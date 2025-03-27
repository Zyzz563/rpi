'use client';

import { useState, useEffect, useRef } from 'react';

// Тип для новостей
interface CableNews {
  id: number;
  dimension: string;
  headline: string;
  content: string;
  importance: 'normal' | 'breaking' | 'council';
}

// Случайные новости из разных измерений
const interdimensionalNews: CableNews[] = [
  {
    id: 1,
    dimension: 'C-137',
    headline: 'Цены на Flurbos выросли на 15% после заявления Совета Риков',
    content: 'После вчерашнего заседания Совета Риков было принято решение о регулировании добычи Flurbos в измерении C-137. Это привело к мгновенному росту на межгалактических рынках.',
    importance: 'breaking'
  },
  {
    id: 2,
    dimension: 'Dimension 35-C',
    headline: 'Плюмбусы стали самым популярным товаром в галактике',
    content: 'Спрос на Плюмбусы достиг рекордного уровня. Производители не справляются с объемами заказов, несмотря на простоту изготовления этого популярного домашнего предмета.',
    importance: 'normal'
  },
  {
    id: 3,
    dimension: 'Cronenberg World',
    headline: 'Кроненберги инвестируют в РПИ БАНК',
    content: 'Представители измерения Кроненбергов объявили о масштабных инвестициях в РПИ БАНК. Это первый случай межпространственного финансирования такого масштаба.',
    importance: 'council'
  },
  {
    id: 4,
    dimension: 'Citadel of Ricks',
    headline: 'Курс Schmeckles к Галактическим кредитам стабилизировался',
    content: 'После нескольких недель волатильности курс Schmeckles наконец стабилизировался. Аналитики связывают это с новой монетарной политикой Совета Риков.',
    importance: 'normal'
  },
  {
    id: 5,
    dimension: 'Gear World',
    headline: 'Шестеренки открывают счета в РПИ БАНК',
    content: 'Жители измерения Шестеренок начали массово открывать счета в РПИ БАНК после внедрения специального интерфейса для механических существ.',
    importance: 'normal'
  },
  {
    id: 6,
    dimension: 'Purge Planet',
    headline: 'ВНИМАНИЕ: Повышенная активность на рынке в период Очищения',
    content: 'На планете Очищения наблюдается резкий рост торговой активности перед ежегодным фестивалем. РПИ БАНК рекомендует соблюдать осторожность при торговле.',
    importance: 'breaking'
  },
  {
    id: 7,
    dimension: 'J-19-Zeta-7',
    headline: 'Криповый Рик запустил новую криптовалюту',
    content: 'Криповый Рик из измерения J-19-Zeta-7 представил новую криптовалюту "KripCoin". Рыночная капитализация достигла миллиона Flurbos за первые сутки.',
    importance: 'normal'
  },
  {
    id: 8,
    dimension: 'Council of Ricks',
    headline: 'СРОЧНО: Совет Риков вводит новые правила торговли межпространственными активами',
    content: 'Совет Риков утвердил новую регуляторную базу для торговли между измерениями. РПИ БАНК уже обновил свои системы в соответствии с новыми требованиями.',
    importance: 'council'
  },
  {
    id: 9,
    dimension: 'D-99',
    headline: 'Нехватка портальной жидкости может повлиять на скорость транзакций',
    content: 'Временный дефицит портальной жидкости в измерении D-99 может привести к задержкам в обработке транзакций. Технические специалисты РПИ БАНК работают над решением.',
    importance: 'normal'
  },
];

// Компонент бегущей строки для новостей
const NewsTicker = ({ news }: { news: CableNews[] }) => {
  const tickerRef = useRef<HTMLDivElement>(null);
  
  // Анимация бегущей строки
  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;
    
    const animateTicker = () => {
      if (ticker.scrollLeft >= ticker.scrollWidth / 2) {
        ticker.scrollLeft = 0;
      } else {
        ticker.scrollLeft += 1;
      }
    };
    
    const interval = setInterval(animateTicker, 30);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="bg-[#220833] rounded-lg p-2 overflow-hidden rickified-panel mb-4">
      <div 
        ref={tickerRef}
        className="whitespace-nowrap overflow-hidden"
        style={{ width: '100%' }}
      >
        <div className="inline-block">
          {news.map((item, index) => (
            <span 
              key={item.id} 
              className={`mr-6 ${
                item.importance === 'breaking' ? 'text-portal-pink font-bold' : 
                item.importance === 'council' ? 'text-portal-green font-bold' : 
                'text-white'
              }`}
            >
              {item.importance === 'breaking' ? '🔴 СРОЧНО: ' : 
               item.importance === 'council' ? '🟢 СОВЕТ РИКОВ: ' : 
               '📡 '}
              {item.headline} ({item.dimension})
              {index === news.length - 1 ? ' | ' : ' | '}
            </span>
          ))}
        </div>
        <div className="inline-block">
          {news.map((item, index) => (
            <span 
              key={`repeat-${item.id}`} 
              className={`mr-6 ${
                item.importance === 'breaking' ? 'text-portal-pink font-bold' : 
                item.importance === 'council' ? 'text-portal-green font-bold' : 
                'text-white'
              }`}
            >
              {item.importance === 'breaking' ? '🔴 СРОЧНО: ' : 
               item.importance === 'council' ? '🟢 СОВЕТ РИКОВ: ' : 
               '📡 '}
              {item.headline} ({item.dimension})
              {index === news.length - 1 ? ' | ' : ' | '}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Основной компонент межпространственного канала
export default function InterdimensionalCable() {
  const [featuredNews, setFeaturedNews] = useState<CableNews | null>(null);
  const [glitchActive, setGlitchActive] = useState(false);
  
  // Случайный выбор главной новости
  useEffect(() => {
    const randomNews = interdimensionalNews[Math.floor(Math.random() * interdimensionalNews.length)];
    setFeaturedNews(randomNews);
    
    // Периодические изменения главной новости
    const interval = setInterval(() => {
      // Сначала активируем эффект глюка
      setGlitchActive(true);
      
      // Через 500мс меняем новость и убираем глюч
      setTimeout(() => {
        const newRandomNews = interdimensionalNews[Math.floor(Math.random() * interdimensionalNews.length)];
        setFeaturedNews(newRandomNews);
        setGlitchActive(false);
      }, 500);
    }, 15000);
    
    // Также иногда добавляем случайный глюч
    const glitchInterval = setInterval(() => {
      // 20% шанс случайного глюча
      if (Math.random() < 0.2) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 300);
      }
    }, 5000);
    
    return () => {
      clearInterval(interval);
      clearInterval(glitchInterval);
    };
  }, []);
  
  if (!featuredNews) return null;
  
  return (
    <div className="my-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-mono font-bold text-[#5cff32] portal-glow">Межпространственный кабельный канал</h2>
        <div className="px-3 py-1 bg-[#220833] rounded-full text-xs">
          <span className="text-portal-pink">LIVE</span>
          <span className="ml-1 h-2 w-2 bg-portal-pink rounded-full inline-block animate-pulse"></span>
        </div>
      </div>
      
      <NewsTicker news={interdimensionalNews} />
      
      <div className={`bg-[#220833] rounded-lg overflow-hidden rickified-panel relative ${glitchActive ? 'text-glitch' : ''}`}>
        {glitchActive && (
          <div className="absolute inset-0 bg-[#5cff32] opacity-5 z-10"></div>
        )}
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className={`text-lg font-bold ${
                featuredNews.importance === 'breaking' ? 'text-portal-pink' : 
                featuredNews.importance === 'council' ? 'text-portal-green' : 'text-white'
              }`}>
                {featuredNews.headline}
              </h3>
              <p className="text-xs text-gray-400">Измерение: {featuredNews.dimension}</p>
            </div>
            
            {/* Индикатор важности */}
            {featuredNews.importance !== 'normal' && (
              <div className={`px-2 py-1 text-xs rounded ${
                featuredNews.importance === 'breaking' ? 'bg-portal-pink bg-opacity-20 text-portal-pink' : 
                'bg-portal-green bg-opacity-20 text-portal-green'
              }`}>
                {featuredNews.importance === 'breaking' ? 'СРОЧНО' : 'СОВЕТ РИКОВ'}
              </div>
            )}
          </div>
          
          <p className="mt-2">{featuredNews.content}</p>
        </div>
        
        {/* Реклама Плюмбуса */}
        {Math.random() > 0.6 && (
          <div className="mt-4 p-4 bg-[#361052] border-t border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400">РЕКЛАМА</span>
                <h3 className="text-portal-pink font-bold">Все еще нет Плюмбуса?</h3>
                <p className="text-sm text-gray-300">Каждый дом нуждается в Плюмбусе! Обменяйте ваши Flurbos на Plumbus прямо сейчас!</p>
              </div>
              <button className="px-3 py-2 bg-portal-pink text-black rounded-lg text-sm font-bold">Купить PLB</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 