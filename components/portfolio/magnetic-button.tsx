'use client';

import { useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * strength, y: y * strength });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', damping: 15, stiffness: 200, mass: 0.3 }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
