'use client';

import { useState, useEffect, useRef } from 'react';
import PortalCursor from '../../components/PortalCursor';
import Image from 'next/image';

export default function TokenPage() {
  const [evilMode, setEvilMode] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const chartRef = useRef<HTMLCanvasElement>(null);

  const contractAddress = '0xC137FlurbosBioweaponFinance6626';
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress);
    setGlitchEffect(true);
    setTimeout(() => setGlitchEffect(false), 200);
  };
  
  // Переключение злого режима
  const toggleEvilMode = () => {
    setEvilMode(!evilMode);
    setGlitchEffect(true);
    setTimeout(() => setGlitchEffect(false), 200);
  };

  // Инициализация графика и случайные глитч-эффекты
  useEffect(() => {
    // Создание графика цен
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        // Создание базовой линии графика
        ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height);
        ctx.beginPath();
        ctx.moveTo(0, chartRef.current.height / 2);
        
        // Разные графики для обычного и злого режимов
        if (evilMode) {
          // Злой график с резкими падениями
          for (let x = 0; x < chartRef.current.width; x += 10) {
            const y = Math.random() * chartRef.current.height;
            ctx.lineTo(x, y);
          }
          ctx.strokeStyle = '#ff36ab';
        } else {
          // Обычный график с тенденцией роста
          for (let x = 0; x < chartRef.current.width; x += 10) {
            const progress = x / chartRef.current.width;
            const volatility = Math.random() * 50 - 25;
            const trend = chartRef.current.height / 2 - (progress * 100);
            const y = trend + volatility;
            ctx.lineTo(x, y);
          }
          ctx.strokeStyle = '#5cff32';
        }
        
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    // Случайный глитч-эффект каждые 15 секунд
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 200);
      }
    }, 15000);
    
    return () => clearInterval(glitchInterval);
  }, [evilMode]);

  return (
    <div className={`min-h-screen bg-[#1d111f] text-white ${evilMode ? 'evil-mode' : ''} ${glitchEffect ? 'animate-portal-glitch' : ''} crt-effect`}>
      {/* Фоновая анимация */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Сетка в стиле лаборатории */}
        <div className="absolute inset-0 bg-portal-grid opacity-20 z-1 scan-lines"></div>
        
        {/* Плавающие формулы и уравнения */}
        <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-[#5cff32] opacity-20 text-xs md:text-base"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animation: `float-formula ${10 + Math.random() * 20}s linear infinite`
              }}
            >
              {['C₁₃₇H₇F₁₇', 'Fl₂O₃', 'EvilRick=mc²', 'F=Morty×a', 'P(A|B)=Flurbos', 'Portal(x)=∫Universe(t)dt', '∇×Plumbus=-∂Flurbos/∂t', 'S=-k∑Jerry₁ln(Jerry₁)'][i % 8]}
            </div>
          ))}
        </div>
      </div>

      {/* Главная секция */}
      <div className="relative py-12 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className={`text-5xl md:text-6xl font-mono font-bold ${evilMode ? 'text-[#ff36ab]' : 'text-[#5cff32]'} portal-glow rick-glitch`} data-text="FLURBOS">
                {evilMode ? 'FLURBOS 666' : 'FLURBOS'}
                {glitchEffect && <span className="absolute inset-0 text-[#ff36ab] opacity-70 transform translate-x-1">FLURBOS</span>}
              </h1>
              <p className="text-xl mt-2 text-[#ff36ab]">
                {evilMode ? 'Межпространственный инструмент финансового порабощения' : 'Межпространственная валюта будущего'}
              </p>
            </div>
            <div>
              <button 
                onClick={toggleEvilMode} 
                className="px-4 py-2 bg-[#220833] rounded-lg rickified-panel text-[#ff36ab] hover:bg-[#310b47] transition-all"
              >
                {evilMode ? 'Скрыть истину' : 'Показать истину'}
              </button>
            </div>
          </div>

          {/* Информация о токене */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="col-span-2">
              <div className="bg-[#220833] p-6 rounded-lg rickified-panel mb-8 scan-lines">
                <h2 className="text-2xl font-mono font-bold mb-4 text-[#5cff32]">О Валюте {evilMode && <span className="text-[#ff36ab]">Зла</span>}</h2>
                <p className="mb-4">
                  {evilMode ? 
                    'FLURBOS - это не просто криптовалюта, это инструмент межпространственного доминирования, разработанный Риком Санчезом из измерения C-137 для установления финансового контроля над мультивселенной.' :
                    'FLURBOS - это инновационная межпространственная криптовалюта, разработанная Риком Санчезом из измерения C-137 для обеспечения безопасных и анонимных транзакций во всей мультивселенной.'}
                </p>
                <p className="mb-4">
                  {evilMode ? 
                    'Каждая транзакция в FLURBOS увеличивает власть Рика над экономическими системами всех известных измерений. За каждой монетой стоит частичка вашей финансовой свободы, которую вы добровольно отдаете.' :
                    'Используя передовые технологии квантовой криптографии и межпространственную блокчейн-сеть, FLURBOS обеспечивает беспрецедентный уровень безопасности и анонимности транзакций.'}
                </p>
                <p>
                  {evilMode ? 
                    'Ключевое преимущество FLURBOS для Рика - возможность манипулировать экономикой целых планет и измерений, создавая финансовые кризисы и получая контроль над ресурсами, что является первым шагом в его грандиозном плане мультивселенского доминирования.' :
                    'Ключевым преимуществом FLURBOS является возможность совершать мгновенные транзакции между различными измерениями без необходимости конвертации валют, что делает его идеальным средством платежа для межпространственных путешественников и торговцев.'}
                </p>
              </div>

              <div className="bg-[#220833] p-6 rounded-lg rickified-panel scan-lines">
                <h2 className="text-2xl font-mono font-bold mb-4 text-[#5cff32]">Токеномика {evilMode && <span className="text-[#ff36ab]">Порабощения</span>}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-mono mb-2 text-[#ff36ab]">Распределение</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>{evilMode ? 'Тайные сборы Рика:' : 'Команда:'}</span>
                        <span className="text-[#5cff32]">20%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>{evilMode ? 'Манипуляция рынком:' : 'Маркетинг:'}</span>
                        <span className="text-[#5cff32]">15%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>{evilMode ? 'Лохи-инвесторы:' : 'Инвесторы:'}</span>
                        <span className="text-[#5cff32]">30%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>{evilMode ? 'Финансовое оружие:' : 'Разработка:'}</span>
                        <span className="text-[#5cff32]">20%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>{evilMode ? 'Порабощение Джерри:' : 'Ликвидность:'}</span>
                        <span className="text-[#5cff32]">15%</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-mono mb-2 text-[#ff36ab]">Детали</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Имя:</span>
                        <span className="text-[#5cff32]">{evilMode ? 'FLURBOS 666' : 'FLURBOS'}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Символ:</span>
                        <span className="text-[#5cff32]">FLB</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Общее предложение:</span>
                        <span className="text-[#5cff32]">{evilMode ? '666,000,000,000' : '1,000,000,000'}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Блокчейн:</span>
                        <span className="text-[#5cff32]">{evilMode ? 'EvilVerse' : 'MultiVerse'}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Контракт:</span>
                        <span className="text-[#5cff32] text-xs break-all">0xC137FlurbosBioweaponFinance6626</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-[#220833] p-6 rounded-lg rickified-panel mb-8 scan-lines">
                <div className="relative">
                  <Image 
                    src={evilMode ? "/flurbos_evil.png" : "/flurbos.png"} 
                    alt="FLURBOS Token" 
                    width={300} 
                    height={300}
                    className="mx-auto portal-glow mb-4"
                  />
                  <div className="absolute inset-0 bg-portal-grid opacity-20 pointer-events-none"></div>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-mono font-bold text-[#5cff32]">
                    1 FLB = {evilMode ? '$6.66' : '$9.81'} USD
                  </p>
                  <p className={`text-sm ${evilMode ? 'text-[#ff36ab]' : 'text-green-400'}`}>
                    {evilMode ? '↓ -66.6% за 24ч (манипуляция)' : '↑ +42.0% за 24ч'}
                  </p>
                </div>
              </div>

              <div className="bg-[#220833] p-6 rounded-lg rickified-panel scan-lines">
                <h2 className="text-2xl font-mono font-bold mb-4 text-[#5cff32]">
                  {evilMode ? 'Как попасться на крючок' : 'Как купить'}
                </h2>
                <ol className="space-y-4 list-decimal pl-5">
                  <li>
                    {evilMode ? 
                      'Создайте межпространственный кошелек, автоматически передав свою финансовую душу Рику' : 
                      'Создайте межпространственный кошелек через портал РПИ БАНК'}
                  </li>
                  <li>
                    {evilMode ? 
                      'Обменяйте свои жалкие земные деньги на FLURBOS по невыгодному курсу' : 
                      'Пополните кошелек любой фиатной или крипто валютой'}
                  </li>
                  <li>
                    {evilMode ? 
                      'Подпишите транзакцию, даже не прочитав пользовательское соглашение размером в 666 страниц' : 
                      'Обменяйте вашу валюту на FLURBOS через нашу биржу'}
                  </li>
                  <li>
                    {evilMode ? 
                      'Наблюдайте с ужасом, как ваши инвестиции испаряются, пока Рик смеется' : 
                      'Храните ваши FLURBOS безопасно в вашем межпространственном кошельке'}
                  </li>
                </ol>
                <div className="mt-6">
                  <button className="w-full py-3 bg-gradient-to-r from-[#5cff32] to-[#39c15b] text-black font-bold rounded-lg hover:from-[#67ff45] hover:to-[#4ad56a] transition-all portal-pulse-btn">
                    {evilMode ? 'Отдать мне свои деньги' : 'Купить FLURBOS'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* График для токена */}
          <div className="mb-12">
            <div className="bg-[#220833] p-6 rounded-lg rickified-panel mb-4 scan-lines">
              <h2 className="text-2xl font-mono font-bold mb-6 text-[#5cff32]">
                {evilMode ? 'График манипуляций' : 'График цены'}
              </h2>
              <div className="relative h-80 rickified-chart overflow-hidden">
                <div className="absolute inset-0 bg-portal-grid opacity-20 pointer-events-none"></div>
                <div className="absolute inset-0 chart-overlay"></div>
                {evilMode ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-2xl text-[#ff36ab] screen-glitch portal-glow">МУАХАХАХА!</p>
                  </div>
                ) : null}
                <canvas ref={chartRef} className="w-full h-full"></canvas>
              </div>
              <div className="flex justify-between mt-4 text-sm text-gray-400">
                <span>{evilMode ? '6.06.2137' : '01.01.2137'}</span>
                <span>{evilMode ? '6.66.2137' : '30.06.2137'}</span>
              </div>
            </div>
          </div>

          {/* Партнеры */}
          <div className="mb-12">
            <div className="bg-[#220833] p-6 rounded-lg rickified-panel scan-lines">
              <h2 className="text-2xl font-mono font-bold mb-6 text-[#5cff32]">
                {evilMode ? 'Сообщники' : 'Партнеры'}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {['Galactic Federation', 'Council of Ricks', 'Unity', 'Zigerions'].map((partner, index) => (
                  <div key={index} className="p-4 bg-[#1a0b26] rounded-lg text-center">
                    <div className="h-12 w-12 mx-auto mb-2 bg-[#5cff32] rounded-full portal-glow"></div>
                    <div className="text-sm text-[#ff36ab]">
                      {evilMode ? 
                        ['Подставная организация', 'Марионетки Рика', 'Порабощенный улей', 'Полезные идиоты'][index] : 
                        partner}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Отказ от ответственности */}
          <div className="bg-[#220833] p-6 rounded-lg rickified-panel text-sm text-gray-400 scan-lines">
            <h3 className="text-xl font-mono font-bold mb-2 text-[#ff36ab]">Отказ от ответственности</h3>
            <p>
              {evilMode ? 
                'Покупая FLURBOS, вы соглашаетесь с тем, что Рик Санчез из измерения C-137 получает полный контроль над вашими финансами, имуществом и, возможно, вашим разумом. РПИ БАНК не несет ответственности за финансовые потери, экзистенциальные кризисы или превращение в галактического раба в результате владения FLURBOS. Бывали ситуации, когда держатели FLURBOS спонтанно превращались в мобильные банкоматы для Рика или использовались как биологические контейнеры для контрабанды мегасемян. ПОКУПАТЬ НА СВОЙ СТРАХ И РИСК. МЫ ВАС ПРЕДУПРЕЖДАЛИ.' :
                'FLURBOS - это экспериментальная межпространственная криптовалюта. Инвестиции в криптовалюты связаны с высоким риском. Стоимость FLURBOS может как увеличиться, так и уменьшиться. Всегда проводите собственное исследование перед инвестированием. РПИ БАНК не несет ответственности за потери, связанные с колебаниями рынка или межпространственными финансовыми аномалиями.'}
            </p>
          </div>
        </div>
      </div>

      {/* Курсор в виде портальной пушки */}
      <PortalCursor enabled={true} />

      {/* Стили */}
      <style jsx global>{`
        @keyframes float-formula {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.1; }
          50% { transform: translateY(-30px) rotate(180deg); opacity: 0.3; }
          100% { transform: translateY(-60px) rotate(360deg); opacity: 0.1; }
        }
        
        .rickified-chart {
          position: relative;
          background: #120522;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .chart-overlay {
          pointer-events: none;
          background: linear-gradient(to bottom, rgba(18, 5, 34, 0) 70%, rgba(18, 5, 34, 1) 100%);
        }
        
        .evil-mode .rickified-panel {
          box-shadow: 0 0 15px rgba(255, 54, 171, 0.3);
        }
        
        .animate-portal-glitch {
          animation: portal-glitch 0.2s ease;
        }
        
        @keyframes portal-glitch {
          0% { filter: hue-rotate(0deg); }
          25% { filter: hue-rotate(90deg) brightness(1.5); transform: scale(1.01); }
          50% { filter: hue-rotate(180deg); transform: scale(0.99); }
          75% { filter: hue-rotate(270deg) brightness(0.8); transform: scale(1.01); }
          100% { filter: hue-rotate(360deg); }
        }
      `}</style>
    </div>
  );
} 