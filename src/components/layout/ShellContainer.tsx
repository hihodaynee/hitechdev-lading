import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ShellContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ShellContainer: React.FC<ShellContainerProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className="w-full px-2 sm:px-4 md:px-6 py-2 sm:py-6">
      <div
        className={twMerge(
          clsx(
            'relative max-w-[1600px] mx-auto rounded-[2.5rem] ring-1 ring-white/10 bg-obsidian text-zinc-100 shadow-2xl overflow-hidden',
            className
          )
        )}
        {...props}
      >
        {/* Subtle top spotlight glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-lime-400/[0.07] blur-[120px] rounded-full" />
        {/* Subtle cyber grid overlay */}
        <div className="pointer-events-none absolute inset-0 bg-cyber-grid opacity-60" />

        <div className="relative z-10 w-full flex flex-col min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
};
