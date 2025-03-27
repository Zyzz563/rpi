'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { FaExchangeAlt, FaArrowDown, FaArrowUp, FaChartLine, FaSyncAlt, FaInfo, FaSkull, FaDatabase } from 'react-icons/fa';
import PortalCursor from '../../components/PortalCursor';
import RickTransactions from '@/components/RickTransactions';
import PickleRick from '@/components/PickleRick';

// Динамический импорт ApexCharts
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Определяем тип для токена
type Token = {
  id: string;
  binanceSymbol: string | null; // Используем binanceSymbol для Binance Futures API
  name: string;
  symbol: string;
  balance: string;
  price: number;
  priceChange24h?: number;
  // Новые поля для анимации изменения цены
  previousPrice?: number;
  animating?: boolean;
  dimension?: string; // Добавляем измерение для каждого токена
};

// Определяем тип для данных свечи (пин-бара)
type CandleData = {
  time: number; // Временная метка в миллисекундах
  open: number; // Цена открытия
  close: number; // Цена закрытия
  high: number; // Максимальная цена
  low: number; // Минимальная цена
  volume?: number; // Объем торгов (опционально)
};

// Определяем тип для WebSocket сообщения Binance Futures
type BinanceWebSocketMessage = {
  e: string;         // Тип события (например, "aggTrade")
  s: string;         // Символ (например, "BTCUSDT")
  p: string;         // Цена (строка)
  q: string;         // Количество (строка)
  T: number;         // Время в миллисекундах
  m: boolean;        // Является ли покупателем маркет-мейкером
  a: number;         // ID сделки
};

// Старый тип сообщения для обратной совместимости
type WebSocketMessage = {
  type: string;
  data: {
    symbol: string;
    price: number;
    time: number;
  };
};

// Определяем начальные данные токенов с символами для Binance Futures API
const initialTokens: Token[] = [
  { id: 'flurbos', binanceSymbol: null, name: 'Flurbos', symbol: 'FLB', balance: '42069.00', price: 0.0042, dimension: 'C-137' },
  { id: 'eth', binanceSymbol: 'ETHUSDT', name: 'Ethereum', symbol: 'ETH', balance: '0.85', price: 0, dimension: 'D-99' },
  { id: 'btc', binanceSymbol: 'BTCUSDT', name: 'Bitcoin', symbol: 'BTC', balance: '0.0042', price: 0, dimension: 'J-19-Zeta-7' },
  { id: 'usdt', binanceSymbol: null, name: 'Schmeckles', symbol: 'SCHM', balance: '1337.00', price: 1.00, dimension: 'Citadel of Ricks' },
  { id: 'plumbus', binanceSymbol: null, name: 'Plumbus', symbol: 'PLB', balance: '6.00', price: 6.00, dimension: 'Dimension 35-C' },
  { id: 'meeseeks', binanceSymbol: null, name: 'Meeseeks', symbol: 'SEEK', balance: '2.00', price: 4.20, dimension: 'Box Dimension' },
];

// Global chart data cache to improve performance
const chartDataCache: Record<string, any> = {};

