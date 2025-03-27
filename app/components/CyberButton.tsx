import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface CyberButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export function CyberButton({
  children,
  href,
  className,
  onClick,
  variant = 'primary',
}: CyberButtonProps) {
  const buttonClass = cn(
    'cyber-button relative inline-block font-mono font-bold text-sm tracking-wide py-3 px-6',
    'uppercase border-0 hover:text-white transition-colors duration-200',
    {
      'bg-kip-green text-black hover:bg-kip-green-dark': variant === 'primary',
      'bg-black bg-opacity-50 text-kip-green border border-kip-green': variant === 'secondary',
    },
    className
  );

  const content = (
    <>
      {children}
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={buttonClass}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClass}>
      {content}
    </button>
  );
} 