import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Продолжать обработку запроса, если он к API или статическим файлам
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.includes('.') // Это для статических файлов с расширениями
  ) {
    return NextResponse.next();
  }

  // Предотвращение 404 для всех других запросов
  const url = request.nextUrl.clone();
  
  // Проверка, существует ли запрошенный путь
  if (
    ![
      '/',
      '/about',
      '/faq',
      '/exchange',
      '/token'
    ].includes(url.pathname)
  ) {
    // Перенаправляем неизвестные пути на главную страницу
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

// Настройка, чтобы middleware запускался только для опредленных путей
export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico).*)'],
}; 