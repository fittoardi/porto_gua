'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import MagneticButton from './magnetic-button';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Timeline', href: '#timeline' },
  // { label: 'Certificates', href: '#certificates' },
  // { label: 'Research', href: '#research' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, type: 'spring', damping: 20, stiffness: 200 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div
            className={`flex items-center justify-between rounded-2xl border-2 border-black px-4 md:px-6 py-3 transition-all duration-300 ${
              scrolled
                ? 'bg-white/90 backdrop-blur-md shadow-brutal'
                : 'bg-white/70 backdrop-blur-sm'
            }`}
          >
            {/* Logo */}
            <button
              onClick={() => handleNavClick('#home')}
              className="flex items-center gap-2"
            >
              <div className="border-2 border-black bg-brand-yellow rounded-lg px-3 py-1.5">
                <span className="font-heading font-bold text-black text-lg">
                  FA
                </span>
              </div>
              <span className="font-heading font-bold text-sm md:text-base hidden sm:block">
                Fitto Ardiansyah
              </span>
            </button>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <MagneticButton
                  key={item.label}
                  strength={0.25}
                  className="inline-block"
                >
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="font-body text-sm font-medium text-black/70 hover:text-black hover:bg-brand-yellow/30 rounded-lg px-3 py-2 transition-colors"
                  >
                    {item.label}
                  </button>
                </MagneticButton>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:block">
              <MagneticButton strength={0.3}>
                <button
                  onClick={() => handleNavClick('#contact')}
                  className="brutal-btn-primary text-sm"
                >
                  Let&apos;s Talk
                </button>
              </MagneticButton>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden border-2 border-black rounded-lg p-2 bg-white"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-40 lg:hidden"
          >
            <div className="bg-white border-2 border-black rounded-2xl shadow-brutal-lg p-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="font-body text-base font-medium text-left px-4 py-3 rounded-lg hover:bg-brand-yellow/30 transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('#contact')}
                className="brutal-btn-primary mt-2"
              >
                Let&apos;s Talk
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
