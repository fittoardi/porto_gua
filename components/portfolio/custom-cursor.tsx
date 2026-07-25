'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);
  const [variant, setVariant] = useState<'default' | 'hover' | 'click'>(
    'default'
  );
  const ripplesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(max-width: 1023px)').matches) return;
    document.body.classList.add('custom-cursor-active');

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      if (
        target.closest('a, button, [data-cursor="hover"], input, textarea')
      ) {
        setVariant('hover');
      } else {
        setVariant('default');
      }
    };

    const handleClick = (e: MouseEvent) => {
      setVariant('click');
      setTimeout(() => setVariant('default'), 200);

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 10px;
        height: 10px;
        border: 2px solid #FFD60A;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9998;
        animation: ripple-expand 0.6s ease-out forwards;
      `;
      ripplesRef.current?.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('click', handleClick);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('click', handleClick);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <style jsx global>{`
        @keyframes ripple-expand {
          0% {
            width: 10px;
            height: 10px;
            opacity: 1;
          }
          100% {
            width: 60px;
            height: 60px;
            opacity: 0;
          }
        }
      `}</style>
      <div ref={ripplesRef} className="pointer-events-none fixed inset-0 z-[9998]" />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden lg:block"
        style={{ x, y }}
      >
        <motion.div
          className="flex items-center justify-center rounded-full border-2 border-black"
          animate={{
            width: variant === 'hover' ? 56 : 24,
            height: variant === 'hover' ? 56 : 24,
            backgroundColor:
              variant === 'hover' ? '#FFD60A' : 'rgba(255, 255, 255, 0.5)',
            scale: variant === 'click' ? 0.8 : 1,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          style={{ translateX: '-50%', translateY: '-50%' }}
        >
          {variant === 'hover' && (
            <span className="font-heading text-[10px] font-bold text-black">
              VIEW
            </span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
