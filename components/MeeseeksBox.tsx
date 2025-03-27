'use client';

import { useState, useEffect, useRef } from 'react';
import { FaTimesCircle, FaDollarSign, FaChartLine, FaWallet, FaRandom } from 'react-icons/fa';

type MeeseeksTask = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  difficulty: number; // От 1 до 5
  completionTime: number; // Время в секундах
  completionMessages: string[];
};

const MEESEEKS_TASKS: MeeseeksTask[] = [
  {
    id: 1,
    title: "Удвоить капитал",
    description: "Mr. Meeseeks попытается удвоить ваш капитал с помощью рискованных инвестиций.",
    icon: <FaDollarSign />,
    difficulty: 5,
    completionTime: 10,
    completionMessages: [
      "Я МИСТЕР МИСИКС, ПОСМОТРИТЕ НА МЕНЯ! Я удвоил ваши деньги, продав долговые обязательства вашей души!",
      "ПОСМОТРИТЕ НА МЕНЯ! Деньги удвоены! Не спрашивайте, какой галактике я их проиграл...",
      "О БОЖЕ, Я СМОГ! Я взломал финансовые системы трех миров для этого!"
    ]
  },
  {
    id: 2,
    title: "Проанализировать рынок",
    description: "Mr. Meeseeks проанализирует текущую ситуацию на рынке и даст совет.",
    icon: <FaChartLine />,
    difficulty: 3,
    completionTime: 5,
    completionMessages: [
      "ПОСМОТРИТЕ НА МЕНЯ! Анализ завершен! Продавайте все и бегите. БЕГИТЕ СЕЙЧАС ЖЕ!",
      "Я МИСТЕР МИСИКС! Рынок нестабилен, как мое существование! Скоро всё обвалится!",
      "МИСИКС ЗДЕСЬ! Рынок? Ха! Рик всё равно обманет вас, несмотря на все тренды!"
    ]
  },
  {
    id: 3,
    title: "Пополнить кошелек",
    description: "Mr. Meeseeks попытается пополнить ваш кошелек из случайных источников.",
    icon: <FaWallet />,
    difficulty: 4,
    completionTime: 7,
    completionMessages: [
      "ПОСМОТРИТЕ НА МЕНЯ! Я обчистил кошельки в трех измерениях для вас!",
      "Я МИСТЕР МИСИКС! Ваш кошелек теперь полон! Прошу, не спрашивайте откуда эти Flurbos...",
      "МИСИКС ВЫПОЛНИЛ ЗАДАНИЕ! Деньги в кошельке, а копы в соседнем измерении!"
    ]
  },
  {
    id: 4,
    title: "Случайная задача",
    description: "Mr. Meeseeks сделает... что-то. Даже он не знает, что именно.",
    icon: <FaRandom />,
    difficulty: 2,
    completionTime: 6,
    completionMessages: [
      "Я МИСТЕР МИСИКС! Я... не помню, что я сделал, но я точно что-то сделал!",
      "ПОСМОТРИТЕ НА МЕНЯ! Задача выполнена! Какая была задача? А, какая разница!",
      "МИСИКС СУЩЕСТВУЕТ В БОЛИ! Я сделал... что-то... пожалуйста, позвольте мне исчезнуть!"
    ]
  }
];

type MeeseeksBoxProps = {
  onTaskComplete?: (taskId: number, result: string) => void;
};

