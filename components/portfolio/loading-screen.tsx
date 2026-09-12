'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { LOADING_MESSAGES } from '@/lib/portfolio-data';

export default function LoadingScreen() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (pathname !== '/') {
      setIsComplete(true);
      return;
    }

    const hasLoaded = sessionStorage.getItem('portfolio-loaded');
    if (hasLoaded) {
      setIsComplete(true);
      return;
    }

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          sessionStorage.setItem('portfolio-loaded', 'true');
          setTimeout(() => setIsComplete(true), 300);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(progressInterval);
  }, [pathname]);

  useEffect(() => {
    const currentMessage = LOADING_MESSAGES[messageIndex];
    if (!currentMessage) return;

    if (displayedText.length < currentMessage.length) {
      const typeTimeout = setTimeout(() => {
        setDisplayedText(currentMessage.slice(0, displayedText.length + 1));
      }, 35);
      return () => clearTimeout(typeTimeout);
    }

    const nextTimeout = setTimeout(() => {
      if (messageIndex < LOADING_MESSAGES.length - 1) {
        setMessageIndex((prev) => prev + 1);
        setDisplayedText('');
      }
    }, 400);

    return () => clearTimeout(nextTimeout);
  }, [displayedText, messageIndex, pathname]);

  if (pathname !== '/') return null;

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white"
        >
          {/* Grid background */}
          <div className="grid-pattern-dark absolute inset-0 opacity-40" />

          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative z-10 mb-12"
          >
            <div className="border-2 border-brand-yellow bg-brand-yellow px-8 py-4 rounded-2xl">
              <span className="font-heading text-3xl md:text-5xl font-bold text-black">
                FA
              </span>
            </div>
          </motion.div>

          {/* Typing message */}
          <div className="relative z-10 h-8 mb-8 flex items-center">
            <span className="font-body text-base md:text-lg text-white/90 font-mono">
              {displayedText}
              <span className="inline-block w-2 h-4 bg-brand-yellow ml-1 animate-blink" />
            </span>
          </div>

          {/* Loading bar brutalism */}
          <div className="relative z-10 w-72 md:w-96">
            <div className="h-6 border-2 border-white rounded-full overflow-hidden bg-black">
              <motion.div
                className="h-full bg-brand-yellow rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
            <div className="flex justify-between mt-3 font-heading text-sm font-bold text-white/70">
              <span>LOADING</span>
              <span>{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
