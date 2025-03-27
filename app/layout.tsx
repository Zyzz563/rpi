import './globals.css'
import { Inter } from 'next/font/google'
import RickNavbar from '../components/RickNavbar'

// Заменяем Inter на пустышку, т.к. мы используем Google Fonts в globals.css
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata = {
  title: 'РПИ БАНК - Финансовое ЗЛО из измерения C-137',
  description: 'Межпространственная финансовая система, создания злейшего гения мультивселенной',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#220833" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={inter.className}>
        <RickNavbar />
        {children}
        
        {/* Глобальная анимация портального фона */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
          <div className="absolute w-full h-full bg-[#1d111f] opacity-90"></div>
          
          {/* Сетка заднего фона */}
          <div className="absolute inset-0 bg-portal-grid opacity-10"></div>
          
          {/* Пульсирующий центральный портал */}
          <div 
            className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-[#220833] to-transparent -translate-x-1/2 -translate-y-1/2 opacity-30"
            style={{animation: 'pulse 20s infinite'}}
          ></div>
          
          {/* Вихрь портала */}
          <div 
            className="absolute top-1/2 left-1/2 w-[600px] h-[600px] border-4 border-[#5cff32] border-dashed rounded-full -translate-x-1/2 -translate-y-1/2 opacity-10"
            style={{animation: 'spin-slow 30s linear infinite'}}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 w-[400px] h-[400px] border-2 border-[#ff36ab] border-dashed rounded-full -translate-x-1/2 -translate-y-1/2 opacity-10"
            style={{animation: 'spin-slow 20s linear infinite reverse'}}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 w-[200px] h-[200px] border border-[#36c5f4] border-dashed rounded-full -translate-x-1/2 -translate-y-1/2 opacity-10"
            style={{animation: 'spin-slow 10s linear infinite'}}
          ></div>
          
          {/* Плавающие формулы */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute font-mono text-[#5cff32] opacity-5"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 1.5 + 0.5}rem`,
                animation: `float ${10 + Math.random() * 20}s linear infinite`,
                animationDelay: `${Math.random() * -30}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            >
              {['C₂H₆O', 'H₂O', 'CO₂', 'E=mc²', '∞', '∑', '∫', '∇', 'φ', 'λ', '∂/∂x', 'Ψ'][Math.floor(Math.random() * 12)]}
            </div>
          ))}
        </div>
      </body>
    </html>
  )
}
