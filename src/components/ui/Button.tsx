import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'lime' | 'neon-pulse' | 'outline' | 'ghost' | 'zinc' | 'ocean' | 'cyan';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'lime', size = 'md', icon, children, ...props }, ref) => {
    const sizeStyles = {
      sm: 'px-3.5 py-1.5 text-xs rounded-full gap-1.5',
      md: 'px-5 py-2.5 text-sm rounded-full gap-2',
      lg: 'px-7 py-3.5 text-base rounded-full gap-2.5 font-semibold',
    };

    const variantStyles = {
      lime: 'bg-lime-400 text-black font-bold hover:bg-lime-300 hover:shadow-lime-glow active:scale-[0.98] transition-all duration-200 border border-lime-300',
      'neon-pulse':
        'relative bg-lime-400 text-black font-bold shadow-lime-glow hover:shadow-lime-glow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-lime-300 neon-pulse-glow',
      outline:
        'bg-white/[0.04] text-zinc-200 border border-white/20 hover:border-lime-400/60 hover:text-lime-400 hover:bg-lime-400/[0.05] active:scale-[0.98] transition-all duration-200 backdrop-blur-md',
      ghost:
        'bg-transparent text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors',
      zinc: 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700 transition-colors',
      ocean:
        'bg-sky-500/10 text-sky-300 border border-sky-400/30 hover:bg-sky-500/20 hover:border-sky-400 hover:text-white transition-all',
      // Unified alias: any legacy cyan requests match the primary neon lime
      cyan: 'bg-lime-400 text-black font-bold hover:bg-lime-300 hover:shadow-lime-glow active:scale-[0.98] transition-all duration-200 border border-lime-300',
    };

    return (
      <button
        ref={ref}
        className={twMerge(
          clsx(
            'inline-flex items-center justify-center cursor-pointer select-none font-sans outline-none focus-visible:ring-2 focus-visible:ring-lime-400 disabled:opacity-50 disabled:pointer-events-none',
            sizeStyles[size],
            variantStyles[variant],
            className
          )
        )}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
