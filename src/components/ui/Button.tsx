import { type ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "outline";
  className?: string;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
}

export const Button = ({ 
  children, 
  onClick, 
  variant = "primary", 
  className = "", 
  type = "button",
  size = "md"
}: ButtonProps) => {
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    danger: "bg-rose-50 text-rose-600 hover:bg-rose-100",
    outline: "border border-slate-300 text-slate-600 hover:bg-slate-50"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button 
      type={type}
      onClick={onClick}
      className={`rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};
