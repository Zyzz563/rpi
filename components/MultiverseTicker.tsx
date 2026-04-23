'use client';

import { useEffect, useMemo, useState } from 'react';

interface TickerItem {
  symbol: string;
  dimension: string;
  price: number;
  change: number;
}

const DIMENSIONS = [
  'C-137',
  'C-132',
  'J-19ζ7',
  '35-C',
  'N-322',
  'K-83',
  'D-99',
  'Cronenberg',
  'Froopyland',
  'Огуречное',
  'Совет Риков',
];

const TOKENS = [
  { symbol: 'РПИ', base: 6.66 },
  { symbol: 'FLURBO', base: 4.2 },
  { symbol: 'SCHMECKLE', base: 148 },
  { symbol: 'BLEMFLARCK', base: 0.42 },
  { symbol: 'PLUMBUS', base: 999.99 },
  { symbol: 'BRAPPLE', base: 13.37 },
  { symbol: 'MEESEEKS', base: 1.0 },
  { symbol: 'GAZORP', base: 77.77 },
  { symbol: 'GROMFLOMITE', base: 31.41 },
  { symbol: 'PORTAL-FLUID', base: 420.69 },
  { symbol: 'MORTY-CLONE', base: 0.01 },
  { symbol: 'WUBBA', base: 88.8 },
];

function makeItems(): TickerItem[] {
  return TOKENS.map((token, idx) => {
    const jitter = (Math.random() - 0.5) * 0.2;
    const price = Math.max(0.0001, token.base * (1 + jitter));
    const change = (Math.random() - 0.4) * 30;
    return {
      symbol: token.symbol,
      dimension: DIMENSIONS[idx % DIMENSIONS.length],
      price,
      change,
    };
  });
}

function formatPrice(p: number): string {
  if (p >= 100) return p.toFixed(2);
  if (p >= 1) return p.toFixed(3);
  return p.toFixed(5);
}

export default function MultiverseTicker() {
  const [items, setItems] = useState<TickerItem[]>([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setItems(makeItems());
    const interval = setInterval(() => {
      setItems((prev) =>
        prev.map((it) => {
          const delta = (Math.random() - 0.5) * 0.04;
          const newPrice = Math.max(0.0001, it.price * (1 + delta));
          const newChange = it.change + (Math.random() - 0.5) * 1.5;
          return { ...it, price: newPrice, change: newChange };
        }),
      );
      setTick((t) => t + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Duplicate items so the marquee loops seamlessly
  const looped = useMemo(() => [...items, ...items], [items]);

  if (items.length === 0) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#5cff32]/40 bg-[#1d111f]/95 backdrop-blur-sm shadow-[0_-8px_24px_rgba(92,255,50,0.15)]"
      aria-label="Мультивселенский тикер цен"
    >
      <div className="flex items-center">
        <div className="hidden md:flex items-center gap-2 px-4 py-2 border-r border-[#5cff32]/40 bg-[#220833] text-[#5cff32] font-mono text-xs uppercase tracking-widest whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-[#5cff32] animate-pulse" />
          Live · Мультивселенная
        </div>
        <div className="flex-1 overflow-hidden relative">
          <div className="flex whitespace-nowrap animate-multiverse-ticker will-change-transform">
            {looped.map((it, i) => {
              const up = it.change >= 0;
              return (
                <span
                  key={`${it.symbol}-${i}-${tick % 2}`}
                  className="inline-flex items-center gap-2 px-6 py-2 font-mono text-sm"
                >
                  <span className="text-[#36c5f4] text-xs uppercase">
                    [{it.dimension}]
                  </span>
                  <span className="text-white font-semibold tracking-wide">
                    {it.symbol}
                  </span>
                  <span className="text-[#5cff32]">
                    ${formatPrice(it.price)}
                  </span>
                  <span
                    className={`text-xs font-bold ${up ? 'text-[#5cff32]' : 'text-[#ff36ab]'}`}
                  >
                    {up ? '▲' : '▼'} {Math.abs(it.change).toFixed(2)}%
                  </span>
                  <span className="text-[#361052]">·</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
