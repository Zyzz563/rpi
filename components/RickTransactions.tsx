'use client';

import { useState, useEffect, useRef } from 'react';
import { FaSortAmountDownAlt, FaSyncAlt, FaFire, FaSkull, FaArrowUp, FaArrowDown, FaArrowRight } from 'react-icons/fa';

type Dimension = {
  id: string;
  name: string; 
  symbol: string;
  danger: number; // От 1 до 5
  color: string;
};

type Transaction = {
  id: string;
  fromDimension: string;
  toDimension: string;
  amount: number;
  token: string;
  timestamp: number;
  isShady: boolean;
  description: string;
};

// Данные о различных измерениях
const DIMENSIONS: Dimension[] = [
  { id: 'c137', name: 'Измерение C-137', symbol: '⚛️', danger: 5, color: '#5cff32' },
  { id: 'c500a', name: 'Измерение C-500A', symbol: '🌀', danger: 3, color: '#36c5f4' },
  { id: 'j1977', name: 'Измерение J-1977', symbol: '🔮', danger: 4, color: '#ff36ab' },
  { id: 'fb788', name: 'Измерение FB-788', symbol: '🧪', danger: 2, color: '#f7aa33' },
  { id: 'd716', name: 'Измерение D-716', symbol: '⚡', danger: 1, color: '#a04ff7' },
  { id: 'k222', name: 'Цитадель Риков', symbol: '🧠', danger: 5, color: '#00b8a3' },
  { id: 'n/a', name: 'Неизвестное измерение', symbol: '❓', danger: 5, color: '#ff5252' },
];

// Токены и валюты из разных измерений
const TOKENS = [
  'Flurbos', 'Schmeckles', 'BrappleCoin', 'GazorpaCoin', 'BlipsBitz', 'BooBux', 'Gweebos', 'FederationCR'
];

// Генератор транзакций
const generateTransaction = (): Transaction => {
  const dimensions = [...DIMENSIONS];
  const fromIndex = Math.floor(Math.random() * dimensions.length);
  const fromDimension = dimensions[fromIndex].id;
  dimensions.splice(fromIndex, 1);
  
  const toDimension = dimensions[Math.floor(Math.random() * dimensions.length)].id;
  
  const isShady = Math.random() > 0.7;
  
  // Добавляем подозрительные описания для теневых транзакций
  const shadyDescriptions = [
    "Оплата за оружие массового уничтожения",
    "Перевод с пометкой 'Совету Риков не знать'",
    "За контрабанду мегасемян",
    "Подкуп Галактической Федерации",
    "Продажа незаконных технологий",
    "Покупка запрещенных веществ",
    "Финансирование межпространственного переворота",
    "За услуги наемных убийц"
  ];
  
  // Обычные описания для легальных транзакций
  const normalDescriptions = [
    "Плата за межпространственные услуги",
    "Торговля ресурсами",
    "Инвестиции в стартап",
    "Погашение кредита",
    "Оплата консультации",
    "Межпространственный перевод",
    "Благотворительность",
    "Операции с деривативами"
  ];
  
  return {
    id: `tx-${Math.random().toString(36).substr(2, 9)}`,
    fromDimension,
    toDimension,
    amount: Math.floor(Math.random() * 10000) / 100,
    token: TOKENS[Math.floor(Math.random() * TOKENS.length)],
    timestamp: Date.now(),
    isShady,
    description: isShady 
      ? shadyDescriptions[Math.floor(Math.random() * shadyDescriptions.length)]
      : normalDescriptions[Math.floor(Math.random() * normalDescriptions.length)]
  };
};

type RickTransactionsProps = {
  maxTransactions?: number;
  autoRefresh?: boolean;
  refreshInterval?: number;
  height?: number;
  width?: string;
  showControls?: boolean;
  onSelectTransaction?: (transaction: Transaction) => void;
};

