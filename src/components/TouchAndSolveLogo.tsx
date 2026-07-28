import React from 'react';
import logoImg from '../assets/logo.png';

interface LogoProps {
  className?: string;
  isCollapsed?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export const TouchAndSolveLogo: React.FC<LogoProps> = ({ className = '', isCollapsed = false, onClick }) => {
  if (isCollapsed) {
    return (
      <a 
        href="/" 
        onClick={onClick}
        className={`flex items-center justify-center ${className}`}
        title="Go to Dashboard"
      >
        <img src={logoImg} alt="Touch & Solve Logo" className="w-10 h-10 object-contain" />
      </a>
    );
  }

  return (
    <a 
      href="/" 
      onClick={onClick}
      className={`flex items-center gap-3 hover:opacity-90 transition-opacity ${className}`}
      title="Go to Dashboard"
    >
      <img src={logoImg} alt="Touch & Solve Logo" className="w-9 h-9 shrink-0 object-contain" />

      {/* Brand Text */}
      <div className="flex flex-col">
        <span className="font-manrope font-extrabold text-[#FFFFFF] text-lg tracking-tight leading-none">
          Touch & Solve
        </span>
        <span className="text-[7.5px] text-[#A5B4FC] font-semibold tracking-[0.16em] uppercase mt-1 leading-none whitespace-nowrap">
          WE SOLVE JUST IN TOUCH
        </span>
      </div>
    </a>
  );
};

