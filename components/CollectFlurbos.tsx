'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface CollectFlurbosProps {
  onScoreChange?: (score: number) => void;
  duration?: number; // продолжительность игры в секундах
  difficulty?: 'easy' | 'medium' | 'hard';
}

interface Flurbo {
  id: number;
  x: number;
  y: number;
  rotation: number;
  size: number;
  speed: number;
  value: number;
  type: 'normal' | 'rare' | 'cursed';
}

export default function CollectFlurbos({
  onScoreChange,
  duration = 30,
  difficulty = 'medium'
}: CollectFlurbosProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [highScore, setHighScore] = useState(0);
  const [flurbos, setFlurbos] = useState<Flurbo[]>([]);
  const [rickMessage, setRickMessage] = useState('');
  const [showIntro, setShowIntro] = useState(true);
  const [playerPosition, setPlayerPosition] = useState({ x: 50 });
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const lastFlurboTime = useRef<number>(0);
  
  // Настройки сложности
  const difficultySettings = {
    easy: { spawnRate: 800, maxFlurbos: 8, playerSpeed: 12 },
    medium: { spawnRate: 600, maxFlurbos: 12, playerSpeed: 10 },
    hard: { spawnRate: 400, maxFlurbos: 15, playerSpeed: 8 }
  };
  
  const settings = difficultySettings[difficulty];
  
  // Загрузка рекорда из localStorage при монтировании
  useEffect(() => {
    const savedHighScore = localStorage.getItem('flurbosGameHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);
  
  // Сохранение рекорда в localStorage при его изменении
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('flurbosGameHighScore', score.toString());
    }
  }, [score, highScore]);
  
  // Обработка клавиш для движения
  useEffect(() => {
    if (!isPlaying) return;
    
    const keys: { [key: string]: boolean } = {};
    
    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key] = true;
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key] = false;
    };
    
    const movePlayer = () => {
      if (!gameAreaRef.current || !playerRef.current) return;
      
      const gameWidth = gameAreaRef.current.offsetWidth;
      const playerWidth = playerRef.current.offsetWidth;
      
      if (keys['ArrowLeft'] || keys['a']) {
        setPlayerPosition(prev => ({
          x: Math.max(0, prev.x - settings.playerSpeed)
        }));
      }
      
      if (keys['ArrowRight'] || keys['d']) {
        setPlayerPosition(prev => ({
          x: Math.min(gameWidth - playerWidth, prev.x + settings.playerSpeed)
        }));
      }
      
      frameRef.current = requestAnimationFrame(movePlayer);
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    frameRef.current = requestAnimationFrame(movePlayer);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(frameRef.current);
    };
  }, [isPlaying, settings.playerSpeed]);
  
  // Обработка касаний для мобильного управления
  useEffect(() => {
    if (!isPlaying || !gameAreaRef.current) return;
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!gameAreaRef.current || !playerRef.current) return;
      
      const touch = e.touches[0];
      const gameRect = gameAreaRef.current.getBoundingClientRect();
      const playerWidth = playerRef.current.offsetWidth;
      const touchX = touch.clientX - gameRect.left;
      
      // Устанавливаем позицию игрока, учитывая границы игрового поля
      setPlayerPosition({
        x: Math.max(0, Math.min(gameRect.width - playerWidth, touchX - playerWidth / 2))
      });
    };
    
    gameAreaRef.current.addEventListener('touchmove', handleTouchMove);
    
    return () => {
      if (gameAreaRef.current) {
        gameAreaRef.current.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [isPlaying]);
  
  // Таймер игры
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isPlaying) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(timer);
  }, [isPlaying]);
  
  // Игровой цикл
  useEffect(() => {
    if (!isPlaying) return;
    
    let animationId: number;
    let lastTime = 0;
    
    const gameLoop = (timestamp: number) => {
      if (!gameAreaRef.current || !playerRef.current) {
        animationId = requestAnimationFrame(gameLoop);
        return;
      }
      
      // Создаем новые Flurbos
      if (timestamp - lastFlurboTime.current > settings.spawnRate && flurbos.length < settings.maxFlurbos) {
        if (Math.random() < 0.7) { // 70% шанс создания нового Flurbo
          createFlurbo();
          lastFlurboTime.current = timestamp;
        }
      }
      
      // Обновляем позиции Flurbos и проверяем столкновения
      updateFlurbosAndCheckCollisions();
      
      animationId = requestAnimationFrame(gameLoop);
    };
    
    animationId = requestAnimationFrame(gameLoop);
    
    return () => cancelAnimationFrame(animationId);
  }, [isPlaying, flurbos]);
  
  // Создание нового Flurbo
  const createFlurbo = () => {
    if (!gameAreaRef.current) return;
    
    const gameWidth = gameAreaRef.current.offsetWidth;
    const flurboSize = Math.floor(Math.random() * 15) + 25; // от 25 до 40px
    
    // Определяем тип Flurbo
    let type: 'normal' | 'rare' | 'cursed';
    const rand = Math.random();
    if (rand < 0.1) {
      type = 'cursed'; // 10% шанс проклятой монеты
    } else if (rand < 0.3) {
      type = 'rare'; // 20% шанс редкой монеты
    } else {
      type = 'normal'; // 70% обычная монета
    }
    
    // Определяем стоимость Flurbo
    const value = type === 'normal' ? 1 : type === 'rare' ? 5 : -3;
    
    // Создаем новый Flurbo
    const newFlurbo: Flurbo = {
      id: Date.now() + Math.random(),
      x: Math.random() * (gameWidth - flurboSize),
      y: -flurboSize,
      rotation: Math.random() * 360,
      size: flurboSize,
      speed: Math.random() * 2 + (difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3),
      value,
      type
    };
    
    setFlurbos(prev => [...prev, newFlurbo]);
  };
  
  // Обновление позиций Flurbos и проверка столкновений
  const updateFlurbosAndCheckCollisions = () => {
    if (!gameAreaRef.current || !playerRef.current) return;
    
    const gameHeight = gameAreaRef.current.offsetHeight;
    const playerRect = playerRef.current.getBoundingClientRect();
    const gameRect = gameAreaRef.current.getBoundingClientRect();
    
    setFlurbos(prev => {
      const updatedFlurbos = prev.map(flurbo => {
        // Обновляем позицию
        const newY = flurbo.y + flurbo.speed;
        const newRotation = flurbo.rotation + flurbo.speed * 2;
        
        // Проверяем столкновение с игроком
        const flurboRect = {
          left: flurbo.x + gameRect.left,
          right: flurbo.x + flurbo.size + gameRect.left,
          top: flurbo.y + gameRect.top,
          bottom: flurbo.y + flurbo.size + gameRect.top
        };
        
        const collision = 
          flurboRect.right >= playerRect.left &&
          flurboRect.left <= playerRect.right &&
          flurboRect.bottom >= playerRect.top &&
          flurboRect.top <= playerRect.bottom;
        
        if (collision) {
          // Обновляем счет
          setScore(prevScore => {
            const newScore = Math.max(0, prevScore + flurbo.value);
            if (onScoreChange) onScoreChange(newScore);
            
            // Показываем сообщение в зависимости от типа Flurbo
            if (flurbo.type === 'cursed') {
              setRickMessage('*бурп* Ха! Ты подобрал проклятую монету, идиот!');
            } else if (flurbo.type === 'rare' && Math.random() < 0.5) {
              setRickMessage('Редкая монета! Может, ты не такой уж и бесполезный!');
            }
            
            if (Math.random() < 0.2) {
              setTimeout(() => setRickMessage(''), 1500);
            }
            
            return newScore;
          });
          
          // Удаляем Flurbo при столкновении
          return null;
        }
        
        // Удаляем Flurbo, если он вышел за пределы экрана
        if (newY > gameHeight) {
          return null;
        }
        
        // Возвращаем обновленный Flurbo
        return {
          ...flurbo,
          y: newY,
          rotation: newRotation
        };
      }).filter(Boolean) as Flurbo[];
      
      return updatedFlurbos;
    });
  };
  
  // Начало игры
  const startGame = () => {
    setScore(0);
    setTimeLeft(duration);
    setFlurbos([]);
    setIsPlaying(true);
    setShowIntro(false);
    lastFlurboTime.current = 0;
    
    // Центрируем игрока
    if (gameAreaRef.current && playerRef.current) {
      const gameWidth = gameAreaRef.current.offsetWidth;
      const playerWidth = playerRef.current.offsetWidth;
      setPlayerPosition({ x: (gameWidth - playerWidth) / 2 });
    }
    
    setRickMessage('Собирай Flurbos, *бурп* но избегай проклятых монет!');
    setTimeout(() => setRickMessage(''), 2500);
  };
  
  // Завершение игры
  const endGame = () => {
    setIsPlaying(false);
    if (score > highScore) {
      setRickMessage('Ух ты, ты побил рекорд. Я даже немного впечатлен... совсем чуть-чуть.');
    } else if (score < 5) {
      setRickMessage('Жалкий результат! Моя внучка Саммер и то лучше играет!');
    } else {
      setRickMessage('Неплохо... для человека без квантовой интуиции.');
    }
  };
  
  // Случайные саркастические комментарии Рика
  const rickComments = [
    "В моем гараже и то больше порядка, чем в твоих движениях.",
    "Твои рефлексы как у парализованной улитки, Морти!",
    "Вселенная полна невероятных возможностей, а ты тратишь время на сбор виртуальных монет.",
    "*бурп* Эта игра глупее, чем попытка научить Джерри квантовой физике.",
    "Мне кажется, или ты действительно так медленно двигаешься?",
    "Я бы тебя взял на задание в C-137, но боюсь, ты там не выживешь и секунды.",
    "Хорошо, что это не настоящие Flurbos, иначе ты бы разорил межгалактическую экономику своей неуклюжестью.",
    "Даже Птичья Личность играет лучше тебя, а у него нет пальцев!"
  ];
  
  return (
    <div className="w-full max-w-2xl mx-auto rickified-panel rounded-lg overflow-hidden">
      {/* Заголовок игры */}
      <div className="bg-[#220833] p-4 flex justify-between items-center border-b border-[#5cff32]">
        <h3 className="text-2xl font-bold text-[#5cff32] portal-glow">Собери Flurbos</h3>
        <div className="flex items-center space-x-4">
          <div className="text-sm">
            <span className="text-gray-400">Рекорд:</span>
            <span className="text-[#ff36ab] ml-1 font-bold">{highScore}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-400">Счёт:</span>
            <span className="text-[#5cff32] ml-1 font-bold">{score}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-400">Время:</span>
            <span className="text-[#36c5f4] ml-1 font-bold">{timeLeft}с</span>
          </div>
        </div>
      </div>
      
      {/* Игровая область */}
      <div 
        ref={gameAreaRef}
        className="relative bg-[#1d111f] w-full h-[350px] overflow-hidden touch-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(34,8,51,0.6) 0%, rgba(29,17,31,1) 70%)',
          backgroundSize: '400% 400%',
          animation: isPlaying ? 'gradient-shift 10s ease infinite' : 'none'
        }}
      >
        {/* Интро экран */}
        {showIntro && !isPlaying && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#1d111f] bg-opacity-95 z-10">
            <h4 className="text-xl font-bold text-[#5cff32] mb-4">
              Финансовая школа Рика Санчеза
            </h4>
            <p className="text-white mb-4">
              Собирай Flurbos, падающие из межпространственного портала! Используй стрелки влево/вправо или клавиши A/D для управления.
            </p>
            <p className="text-white mb-6">
              <span className="text-[#5cff32] font-bold">Зеленые</span> монеты: +1 Flurbo<br/>
              <span className="text-[#ffd700] font-bold">Золотые</span> монеты: +5 Flurbos<br/>
              <span className="text-[#ff0000] font-bold">Проклятые</span> монеты: -3 Flurbos
            </p>
            <div className="text-sm text-gray-400 mb-6">
              <p>Сложность: {
                difficulty === 'easy' ? 'Лёгкая (для Джерри)' :
                difficulty === 'medium' ? 'Средняя (для обычного человека)' :
                'Сложная (даже для Рика)'
              }</p>
            </div>
            <button 
              onClick={startGame}
              className="neon-btn-green relative group overflow-hidden"
            >
              <span className="neon-btn-text">Начать финансовый хаос</span>
              <span className="neon-btn-glitch"></span>
              <span className="neon-btn-blink"></span>
            </button>
          </div>
        )}
        
        {/* Экран завершения игры */}
        {!isPlaying && !showIntro && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#1d111f] bg-opacity-95 z-10">
            <h4 className="text-xl font-bold text-[#ff36ab] mb-4">
              Игра окончена!
            </h4>
            <p className="text-white mb-2">
              Ты собрал <span className="text-[#5cff32] font-bold">{score}</span> Flurbos
            </p>
            <p className="text-gray-400 text-sm mb-6">
              {score > highScore ? 'Новый рекорд!' : `Рекорд: ${highScore}`}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={startGame}
                className="neon-btn-green relative group overflow-hidden"
              >
                <span className="neon-btn-text">Играть снова</span>
                <span className="neon-btn-glitch"></span>
                <span className="neon-btn-blink"></span>
              </button>
              
              <button 
                onClick={() => setShowIntro(true)}
                className="neon-btn-pink relative group overflow-hidden"
              >
                <span className="neon-btn-text">Изменить сложность</span>
                <span className="neon-btn-glitch"></span>
                <span className="neon-btn-blink"></span>
              </button>
            </div>
          </div>
        )}
        
        {/* Игрок (баночка Рика) */}
        {isPlaying && (
          <div 
            ref={playerRef}
            className="absolute bottom-0 transition-transform"
            style={{
              left: `${playerPosition.x}px`,
              width: '60px',
              height: '60px',
            }}
          >
            <div className="w-full h-full">
              <Image 
                src="/pickle-rick.svg" 
                alt="Баночка Рика"
                width={60}
                height={60}
                className="rickified"
              />
            </div>
          </div>
        )}
        
        {/* Flurbos */}
        {isPlaying && flurbos.map(flurbo => (
          <div 
            key={flurbo.id}
            className="absolute transition-transform"
            style={{
              left: `${flurbo.x}px`,
              top: `${flurbo.y}px`,
              width: `${flurbo.size}px`,
              height: `${flurbo.size}px`,
              transform: `rotate(${flurbo.rotation}deg)`,
            }}
          >
            <div className="w-full h-full">
              <div 
                className={`w-full h-full rounded-full flex items-center justify-center 
                  ${flurbo.type === 'normal' ? 'bg-[#5cff32]' : 
                    flurbo.type === 'rare' ? 'bg-[#ffd700]' : 'bg-[#ff0000]'} 
                  ${flurbo.type === 'rare' ? 'animate-pulse' : ''}
                  ${flurbo.type === 'cursed' ? 'animate-pulse-fast' : ''}`}
              >
                <span className="text-xs font-bold text-black">
                  {flurbo.type === 'normal' ? '$' : 
                   flurbo.type === 'rare' ? '$$' : '!'}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {/* Комментарий Рика */}
        {rickMessage && (
          <div className="absolute bottom-16 left-0 right-0 mx-auto text-center">
            <div className="inline-block bg-[#220833] px-4 py-2 rounded-lg rickified-panel max-w-md">
              <p className="text-white font-mono text-sm">
                <span className="text-[#5cff32] font-bold">Рик:</span> {rickMessage}
              </p>
            </div>
          </div>
        )}
        
        {/* Мобильные подсказки */}
        {isPlaying && (
          <div className="absolute bottom-16 left-4 right-4 flex justify-between sm:hidden">
            <div className="bg-[#220833] bg-opacity-50 p-2 rounded-lg">
              <p className="text-white text-xs">← Влево</p>
            </div>
            <div className="bg-[#220833] bg-opacity-50 p-2 rounded-lg">
              <p className="text-white text-xs">Вправо →</p>
            </div>
          </div>
        )}
        
        {/* Порталы в фоне */}
        {isPlaying && Array.from({ length: 3 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gradient-radial from-[#5cff32] to-transparent opacity-20"
            style={{
              width: `${40 + Math.random() * 60}px`,
              height: `${40 + Math.random() * 60}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animation: `pulse ${3 + Math.random() * 4}s infinite`,
              animationDelay: `${Math.random() * -5}s`,
            }}
          />
        ))}
      </div>
      
      {/* Инструкции и информация об игре */}
      <div className="p-4 bg-[#1d111f] text-sm text-gray-400 border-t border-[#361052]">
        <div className="flex flex-wrap justify-between">
          <p className="mb-1 sm:mb-0">Используй ← → или A D для управления</p>
          <p className="mb-1 sm:mb-0">На мобильном: касайся экрана для перемещения</p>
          <p>© РПИ БАНК | Финансовое приключение</p>
        </div>
      </div>
    </div>
  );
} 