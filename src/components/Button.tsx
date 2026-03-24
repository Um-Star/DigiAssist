import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick, 
  type = 'button', 
  fullWidth = false,
  disabled = false
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-bold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-background-dark active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none disabled:active:scale-100 shadow-sm";
  
  const variants = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500",
    secondary: "bg-slate-200 hover:bg-slate-300 text-slate-900 border border-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 dark:text-white focus:ring-slate-500",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    outline: "border-2 border-primary-600 text-primary-700 bg-primary-50 hover:bg-primary-100 dark:border-primary-500 dark:text-primary-400 dark:bg-primary-900/20 dark:hover:bg-primary-900/40 focus:ring-primary-500"
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${widthStyle} px-6 py-4 text-lg ${className}`}
    >
      {children}
    </button>
  );
}