export default function MeeseeksBox({ onTaskComplete }: MeeseeksBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMeeseeks, setActiveMeeseeks] = useState<MeeseeksTask[]>([]);
  const [meeseeksCount, setMeeseeksCount] = useState(0);
  const [isBoxGlowing, setIsBoxGlowing] = useState(false);
  const [boxScale, setBoxScale] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const popAudioRef = useRef<HTMLAudioElement | null>(null);
  const completionAudioRef = useRef<HTMLAudioElement | null>(null);

  // Инициализация аудио эффектов при монтировании компонента
  useEffect(() => {
    audioRef.current = new Audio('/meeseeks/meeseeks_spawn.mp3');
    popAudioRef.current = new Audio('/meeseeks/meeseeks_pop.mp3');
    completionAudioRef.current = new Audio('/meeseeks/meeseeks_complete.mp3');
    
    return () => {
      if (audioRef.current) audioRef.current = null;
      if (popAudioRef.current) popAudioRef.current = null;
      if (completionAudioRef.current) completionAudioRef.current = null;
    };
  }, []);

  // Обработка завершения задач Mr. Meeseeks
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    activeMeeseeks.forEach((meeseeks) => {
      const timer = setTimeout(() => {
        // Выбираем случайное сообщение о завершении
        const message = meeseeks.completionMessages[
          Math.floor(Math.random() * meeseeks.completionMessages.length)
        ];
        
        // Уведомляем родительский компонент о завершении
        if (onTaskComplete) {
          onTaskComplete(meeseeks.id, message);
        }
        
        // Удаляем Meeseeks из активных
        setActiveMeeseeks(prev => prev.filter(m => m.id !== meeseeks.id));
        
        // Воспроизводим звук исчезновения
        if (popAudioRef.current) {
          popAudioRef.current.play().catch(e => console.error("Failed to play pop sound:", e));
        }
        
        if (completionAudioRef.current) {
          completionAudioRef.current.volume = 0.7;
          completionAudioRef.current.play().catch(e => console.error("Failed to play completion sound:", e));
        }
      }, meeseeks.completionTime * 1000);
      
      timers.push(timer);
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [activeMeeseeks, onTaskComplete]);

  // Анимация пульсации коробки каждые 5 секунд
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setIsBoxGlowing(true);
      setBoxScale(1.05);
      setTimeout(() => {
        setIsBoxGlowing(false);
        setBoxScale(1);
      }, 500);
    }, 5000);
    
    return () => clearInterval(pulseInterval);
  }, []);

  // Открытие коробки Mr. Meeseeks
  const toggleBox = () => {
    setIsOpen(!isOpen);
  };

  // Создание нового Mr. Meeseeks для выполнения задачи
  const spawnMeeseeks = (task: MeeseeksTask) => {
    // Проверяем, не выполняется ли уже такая задача
    if (activeMeeseeks.some(m => m.id === task.id)) {
      return;
    }
    
    // Увеличиваем счетчик Meeseeks
    setMeeseeksCount(prev => prev + 1);
    
    // Создаем нового Meeseeks с уникальным ID
    const newMeeseeks = { ...task, id: task.id + meeseeksCount * 100 };
    setActiveMeeseeks(prev => [...prev, newMeeseeks]);
    
    // Воспроизводим звук появления
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Failed to play spawn sound:", e));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Активные Mr. Meeseeks */}
      <div className="mb-4 flex flex-col gap-2">
        {activeMeeseeks.map((meeseeks) => (
          <div 
            key={meeseeks.id}
            className="bg-[#33B9E3] text-white p-3 rounded-lg flex items-center gap-2 animate-bounce-slow rickified-panel"
            style={{ 
              animation: `bounce-meeseeks ${0.5 + Math.random() * 0.5}s infinite alternate`,
              boxShadow: '0 0 15px rgba(51, 185, 227, 0.7)'
            }}
          >
            <div className="meeseeks-face w-10 h-10 bg-[#A2EAF8] rounded-full flex items-center justify-center relative">
              <div className="absolute w-8 h-8 bg-[#A2EAF8] rounded-full border-2 border-[#33B9E3] flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-1 h-1 bg-black rounded-full mb-1"></div>
                  <div className="w-3 h-1 bg-black rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">{meeseeks.title}</p>
              <div className="w-full bg-[#A2EAF8] h-1 rounded-full overflow-hidden">
                <div 
                  className="bg-[#5cff32] h-full rounded-full"
                  style={{ 
                    width: `${100 - (100 / meeseeks.completionTime) * meeseeks.completionTime}%`, 
                    transition: 'width linear',
                    animation: `meeseeks-progress ${meeseeks.completionTime}s linear forwards` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Панель с заданиями */}
      {isOpen && (
        <div className="mb-4 bg-[#220833] rounded-lg p-4 rickified-panel w-[280px] scan-lines">
          <div className="flex justify-between mb-4">
            <h3 className="text-[#5cff32] font-mono font-bold portal-glow">КОРОБКА МИСИКСОВ</h3>
            <button
              onClick={toggleBox}
              className="text-[#ff36ab] hover:text-white"
            >
              <FaTimesCircle />
            </button>
          </div>
          
          <p className="text-white text-sm mb-4">
            Нажмите на задачу, чтобы вызвать Mr. Meeseeks. Помните: существование для них боль!
          </p>
          
          <div className="space-y-2">
            {MEESEEKS_TASKS.map((task) => (
              <button
                key={task.id}
                onClick={() => spawnMeeseeks(task)}
                className="w-full bg-[#1a0b26] hover:bg-[#33B9E3] text-left p-3 rounded-lg transition-colors group"
                disabled={activeMeeseeks.some(m => m.id === task.id)}
              >
                <div className="flex items-center gap-2">
                  <div className="text-[#33B9E3] group-hover:text-white transition-colors">
                    {task.icon}
                  </div>
                  <div>
                    <p className="text-white font-medium">{task.title}</p>
                    <p className="text-gray-400 text-xs">{task.description}</p>
                  </div>
                </div>
                <div className="mt-1 flex items-center">
                  <span className="text-xs text-gray-400 mr-2">Сложность:</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full mr-1 ${
                          i < task.difficulty ? 'bg-[#33B9E3]' : 'bg-gray-600'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Кнопка коробки Mr. Meeseeks */}
      <button
        onClick={toggleBox}
        className={`w-16 h-16 bg-[#33B9E3] rounded-lg flex items-center justify-center transition-all transform hover:rotate-6 ${
          isBoxGlowing ? 'box-shadow-pulse' : ''
        }`}
        style={{ 
          transform: `scale(${boxScale})`,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          boxShadow: isBoxGlowing 
            ? '0 0 15px 5px rgba(51, 185, 227, 0.8), 0 0 30px 10px rgba(51, 185, 227, 0.5)' 
            : '0 0 10px rgba(51, 185, 227, 0.7)'
        }}
      >
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center animate-pulse opacity-70">
            <span className="text-white font-bold text-xl">PRESS</span>
          </div>
          <img src="/meeseeks/meeseeks_box.png" alt="Mr. Meeseeks Box" className="w-12 h-12" />
        </div>
      </button>
      
      {/* Стили */}
      <style jsx>{`
        @keyframes bounce-meeseeks {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes meeseeks-progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        
        .box-shadow-pulse {
          animation: box-shadow-pulse 1s ease-in-out;
        }
        
        @keyframes box-shadow-pulse {
          0% {
            box-shadow: 0 0 10px rgba(51, 185, 227, 0.7);
          }
          50% {
            box-shadow: 0 0 20px 10px rgba(51, 185, 227, 0.8), 0 0 40px 20px rgba(51, 185, 227, 0.5);
          }
          100% {
            box-shadow: 0 0 10px rgba(51, 185, 227, 0.7);
          }
        }
      `}</style>
    </div>
  );
} 