import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div 
      onClick={onClick}
      className={`bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
