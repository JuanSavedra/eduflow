import React, { type ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "outline";
  className?: string;
}

export const Button = ({ children, onClick, variant = "primary", className = "" }: ButtonProps) => {
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    danger: "bg-rose-50 text-rose-600 hover:bg-rose-100",
    outline: "border border-slate-300 text-slate-600 hover:bg-slate-50"
  };
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
