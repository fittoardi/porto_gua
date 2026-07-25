'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Mail } from 'lucide-react';
import { PROFILE } from '@/lib/portfolio-data';
import MagneticButton from './magnetic-button';
import FloatingShapes from './floating-shapes';

const DeveloperRoom = dynamic(() => import('./developer-room'), {
  ssr: false,
});

export default function HeroSection() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-brand-bg pt-24 pb-12"
    >
      {/* Background */}
      <div className="grid-pattern absolute inset-0" />
      <FloatingShapes />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            {/* Availability badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 border-2 border-black bg-white rounded-full px-4 py-2 mb-6 shadow-brutal-sm"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-green" />
              </span>
              <span className="font-body text-sm font-medium">
                Available for opportunities
              </span>
            </motion.div>

            {/* Name */}
            <h1 className="heading-xl mb-2">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="block"
              >
                FITTO
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="block"
              >
                ARDIANSYAH
              </motion.span>
            </h1>

            {/* Roles */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {PROFILE.roles.map((role, i) => (
                <span
                  key={role}
                  className={`border-2 border-black rounded-full px-3 py-1 font-heading text-xs md:text-sm font-bold ${
                    i === 0
                      ? 'bg-brand-yellow text-black'
                      : i === 1
                      ? 'bg-brand-blue text-white'
                      : 'bg-brand-pink text-white'
                  }`}
                >
                  {role}
                </span>
              ))}
            </motion.div>

            {/* Headline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="heading-md mb-4 max-w-xl"
            >
              Building Intelligent Digital{' '}
              <span className="inline-block bg-brand-yellow border-2 border-black rounded-lg px-2 -rotate-1">
                Experiences
              </span>{' '}
              with AI & Modern Technologies.
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="body-base max-w-lg mb-8"
            >
              {PROFILE.description}
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton strength={0.4}>
                <button
                  onClick={() => scrollTo('#projects')}
                  className="brutal-btn-primary"
                >
                  Explore Projects
                  <ArrowRight size={18} />
                </button>
              </MagneticButton>
              <MagneticButton strength={0.4}>
                <a
                  href="/cv/FittoArdi.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutal-btn flex items-center gap-2"
                >
                  <Download size={18} />
                  Download CV
                </a>
              </MagneticButton>
              <MagneticButton strength={0.4}>
                <button
                  onClick={() => scrollTo('#contact')}
                  className="brutal-btn-accent"
                >
                  <Mail size={18} />
                  Contact Me
                </button>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right column - 3D Room */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative border-2 border-black rounded-3xl overflow-hidden bg-gradient-to-br from-brand-blue/10 to-brand-pink/10 shadow-brutal-xl h-[400px] lg:h-[560px]">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-full">
                    <div className="font-heading text-lg font-bold text-black/50 animate-pulse">
                      Loading 3D Workspace...
                    </div>
                  </div>
                }
              >
                <DeveloperRoom />
              </Suspense>
              {/* Label */}
              <div className="absolute bottom-4 left-4 border-2 border-black bg-white rounded-full px-4 py-1.5 shadow-brutal-sm">
                <span className="font-heading text-xs font-bold">
                  3D Developer Workspace
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