export default function RickTransactions({
  maxTransactions = 10,
  autoRefresh = true,
  refreshInterval = 3000,
  height = 400,
  width = '100%',
  showControls = true,
  onSelectTransaction
}: RickTransactionsProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [sortBy, setSortBy] = useState<'time' | 'amount'>('time');
  const [showShadyOnly, setShowShadyOnly] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const glitchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Инициализация аудио
  useEffect(() => {
    audioRef.current = new Audio('/portal_transaction.mp3');
    return () => {
      if (audioRef.current) audioRef.current = null;
    };
  }, []);

  // Начальная загрузка транзакций
  useEffect(() => {
    const initialTransactions = Array.from({ length: maxTransactions }, () => generateTransaction());
    setTransactions(initialTransactions);
    
    // Сортировка
    sortTransactions(initialTransactions, sortBy);
  }, [maxTransactions]);

  // Автоматическое обновление транзакций
  useEffect(() => {
    if (!autoRefresh || isPaused) return;
    
    const interval = setInterval(() => {
      addNewTransaction();
    }, refreshInterval);
    
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, transactions, sortBy, isPaused]);

  // Функция для сортировки транзакций
  const sortTransactions = (txs: Transaction[], by: 'time' | 'amount') => {
    if (by === 'time') {
      return [...txs].sort((a, b) => b.timestamp - a.timestamp);
    } else {
      return [...txs].sort((a, b) => b.amount - a.amount);
    }
  };

  // Функция для добавления новой транзакции
  const addNewTransaction = () => {
    setIsRefreshing(true);
    
    // Воспроизведение звука портала
    if (audioRef.current && Math.random() > 0.5) {
      audioRef.current.volume = 0.3;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Failed to play sound:", e));
    }
    
    // Добавляем новую транзакцию
    const newTransaction = generateTransaction();
    setTransactions(prev => {
      const newTxs = [newTransaction, ...prev.slice(0, maxTransactions - 1)];
      return sortTransactions(newTxs, sortBy);
    });
    
    // Глюк-эффект для контейнера
    if (containerRef.current) {
      containerRef.current.classList.add('glitch-effect');
      
      // Сбрасываем предыдущий таймер, если есть
      if (glitchTimerRef.current) {
        clearTimeout(glitchTimerRef.current);
      }
      
      // Устанавливаем новый таймер
      glitchTimerRef.current = setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.classList.remove('glitch-effect');
          setIsRefreshing(false);
        }
      }, 500);
    }
  };

  // Получение данных измерения по ID
  const getDimension = (id: string): Dimension => {
    return DIMENSIONS.find(d => d.id === id) || DIMENSIONS[DIMENSIONS.length - 1];
  };

  // Форматирование времени
  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  };

  // Обработчик изменения сортировки
  const handleSortChange = () => {
    const newSortBy = sortBy === 'time' ? 'amount' : 'time';
    setSortBy(newSortBy);
    setTransactions(sortTransactions(transactions, newSortBy));
  };

  // Переключение фильтра только теневых транзакций
  const toggleShadyFilter = () => {
    setShowShadyOnly(!showShadyOnly);
  };

  // Ручное обновление
  const handleRefresh = () => {
    if (isPaused || isRefreshing) return;
    addNewTransaction();
  };

  // Переключение паузы
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Фильтрация транзакций
  const filteredTransactions = showShadyOnly 
    ? transactions.filter(tx => tx.isShady)
    : transactions;

  return (
    <div 
      ref={containerRef}
      className="rickified-panel rounded-lg overflow-hidden"
      style={{ width, height: 'auto', maxHeight: height }}
    >
      {/* Заголовок и контролы */}
      <div className="p-4 bg-[#1d111f] border-b border-[#361052] flex justify-between items-center scan-lines">
        <h3 className="text-[#5cff32] font-mono font-bold portal-glow">МЕЖПРОСТРАНСТВЕННЫЕ ТРАНЗАКЦИИ</h3>
        
        {showControls && (
          <div className="flex space-x-2">
            <button
              onClick={toggleShadyFilter}
              className={`p-2 rounded ${showShadyOnly ? 'bg-[#ff36ab] text-white' : 'bg-[#220833] text-[#ff36ab]'} hover:bg-opacity-80 transition-colors`}
              title={showShadyOnly ? "Показать все транзакции" : "Показать только подозрительные"}
            >
              <FaSkull size={14} />
            </button>
            <button
              onClick={handleSortChange}
              className="p-2 rounded bg-[#220833] text-[#5cff32] hover:bg-opacity-80 transition-colors"
              title={sortBy === 'time' ? "Сортировать по сумме" : "Сортировать по времени"}
            >
              <FaSortAmountDownAlt size={14} />
            </button>
            <button
              onClick={togglePause}
              className={`p-2 rounded ${isPaused ? 'bg-[#ff36ab] text-white' : 'bg-[#220833] text-[#5cff32]'} hover:bg-opacity-80 transition-colors`}
              title={isPaused ? "Возобновить" : "Приостановить"}
            >
              {isPaused ? '▶' : '⏸'}
            </button>
            <button
              onClick={handleRefresh}
              className={`p-2 rounded bg-[#220833] text-[#5cff32] hover:bg-opacity-80 transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
              disabled={isPaused || isRefreshing}
              title="Обновить"
            >
              <FaSyncAlt size={14} />
            </button>
          </div>
        )}
      </div>
      
      {/* Список транзакций */}
      <div 
        className="overflow-y-auto"
        style={{ maxHeight: height - 56 }}
      >
        {filteredTransactions.length === 0 ? (
          <div className="p-6 text-center text-gray-400">
            <p>Нет транзакций для отображения</p>
          </div>
        ) : (
          <div className="divide-y divide-[#361052]">
            {filteredTransactions.map((tx) => {
              const fromDim = getDimension(tx.fromDimension);
              const toDim = getDimension(tx.toDimension);
              
              return (
                <div 
                  key={tx.id}
                  className={`p-4 hover:bg-[#220833] transition-colors flex items-center cursor-pointer ${tx.isShady ? 'bg-[#2d0a1f] bg-opacity-40' : ''}`}
                  onClick={() => onSelectTransaction && onSelectTransaction(tx)}
                >
                  {/* Информация об измерениях */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span 
                        className="text-xl" 
                        style={{ color: fromDim.color }}
                        title={fromDim.name}
                      >
                        {fromDim.symbol}
                      </span>
                      <FaArrowRight className="text-gray-400" />
                      <span 
                        className="text-xl" 
                        style={{ color: toDim.color }}
                        title={toDim.name}
                      >
                        {toDim.symbol}
                      </span>
                      
                      {tx.isShady && (
                        <span className="ml-2 text-[#ff36ab]" title="Подозрительная транзакция">
                          <FaSkull size={12} />
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mt-1 truncate max-w-xs">{tx.description}</p>
                  </div>
                  
                  {/* Сумма */}
                  <div className="text-right">
                    <p className="text-[#5cff32] font-mono">{tx.amount.toFixed(2)} {tx.token}</p>
                    <p className="text-xs text-gray-500">{formatTime(tx.timestamp)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Живая статистика */}
      <div className="p-3 bg-[#1d111f] border-t border-[#361052] flex justify-between items-center text-xs">
        <div className="flex items-center text-gray-400">
          <FaFire className="text-[#ff36ab] mr-2" />
          <span>
            {transactions.filter(tx => (Date.now() - tx.timestamp) < 60000).length} транзакций за последнюю минуту
          </span>
        </div>
        <div className="text-gray-400">
          <span className="text-[#5cff32] mr-1">
            {transactions.reduce((sum, tx) => sum + tx.amount, 0).toFixed(2)}
          </span>
          объем всего
        </div>
      </div>
      
      {/* Стили */}
      <style jsx>{`
        .glitch-effect {
          animation: glitch 0.3s ease;
        }
        
        @keyframes glitch {
          0% {
            transform: translate(0);
            filter: hue-rotate(0deg);
          }
          20% {
            transform: translate(-3px, 2px);
            filter: hue-rotate(90deg);
          }
          40% {
            transform: translate(3px, -2px);
            filter: hue-rotate(180deg);
          }
          60% {
            transform: translate(2px, 3px);
            filter: hue-rotate(270deg);
          }
          80% {
            transform: translate(-2px, -3px);
            filter: hue-rotate(180deg);
          }
          100% {
            transform: translate(0);
            filter: hue-rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
} 