import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'lime' | 'zinc' | 'outline' | 'amber' | 'cyan';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'zinc',
  dot = false,
  children,
  ...props
}) => {
  const variantStyles = {
    lime: 'bg-lime-400/10 text-lime-400 border-lime-400/30 shadow-[0_0_12px_rgba(204,255,0,0.15)]',
    zinc: 'bg-zinc-800/80 text-zinc-300 border-zinc-700/60',
    outline: 'bg-transparent text-zinc-400 border-white/15',
    amber: 'bg-amber-400/10 text-amber-300 border-amber-400/30 shadow-[0_0_12px_rgba(251,191,36,0.15)]',
    cyan: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/30 shadow-[0_0_12px_rgba(34,211,238,0.15)]',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium tracking-wide border transition-colors',
          variantStyles[variant],
          className
        )
      )}
      {...props}
    >
      {dot && (
        <span
          className={clsx('w-1.5 h-1.5 rounded-full', {
            'bg-lime-400 animate-pulse': variant === 'lime',
            'bg-amber-400 animate-pulse': variant === 'amber',
            'bg-cyan-400 animate-pulse': variant === 'cyan',
            'bg-zinc-400': variant === 'zinc' || variant === 'outline',
          })}
        />
      )}
      {children}
    </span>
  );
};