// Новая упрощенная версия компонента графика с лучшей работой CSR и запасным вариантом
const CandleStickChart = ({ options, series, height }: { options: any, series: any[], height: number }) => {
  const [isClient, setIsClient] = useState(false);
  
  // Проверяем, что компонент монтируется на клиенте
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Проверяем наличие данных для отображения
  const hasValidData = useMemo(() => {
    return Boolean(series && 
      series.length && 
      series[0] && 
      series[0].data && 
      series[0].data.length > 0);
  }, [series]);
  
  // Состояние загрузки
  if (!isClient) {
    return (
      <div className="h-64 w-full bg-[#1d111f] rounded flex items-center justify-center portal-background">
        <div className="text-[#5cff32]">
          <svg className="animate-spin h-8 w-8 mr-2 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Калибровка портальной пушки...</span>
        </div>
      </div>
    );
  }
  
  // Запасной вариант для случая, когда данные ещё не готовы
  if (!hasValidData) {
    return (
      <div className="h-64 w-full bg-[#1d111f] rounded flex items-center justify-center portal-background">
        <div className="text-[#5cff32]">
          <svg className="animate-spin h-8 w-8 mr-2 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Поиск данных в межпространственном кабеле...</span>
        </div>
      </div>
    );
  }
  
  // Если мы на клиенте и данные готовы, отображаем график
  return (
    <div className="chart-container portal-border">
      {typeof window !== 'undefined' && (
        <Chart
          options={{
            ...options,
            chart: {
              ...(options.chart || {}),
              animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                  enabled: true,
                  delay: 150
                },
                dynamicAnimation: {
                  enabled: true,
                  speed: 350
                }
              },
              background: '#1d111f',
              foreColor: '#5cff32',
              fontFamily: "'Rajdhani', 'Trebuchet MS', sans-serif",
            }
          }}
          series={series}
          type="candlestick"
          height={height}
          width="100%"
        />
      )}
    </div>
  );
};

// Данные валют и их курсы
const currencies = [
  { code: 'USD', name: 'Доллар США', flag: '🇺🇸', rickName: 'Бумага без ценности' },
  { code: 'EUR', name: 'Евро', flag: '🇪🇺', rickName: 'Европейская бумага' },
  { code: 'GBP', name: 'Фунт стерлингов', flag: '🇬🇧', rickName: 'Островной мусор' },
  { code: 'JPY', name: 'Японская йена', flag: '🇯🇵', rickName: 'Азиатские фантики' },
  { code: 'RUB', name: 'Российский рубль', flag: '🇷🇺', rickName: 'Медвежьи бумажки' },
  { code: 'CNY', name: 'Китайский юань', flag: '🇨🇳', rickName: 'Драконьи монетки' },
  { code: 'FLB', name: 'Flurbos', flag: '🌀', rickName: 'Настоящие деньги' },
  { code: 'BMB', name: 'Блипс и Читцы', flag: '🎮', rickName: 'Валюта плебеев' },
  { code: 'GZR', name: 'Газорпазорп', flag: '👽', rickName: 'Деньги насекомых' },
  { code: 'SCH', name: 'Шмекели', flag: '💰', rickName: 'Карманная мелочь' },
];

// Определяем типы для курсов валют и направлений
type ExchangeRates = {
  [fromCurrency: string]: {
    [toCurrency: string]: number;
  };
};

type RateDirections = {
  [fromCurrency: string]: {
    [toCurrency: string]: 'up' | 'down';
  };
};

// Функция для генерации случайного курса
const getRandomRate = (base = 1, trend = 0): number => {
  const randomFactor = 0.9 + Math.random() * 0.2; // От 0.9 до 1.1
  const trendFactor = trend * (0.01 + Math.random() * 0.03); // Тренд влияет на величину изменения
  return base * (randomFactor + trendFactor);
};

// Функция для генерации начальных курсов обмена
const generateExchangeRates = (): ExchangeRates => {
  const rates: ExchangeRates = {};
  currencies.forEach(fromCurrency => {
    rates[fromCurrency.code] = {};
    currencies.forEach(toCurrency => {
      if (fromCurrency.code === toCurrency.code) {
        rates[fromCurrency.code][toCurrency.code] = 1;
      } else if (fromCurrency.code === 'FLB') {
        // Flurbos имеют высокий курс по отношению к другим валютам
        rates[fromCurrency.code][toCurrency.code] = getRandomRate(50, 1);
      } else if (toCurrency.code === 'FLB') {
        // Другие валюты имеют низкий курс по отношению к Flurbos
        rates[fromCurrency.code][toCurrency.code] = getRandomRate(0.02, -1);
      } else {
        // Случайные курсы для других пар
        rates[fromCurrency.code][toCurrency.code] = getRandomRate();
      }
    });
  });
  return rates;
};

