'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TIMELINE } from '@/lib/portfolio-data';

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="timeline"
      className="relative py-24 md:py-32 bg-white overflow-hidden"
    >
      <div className="grid-pattern absolute inset-0 opacity-30" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="section-label mb-4">Journey</span>
          <h2 className="heading-lg mt-4">
            My <span className="text-brand-green">Timeline</span>
          </h2>
          <p className="body-base max-w-xl mx-auto mt-4">
            Level by level — my journey from first line of code to AI engineer.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* SVG draw line */}
          <svg
            className="absolute left-6 md:left-1/2 top-0 h-full w-2 md:-translate-x-1/2"
            viewBox="0 0 4 1000"
            preserveAspectRatio="none"
          >
            <line
              x1="2"
              y1="0"
              x2="2"
              y2="1000"
              stroke="#000000"
              strokeWidth="4"
              strokeDasharray="8 8"
              opacity="0.2"
            />
            <motion.line
              x1="2"
              y1="0"
              x2="2"
              y2="1000"
              stroke="#FFD60A"
              strokeWidth="4"
              style={{ pathLength }}
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Events */}
          <div className="space-y-12">
            {TIMELINE.map((event, i) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
                className={`relative flex items-center ${
                  i % 2 === 0
                    ? 'md:flex-row'
                    : 'md:flex-row-reverse'
                }`}
              >
                {/* Node */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <div className={`w-8 h-8 border-2 border-black rounded-full ${event.color} flex items-center justify-center`}>
                    <span className="font-heading text-[10px] font-bold">
                      {i + 1}
                    </span>
                  </div>
                </div>

                {/* Card */}
                <div
                  className={`w-full md:w-[calc(50%-3rem)] ml-16 md:ml-0 ${
                    i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                  }`}
                >
                  <div className="brutal-card shadow-brutal p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`border-2 border-black rounded-full px-3 py-0.5 ${event.color} font-heading text-xs font-bold`}>
                        {event.level}
                      </span>
                      <span className="font-heading text-sm font-bold text-black/50">
                        {event.year}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-bold mb-2">
                      {event.title}
                    </h3>
                    <p className="font-body text-sm text-black/70">
                      {event.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
