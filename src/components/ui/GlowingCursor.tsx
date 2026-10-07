import React, { useEffect, useState } from 'react';

export const GlowingCursor: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only track if device supports hover
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [visible]);

  if (!visible || !position) return null;

  return (
    <div
      className="pointer-events-none fixed z-30 transition-opacity duration-300 ease-out"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="w-[450px] h-[450px] rounded-full bg-lime-400/[0.04] blur-[100px] pointer-events-none" />
    </div>
  );
};
