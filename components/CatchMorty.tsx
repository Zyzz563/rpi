'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface CatchMortyProps {
  onScoreChange?: (score: number) => void;
  duration?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export default function CatchMorty({ 
  onScoreChange, 
  duration = 30, 
  difficulty = 'medium' 
}: CatchMortyProps) {
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [highScore, setHighScore] = useState(0);
  const [mortyPosition, setMortyPosition] = useState({ x: 50, y: 50 });
  const [rickMessage, setRickMessage] = useState('');
  const [showIntro, setShowIntro] = useState(true);
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  
  const mortySize = { width: 50, height: 50 };
  
  const difficultySpeeds = {
    easy: 1500,
    medium: 1000,
    hard: 600
  };
  
  const rickMessages = [
    "М-м-морти убегает, *burp* от тебя!",
    "Давай, умник, п-поймай Морти!",
    "Ты такой же медленный, как Джерри, Морти!",
    "Морти! Т-т-ты должен быть быстрее, Морти!",
    "Ты никогда не поймаешь его с такими навыками!",
    "Вау, это было нев-в-вероятно медленно!"
  ];

  // Загрузка высокого счета
  useEffect(() => {
    const savedHighScore = localStorage.getItem('catchMortyHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  // Сохранение высокого счета
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('catchMortyHighScore', score.toString());
    }
  }, [score, highScore]);

  // Управление таймером игры
  useEffect(() => {
    if (!gameActive) return;
    
    if (timeLeft <= 0) {
      endGame();
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [gameActive, timeLeft]);

  // Перемещение Морти
  useEffect(() => {
    if (!gameActive) return;
    
    const moveMorty = () => {
      if (!gameAreaRef.current) return;
      
      const gameArea = gameAreaRef.current.getBoundingClientRect();
      const maxX = gameArea.width - mortySize.width;
      const maxY = gameArea.height - mortySize.height;
      
      const newX = Math.floor(Math.random() * maxX);
      const newY = Math.floor(Math.random() * maxY);
      
      setMortyPosition({ x: newX, y: newY });
    };
    
    const interval = setInterval(moveMorty, difficultySpeeds[difficulty]);
    return () => clearInterval(interval);
  }, [gameActive, difficulty]);

  // Начало игры
  const startGame = () => {
    setScore(0);
    setTimeLeft(duration);
    setGameActive(true);
    setShowIntro(false);
    setRickMessage('');
  };

  // Завершение игры
  const endGame = () => {
    setGameActive(false);
    if (onScoreChange) {
      onScoreChange(score);
    }
    
    if (score > highScore) {
      setRickMessage("Н-н-не плохо, но всё равно ты лузер!");
    } else if (score === 0) {
      setRickMessage("Вау, п-просто вау. Нулевой счёт? Серьёзно?");
    } else {
      setRickMessage("Игра окончена, как и твоя бесполезная жизнь!");
    }
  };

  // Нажатие на Морти
  const catchMorty = () => {
    if (!gameActive) return;
    
    setScore(prev => prev + 1);
    if (onScoreChange) {
      onScoreChange(score + 1);
    }
    
    // 30% шанс, что Рик скажет что-то саркастическое
    if (Math.random() < 0.3) {
      const randomIndex = Math.floor(Math.random() * rickMessages.length);
      setRickMessage(rickMessages[randomIndex]);
      
      setTimeout(() => {
        setRickMessage('');
      }, 2000);
    }
  };

  return (
    <div className="relative w-full h-64 overflow-hidden bg-gradient-to-r from-emerald-800 to-emerald-600 rounded-xl shadow-inner p-4">
      <div className="absolute top-2 left-2 text-white space-y-1">
        <div className="text-xs opacity-70">Счёт: <span className="font-bold text-yellow-300">{score}</span></div>
        <div className="text-xs opacity-70">Рекорд: <span className="font-bold text-yellow-300">{highScore}</span></div>
        <div className="text-xs opacity-70">
          Время: <span className={`font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-yellow-300'}`}>{timeLeft}с</span>
        </div>
      </div>
      
      {showIntro || !gameActive ? (
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <h3 className="text-lg font-bold text-white mb-2">Поймай Морти!</h3>
          {!gameActive && score > 0 && (
            <p className="text-white text-sm mb-4">Итоговый счёт: {score}</p>
          )}
          <button 
            onClick={startGame}
            className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-md text-sm font-semibold transition-all"
          >
            {score > 0 ? 'Играть снова' : 'Начать игру'}
          </button>
        </div>
      ) : (
        <div 
          ref={gameAreaRef}
          className="relative w-full h-full"
        >
          <div 
            className="absolute cursor-pointer transform active:scale-90 transition-transform"
            style={{
              left: `${mortyPosition.x}px`,
              top: `${mortyPosition.y}px`,
              transition: 'top 0.2s, left 0.2s'
            }}
            onClick={catchMorty}
          >
            <Image 
              src="/morty.svg"
              alt="Морти"
              width={mortySize.width}
              height={mortySize.height}
              className="pixelated"
            />
          </div>
        </div>
      )}
      
      {rickMessage && (
        <div className="absolute bottom-2 right-2 max-w-[70%] bg-yellow-100 p-2 rounded-lg text-xs font-bold">
          {rickMessage}
        </div>
      )}
    </div>
  );
} 