'use client';

import { motion } from 'framer-motion';

const SHAPES = [
  { type: 'circle', size: 60, color: 'bg-brand-yellow', top: '10%', left: '5%', delay: 0 },
  { type: 'cube', size: 50, color: 'bg-brand-pink', top: '60%', left: '8%', delay: 0.5 },
  { type: 'cross', size: 40, color: 'bg-brand-blue', top: '15%', left: '85%', delay: 1 },
  { type: 'triangle', size: 55, color: 'bg-brand-green', top: '70%', left: '88%', delay: 1.5 },
  { type: 'circle', size: 35, color: 'bg-brand-pink', top: '40%', left: '92%', delay: 0.8 },
  { type: 'cube', size: 45, color: 'bg-brand-yellow', top: '80%', left: '45%', delay: 2 },
  { type: 'cross', size: 30, color: 'bg-brand-green', top: '25%', left: '48%', delay: 2.5 },
  { type: 'circle', size: 25, color: 'bg-brand-blue', top: '85%', left: '15%', delay: 3 },
];

function Shape({
  type,
  size,
  color,
  top,
  left,
  delay,
}: {
  type: string;
  size: number;
  color: string;
  top: string;
  left: string;
  delay: number;
}) {
  const renderShape = () => {
    switch (type) {
      case 'circle':
        return (
          <div
            className={`${color} border-2 border-black rounded-full`}
            style={{ width: size, height: size }}
          />
        );
      case 'cube':
        return (
          <div
            className={`${color} border-2 border-black rounded-lg rotate-12`}
            style={{ width: size, height: size }}
          />
        );
      case 'cross':
        return (
          <div className="relative" style={{ width: size, height: size }}>
            <div
              className={`${color} border-2 border-black absolute top-1/2 left-0 -translate-y-1/2 rounded-sm`}
              style={{ width: size, height: size * 0.3 }}
            />
            <div
              className={`${color} border-2 border-black absolute left-1/2 top-0 -translate-x-1/2 rounded-sm`}
              style={{ width: size * 0.3, height: size }}
            />
          </div>
        );
      case 'triangle':
        return (
          <div
            className={`${color} border-2 border-black rotate-45 rounded-sm`}
            style={{ width: size, height: size }}
          />
        );
    }
  };

  return (
    <motion.div
      className="absolute"
      style={{ top, left }}
      animate={{ y: [0, -25, 0], rotate: [0, 10, 0] }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {renderShape()}
    </motion.div>
  );
}

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {SHAPES.map((shape, i) => (
        <Shape key={i} {...shape} />
      ))}
    </div>
  );
}
