'use client';

import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { MARQUEE_ITEMS, PROFILE } from '@/lib/portfolio-data';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Marquee */}
      <div className="border-y-2 border-white py-4 overflow-hidden">
        <div className="flex gap-0 animate-marquee whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center">
              <span className="font-heading text-3xl md:text-5xl font-bold text-white px-6">
                {item}
              </span>
              <span className="text-brand-yellow text-3xl md:text-5xl font-bold">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Footer content */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo */}
          <div>
            <div className="inline-block border-2 border-brand-yellow bg-brand-yellow rounded-xl px-4 py-2 mb-3">
              <span className="font-heading text-xl font-bold text-black">
                FA
              </span>
            </div>
            <p className="font-body text-sm text-white/60 max-w-xs">
              {PROFILE.headline}
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { label: 'About', href: '/about' },
              { label: 'Skills', href: '/skills' },
              { label: 'Projects', href: '/projects' },
              { label: 'Timeline', href: '/timeline' },
              { label: 'Contact', href: '/contact' },
            ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="font-body text-sm text-white/70 hover:text-brand-yellow transition-colors border-b-2 border-transparent hover:border-brand-yellow"
                >
                  {label}
                </a>
              ))}
          </div>

          {/* Back to top */}
          <div className="flex justify-center md:justify-end">
            <motion.button
              whileHover={{ y: -4 }}
              onClick={scrollToTop}
              className="border-2 border-white rounded-xl px-4 py-2.5 flex items-center gap-2 hover:bg-brand-yellow hover:text-black hover:border-brand-yellow transition-colors"
            >
              <ArrowUp size={18} />
              <span className="font-heading text-sm font-bold">
                Back to Top
              </span>
            </motion.button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t-2 border-white/20 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-white/50">
            © {new Date().getFullYear()} Fitto Ardiansyah. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/50">
            Built with Next.js, Three.js & Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}
