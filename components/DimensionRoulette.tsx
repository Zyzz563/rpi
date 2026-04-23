'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Dimension {
  code: string;
  name: string;
  fact: string;
  reward: string;
  color: string;
}

const DIMENSIONS: Dimension[] = [
  {
    code: 'C-137',
    name: 'Родное измерение',
    fact: 'Здесь Рик Санчез изобрёл портал-пушку и самый крепкий шмеклевый сплав.',
    reward: '+137 Flurbos за смелость',
    color: '#5cff32',
  },
  {
    code: 'J-19ζ7',
    name: 'Мир Кроненбергов',
    fact: 'Вся экономика построена на обмене органами. Не смотри под стол.',
    reward: '+1 Plumbus (б/у)',
    color: '#ff36ab',
  },
  {
    code: 'Froopyland',
    name: 'Фрупиленд',
    fact: 'Здесь деньги растут на облачных деревьях, но проценты кусаются.',
    reward: '+42 Schmeckles',
    color: '#36c5f4',
  },
  {
    code: 'N-322',
    name: 'Галактическая Биржа',
    fact: 'Галактическая Федерация печатает Блемфларки быстрее, чем ты моргаешь.',
    reward: '+999 Blemflarcks (заморожены)',
    color: '#c6ff00',
  },
  {
    code: 'Огуречное',
    name: 'Pickle Dimension',
    fact: 'Все жители — огурцы. Ставка по депозиту: 420% в неделю, но ты сам станешь огурцом.',
    reward: 'Превращение в Pickle Rick (навсегда)',
    color: '#76ff03',
  },
  {
    code: 'Совет Риков',
    name: 'Цитадель Риков',
    fact: 'Совет Риков конфискует твой кошелёк за недостаточно саркастичный пароль.',
    reward: 'Испытательный срок 3 перезагрузки',
    color: '#f3df3a',
  },
  {
    code: '35-C',
    name: 'Гигантский Телепорт',
    fact: 'Здесь один биткойн стоит один бутерброд. Инфляция съела всё, включая логику.',
    reward: '+1 сэндвич с арахисовой пастой',
    color: '#ff36ab',
  },
  {
    code: 'Cronenberg',
    name: 'Мир-который-не-стоило-открывать',
    fact: 'Деньги тут липкие и шевелятся. Все терминалы говорят шёпотом.',
    reward: '−13 рассудка',
    color: '#36c5f4',
  },
  {
    code: 'D-99',
    name: 'Торговый Хаб Гроумфломитов',
    fact: 'Эти жуки берут комиссию 50% со всего, включая твоё терпение.',
    reward: '+1 гражданство Гроумфломитов',
    color: '#5cff32',
  },
  {
    code: 'K-83',
    name: 'Анти-Рик',
    fact: 'Всё наоборот: чем меньше у тебя денег, тем ты богаче. Логика сломана.',
    reward: '+0 РПИ (и это много)',
    color: '#ff36ab',
  },
];

export default function DimensionRoulette() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<Dimension | null>(null);
  const [count, setCount] = useState(0);

  const labels = useMemo(() => DIMENSIONS.map((d) => d.code), []);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    const chosenIdx = Math.floor(Math.random() * DIMENSIONS.length);
    setTimeout(() => {
      setResult(DIMENSIONS[chosenIdx]);
      setSpinning(false);
      setCount((c) => c + 1);
    }, 2200);
  };

  return (
    <section className="my-16 max-w-5xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 portal-glow text-center text-[#5cff32]">
        Рулетка Измерений
      </h2>
      <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
        Жми на портал, чтобы прыгнуть в случайное измерение. Риск — твой. Награда — сомнительна.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Wheel */}
        <div className="relative mx-auto w-[280px] h-[280px] md:w-[340px] md:h-[340px]">
          {/* outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-[#5cff32] shadow-portal opacity-80" />
          <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#ff36ab] opacity-60" />

          {/* rotating wheel */}
          <motion.div
            className="absolute inset-4 rounded-full bg-gradient-to-br from-[#220833] via-[#1d111f] to-[#361052] overflow-hidden"
            animate={{ rotate: spinning ? 360 * 6 + Math.random() * 360 : 0 }}
            transition={{ duration: 2.2, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {labels.map((label, i) => {
              const angle = (360 / labels.length) * i;
              return (
                <div
                  key={label}
                  className="absolute top-1/2 left-1/2 origin-left text-[10px] md:text-xs font-mono text-[#5cff32] whitespace-nowrap"
                  style={{
                    transform: `rotate(${angle}deg) translate(32%, 0)`,
                  }}
                >
                  <span className="inline-block px-2 py-0.5 bg-[#220833]/80 border border-[#5cff32]/40 rounded">
                    {label}
                  </span>
                </div>
              );
            })}

            {/* portal core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-radial from-[#5cff32] to-[#220833] opacity-80 animate-portal-pulse" />
          </motion.div>

          {/* pointer */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[14px] border-r-[14px] border-b-[24px] border-l-transparent border-r-transparent border-b-[#ff36ab] drop-shadow-[0_0_8px_rgba(255,54,171,0.8)]" />
        </div>

        {/* CTA + result */}
        <div className="flex flex-col items-center md:items-start">
          <button
            type="button"
            onClick={spin}
            disabled={spinning}
            className="neon-btn-green relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="neon-btn-text">
              {spinning ? 'Открываю портал…' : 'Открыть портал'}
            </span>
            <span className="neon-btn-glitch" />
            <span className="neon-btn-blink" />
          </button>

          <div className="mt-4 text-sm text-gray-400 font-mono">
            Прыжков совершено: <span className="text-[#5cff32]">{count}</span>
          </div>

          <div className="mt-6 w-full min-h-[160px]">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key={result.code + count}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                  className="rickified-panel p-5 rounded-lg bg-[#220833]/80"
                  style={{ borderColor: result.color }}
                >
                  <div className="flex items-baseline justify-between mb-2 flex-wrap gap-2">
                    <span
                      className="text-xs uppercase font-mono tracking-widest"
                      style={{ color: result.color }}
                    >
                      Измерение {result.code}
                    </span>
                    <span className="text-xs text-gray-400">
                      Билет в один конец
                    </span>
                  </div>
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{ color: result.color }}
                  >
                    {result.name}
                  </h3>
                  <p className="text-sm text-white mb-3">{result.fact}</p>
                  <div className="inline-block px-3 py-1 rounded bg-black/40 border border-[#5cff32]/40 text-[#5cff32] font-mono text-sm">
                    Награда: {result.reward}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-gray-400 italic"
                >
                  Пока ты не прыгнул — ты во всех измерениях одновременно.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