const ExchangePage = () => {
  const [fromCurrency, setFromCurrency] = useState<string>('FLB');
  const [toCurrency, setToCurrency] = useState<string>('SCH');
  const [amount, setAmount] = useState<number>(100);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [result, setResult] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [rickMode, setRickMode] = useState(false);
  const [showRickTip, setShowRickTip] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [rateDirection, setRateDirection] = useState<RateDirections>({});
  const [showPickleRick, setShowPickleRick] = useState<boolean>(false);
  const [showTransactionDetails, setShowTransactionDetails] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartPeriod, setChartPeriod] = useState('24h');
  const [isChartLoading, setIsChartLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [chartOptions, setChartOptions] = useState<any>(null);
  const [chartSeries, setChartSeries] = useState<any[]>([]);

  // Инициализация и периодическое обновление курсов
  useEffect(() => {
    // Начальные курсы
    const initRates = generateExchangeRates();
    setExchangeRates(initRates);
    
    // Начальные направления
    const initialDirections: RateDirections = {};
    Object.keys(initRates).forEach(from => {
      initialDirections[from] = {};
      Object.keys(initRates[from]).forEach(to => {
        initialDirections[from][to] = Math.random() > 0.5 ? 'up' : 'down';
      });
    });
    setRateDirection(initialDirections);
    
    // Периодическое обновление
    const interval = setInterval(() => {
      const oldRates = exchangeRates;
      const newRates = generateExchangeRates();
      setExchangeRates(newRates);
      
      // Обновляем направления
      const newDirections: RateDirections = {};
      
      // Определяем направление движения курса для каждой пары
      Object.keys(newRates).forEach(from => {
        newDirections[from] = newDirections[from] || {};
        Object.keys(newRates[from]).forEach(to => {
          if (oldRates[from] && oldRates[from][to]) {
            newDirections[from][to] = newRates[from][to] > oldRates[from][to] ? 'up' : 'down';
          } else {
            newDirections[from][to] = Math.random() > 0.5 ? 'up' : 'down';
          }
        });
      });
      
      setRateDirection(newDirections);
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 300);
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  // Пересчет при изменении параметров обмена
  useEffect(() => {
    if (!loading) {
      calculateExchange(amount, fromCurrency, toCurrency, exchangeRates);
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  // Функция расчета обмена
  const calculateExchange = (amount: number, from: string, to: string, rates: ExchangeRates): number => {
    if (rates[from] && rates[from][to]) {
      const rate = rates[from][to];
      let calculatedResult = amount * rate;
      
      // С шансом 30% добавляем небольшой случайный бонус для Рика
      if (rickMode && Math.random() < 0.3) {
        calculatedResult *= 0.95 + Math.random() * 0.05; // 5% скрытая комиссия
      }
      
      return calculatedResult;
    }
    return 0;
  };

  // Функция переключения валют
  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    setResult(0);
  };

  // Обработчик переключения режима Рика
  const toggleRickMode = () => {
    setRickMode(!rickMode);
    setGlitchEffect(true);
    setTimeout(() => setGlitchEffect(false), 200);
  };

  // Получение направления изменения курса для отображения стрелки
  const getDirection = (from: string, to: string): 'up' | 'down' => {
    if (rateDirection[from] && rateDirection[from][to]) {
      return rateDirection[from][to];
    }
    return 'up';
  };

  // Обработчик выбора транзакции
  const handleTransactionSelect = (transaction: any) => {
    setSelectedTransaction(transaction);
    setShowTransactionDetails(true);
    
    // Если транзакция теневая и мы в режиме зла, показываем Pickle Rick
    if (transaction.isShady && rickMode) {
      setShowPickleRick(true);
      setTimeout(() => setShowPickleRick(false), 5000);
    }
  };

  // Обработчик ввода суммы
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setAmount(value);
      if (exchangeRates[fromCurrency] && exchangeRates[fromCurrency][toCurrency]) {
        const calculatedResult = calculateExchange(value, fromCurrency, toCurrency, exchangeRates);
        setResult(calculatedResult);
      }
    } else {
      setAmount(0);
      setResult(0);
    }
  };

  // Вспомогательные функции для работы с измерениями
  const getDimensionColor = (dimensionId: string): string => {
    const dimensions: Record<string, string> = {
      'c137': '#5cff32',
      'c500a': '#36c5f4',
      'j1977': '#ff36ab',
      'fb788': '#f7aa33',
      'd716': '#a04ff7',
      'k222': '#00b8a3',
      'n/a': '#ff5252'
    };
    return dimensions[dimensionId] || '#ff5252';
  };
  
  const getDimensionName = (dimensionId: string): string => {
    const dimensions: Record<string, string> = {
      'c137': 'Измерение C-137',
      'c500a': 'Измерение C-500A',
      'j1977': 'Измерение J-1977',
      'fb788': 'Измерение FB-788',
      'd716': 'Измерение D-716',
      'k222': 'Цитадель Риков',
      'n/a': 'Неизвестное измерение'
    };
    return dimensions[dimensionId] || 'Неизвестное измерение';
  };

  return (
    <div className={`min-h-screen bg-[#1d111f] text-white portal-background ${glitchEffect ? 'animate-portal-glitch' : ''} crt-effect`}>
      {/* Фоновые эффекты */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#1d111f] bg-opacity-80 z-0"></div>
        <div className="absolute inset-0 bg-portal-grid opacity-20 z-1 scan-lines"></div>
      </div>

      <div className="relative py-12 z-10">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-mono font-bold mb-6 text-center text-[#5cff32] portal-glow rick-glitch" data-text="Межпространственный Обмен">
            Межпространственный Обмен
          </h1>
          <p className="text-xl text-center mb-12 text-[#ff36ab]">
            {rickMode ? 
              "Обменивай свою бесполезную валюту на единственные настоящие деньги - Flurbos!" : 
              "Быстрый и выгодный обмен валют по лучшим курсам в мультивселенной"}
          </p>
          
          <div className="flex justify-center mb-8">
            <button 
              onClick={toggleRickMode}
              className="px-4 py-2 bg-[#220833] rounded-lg text-[#ff36ab] hover:bg-[#310b47] transition-all rickified-panel"
            >
              {rickMode ? "Скрыть правду" : "Раскрыть правду"}
            </button>
          </div>
          
          {/* Калькулятор обмена */}
          <div className="max-w-2xl mx-auto bg-[#220833] p-6 rounded-lg shadow-lg rickified-panel mb-12 scan-lines">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Отдаете */}
              <div>
                <label className="block text-xl mb-4 font-mono text-[#5cff32]">
                  {rickMode ? "Отдаешь свои бесполезные" : "Отдаете"}
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  className="w-full bg-[#1a0b26] border border-[#5cff32] rounded-lg p-3 mb-4 text-white focus:outline-none focus:ring focus:ring-[#5cff32] portal-input"
                />
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full bg-[#1a0b26] border border-[#5cff32] rounded-lg p-3 text-white appearance-none focus:outline-none focus:ring focus:ring-[#5cff32] portal-select"
                >
                  {currencies.map((currency) => (
                    <option key={`from-${currency.code}`} value={currency.code}>
                      {currency.flag} {currency.name} ({currency.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Кнопка обмена направлений */}
              <div className="flex items-center justify-center md:justify-start md:pt-12">
                <button
                  onClick={swapCurrencies}
                  className="bg-[#5cff32] text-black p-3 rounded-full transform hover:rotate-180 transition-all focus:outline-none portal-pulse-btn"
                >
                  <FaExchangeAlt />
                </button>
              </div>

              {/* Получаете */}
              <div>
                <label className="block text-xl mb-4 font-mono text-[#5cff32]">
                  {rickMode ? "Получаешь великие" : "Получаете"}
                </label>
                <input
                  type="number"
                  value={result.toFixed(4)}
                  readOnly
                  className="w-full bg-[#1a0b26] border border-[#ff36ab] rounded-lg p-3 mb-4 text-white focus:outline-none"
                />
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full bg-[#1a0b26] border border-[#ff36ab] rounded-lg p-3 text-white appearance-none focus:outline-none focus:ring focus:ring-[#ff36ab] portal-select"
                >
                  {currencies.map((currency) => (
                    <option key={`to-${currency.code}`} value={currency.code}>
                      {currency.flag} {currency.name} ({currency.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Информация о курсе */}
            <div className="mt-6 p-4 bg-[#1a0b26] rounded-lg flex justify-between items-center">
              <div>
                <span className="text-gray-400">Курс обмена:</span>
                <div className="text-xl text-[#5cff32]">
                  1 {fromCurrency} = {exchangeRates[fromCurrency]?.[toCurrency]?.toFixed(4) || 0} {toCurrency}
                  <span className="ml-2">
                    {getDirection(fromCurrency, toCurrency) === 'up' ? (
                      <FaArrowUp className="inline text-green-400" />
                    ) : (
                      <FaArrowDown className="inline text-red-400" />
                    )}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-gray-400">Комиссия:</span>
                <div className="text-xl text-[#5cff32]">
                  {rickMode ? "Переменная*" : "0%"}
                </div>
              </div>
            </div>

            {/* Кнопка обмена */}
            <button 
              className="w-full bg-gradient-to-r from-[#5cff32] to-[#39c15b] text-black font-bold py-4 px-6 rounded-lg mt-6 hover:from-[#67ff45] hover:to-[#4ad56a] transition-all portal-btn-green portal-pulse-btn"
              onMouseEnter={() => setShowRickTip(true)}
              onMouseLeave={() => setShowRickTip(false)}
            >
              {rickMode ? "Обменять (и отдать часть Рику)" : "Обменять валюту"}
            </button>

            {/* Rick's подсказка */}
            {showRickTip && rickMode && (
              <div className="mt-4 text-xs text-[#ff36ab] italic">
                * Комиссия может составлять от 10% до 90%, в зависимости от настроения Рика и фазы луны в измерении C-137
              </div>
            )}
          </div>

          {/* График цен */}
          <div className="rickified-panel p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4 portal-glow">
              {rickMode ? "Межпространственные Графики" : "Графики валют"}
            </h2>
            
            {isChartLoading ? (
              <div className="h-[400px] flex items-center justify-center">
                <div className="portal-loading"></div>
              </div>
            ) : (
              <>
                {chartOptions && chartSeries && <Chart options={chartOptions} series={chartSeries} type="area" height={400} />}
              </>
            )}
            
            <div className="mt-4 flex justify-end">
              <div className="flex space-x-2">
                {['1h', '24h', '7d', '30d'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setChartPeriod(period)}
                    className={`px-3 py-1.5 rounded-md text-sm ${
                      chartPeriod === period 
                        ? 'bg-[#5cff32] text-black' 
                        : 'bg-[#220833] text-white hover:bg-[#361052]'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Межпространственные транзакции */}
          <div className="rickified-panel p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4 portal-glow flex items-center">
              <FaDatabase className="mr-2" /> Межпространственные Транзакции
            </h2>
            <p className="mb-4 text-gray-400">Отслеживайте в реальном времени финансовые потоки между измерениями</p>
            
            <RickTransactions 
              maxTransactions={6}
              refreshInterval={rickMode ? 2500 : 5000}
              height={350}
              showControls={true}
              onSelectTransaction={handleTransactionSelect}
            />
          </div>

          {/* Последние транзакции и активность */}
          <div className="rickified-panel p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4 portal-glow">
              {rickMode ? "Галактические Транзакции" : "Последние транзакции"}
            </h2>
            
            {isLoading ? (
              <div className="h-20 flex items-center justify-center">
                <div className="portal-loading"></div>
              </div>
            ) : (
              <div className="h-[350px] overflow-y-auto">
                {/* Реализация компонента RickTransactions для последних транзакций */}
              </div>
            )}
          </div>

          <div className="max-w-4xl mx-auto mt-12 text-center">
            <p className="text-gray-400 text-sm">
              {rickMode 
                ? "Используя наш обменник, вы соглашаетесь с тем, что Рик может использовать ваши деньги для финансирования любых своих безумных затей, включая (но не ограничиваясь): создание смертоносных вирусов, межпространственные войны и летние барбекю." 
                : "Все обмены проводятся по текущим рыночным курсам. Курсы обновляются каждые 10 секунд."}
            </p>
          </div>
        </div>
      </div>

      {/* Порталовый курсор */}
      <PortalCursor enabled={true} />

      {/* Модалка с деталями транзакции */}
      {showTransactionDetails && selectedTransaction && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80 backdrop-blur-sm portal-background">
          <div className="max-w-2xl w-full p-6 rickified-panel rounded-lg transform transition-all duration-300 animate-fade-in relative overflow-hidden shadow-[0_0_30px_rgba(92,255,50,0.3)]">
            {/* Фоновые элементы */}
            <div className="absolute inset-0 bg-portal-grid opacity-10 scan-lines"></div>
            
            {/* Декоративный портал в углу */}
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-r from-[#5cff32] to-transparent opacity-30 animate-portal-pulse"></div>
            
            {/* Молекулярная цепочка */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#5cff32] to-transparent"></div>
            
            <h2 className="text-2xl font-bold mb-4 portal-glow flex items-center relative z-10">
              <span className="mr-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="#5cff32"/>
                  <path d="M15 12C15 13.66 13.66 15 12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12Z" fill="#5cff32"/>
                </svg>
              </span>
              Детали Транзакции
              {selectedTransaction.isShady && (
                <span className="ml-2 text-[#ff36ab]"><FaSkull /></span>
              )}
              
              {/* Индикатор измерения */}
              <span className="ml-auto text-sm font-mono bg-[#220833] px-2 py-1 rounded text-[#5cff32]">
                {selectedTransaction.isShady ? 'ОПАСНОЕ ИЗМЕРЕНИЕ' : 'БЕЗОПАСНОЕ ИЗМЕРЕНИЕ'}
              </span>
            </h2>
            
            <div className="backdrop-blur-sm bg-[#220833] bg-opacity-70 p-4 rounded-lg mb-4 relative z-10">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">ID Транзакции:</p>
                  <p className="font-mono text-white">{selectedTransaction.id}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Временная метка:</p>
                  <p className="font-mono text-white">{new Date(selectedTransaction.timestamp).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Из измерения:</p>
                  <p className="text-white flex items-center">
                    <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: getDimensionColor(selectedTransaction.fromDimension) }}></span>
                    {getDimensionName(selectedTransaction.fromDimension)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">В измерение:</p>
                  <p className="text-white flex items-center">
                    <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: getDimensionColor(selectedTransaction.toDimension) }}></span>
                    {getDimensionName(selectedTransaction.toDimension)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Сумма:</p>
                  <p className="text-[#5cff32] font-mono text-lg">
                    {selectedTransaction.amount.toFixed(2)} {selectedTransaction.token}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Статус:</p>
                  <p className={`${selectedTransaction.isShady ? "text-[#ff36ab]" : "text-[#5cff32]"} flex items-center`}>
                    {selectedTransaction.isShady ? (
                      <>
                        <span className="inline-block w-2 h-2 rounded-full bg-[#ff36ab] mr-2 animate-pulse"></span>
                        Подозрительная
                      </>
                    ) : (
                      <>
                        <span className="inline-block w-2 h-2 rounded-full bg-[#5cff32] mr-2"></span>
                        Подтверждена
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-6 relative z-10">
              <p className="text-gray-400 text-sm mb-1">Описание:</p>
              <p className="p-3 bg-[#1a0b26] rounded-lg text-white border border-[#361052]">{selectedTransaction.description}</p>
            </div>
            
            {rickMode && selectedTransaction.isShady && (
              <div className="mb-6 p-4 bg-[#2d0a1f] border border-[#ff36ab] rounded-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-[url('/noise.png')] opacity-10"></div>
                <p className="text-[#ff36ab] text-sm font-bold mb-2 flex items-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" className="mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
                  </svg>
                  КОНФИДЕНЦИАЛЬНАЯ ИНФОРМАЦИЯ:
                </p>
                <div className="bg-[#1a0b26] bg-opacity-50 p-3 rounded">
                  <p className="text-sm text-white">
                    Этот тип транзакций отслеживается Галактической Федерацией. Рекомендуется использовать 
                    маршрутизацию через нейтральное измерение для скрытия следов.
                  </p>
                  <div className="mt-2 p-2 border border-dashed border-[#ff36ab] bg-black bg-opacity-30 rounded">
                    <p className="text-xs text-[#ff36ab]">
                      "Не беспокойся, Морти! У меня есть квантовый дефлектор, который скрывает наши транзакции от любопытных глаз Федерации." - Рик Санчез, C-137
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-between relative z-10">
              <button 
                onClick={() => {
                  // Показываем Pickle Rick с определенной вероятностью при закрытии
                  if (Math.random() < 0.2) {
                    setShowPickleRick(true);
                    setTimeout(() => setShowPickleRick(false), 4000);
                  }
                  setShowTransactionDetails(false);
                }}
                className="p-3 bg-[#361052] hover:bg-[#4a1070] text-white rounded-lg portal-btn-pink"
              >
                Закрыть
              </button>
              
              {selectedTransaction.isShady && (
                <button 
                  onClick={() => {
                    // При нажатии на эту кнопку можно добавить какую-то дополнительную логику
                    setShowTransactionDetails(false);
                    // Всегда показываем Pickle Rick при скрытии транзакции
                    setShowPickleRick(true);
                    setTimeout(() => setShowPickleRick(false), 5000);
                  }}
                  className="p-3 bg-gradient-to-r from-[#ff36ab] to-[#9900ff] text-white rounded-lg portal-btn-pink"
                >
                  Скрыть транзакцию
                </button>
              )}
            </div>
            
            {/* Декоративные элементы формул */}
            <div className="absolute bottom-2 left-2 text-[#5cff32] opacity-20 text-xs transform rotate-15">Σ(C-137)²</div>
            <div className="absolute top-2 right-10 text-[#5cff32] opacity-20 text-xs transform -rotate-15">∫∞dt</div>
          </div>
        </div>
      )}
      
      {/* Pickle Rick Easter Egg */}
      {showPickleRick && (
        <PickleRick
          trigger="auto"
          duration={5000}
          position="random"
          quotes={[
            "Я превратил себя в финансового консультанта, Морти!",
            "Эти цены... *отрыжка*... просто космические!",
            "Покупай Flurbos, продавай Federation Credits! Финансовый совет дня!",
            "Ты знаешь, что делать с Mega Seeds! Купи по максимуму!",
            "Любишь рисковать? Тогда вкладывайся в Blips and Chitz - парк развлечений всегда в тренде!"
          ]}
        />
      )}

      <style jsx global>{`
        .portal-input {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .portal-input:focus {
          box-shadow: 0 0 15px rgba(92, 255, 50, 0.7);
        }
        
        .portal-select {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .portal-select:focus {
          box-shadow: 0 0 15px rgba(92, 255, 50, 0.7);
        }
        
        @keyframes pulse-border {
          0% { box-shadow: 0 0 0 0 rgba(92, 255, 50, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(92, 255, 50, 0); }
          100% { box-shadow: 0 0 0 0 rgba(92, 255, 50, 0); }
        }
        
        @keyframes pulse-slow {
          0% { opacity: 0.1; }
          50% { opacity: 0.2; }
          100% { opacity: 0.1; }
        }
      `}</style>
    </div>
  );
};

export default ExchangePage; 