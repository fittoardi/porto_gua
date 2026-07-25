'use client';

import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '@/lib/portfolio-data';

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative py-24 md:py-32 bg-white overflow-hidden"
    >
      <div className="grid-pattern absolute inset-0 opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
          className="mb-16 text-center"
        >
          <span className="section-label mb-4">Tech Stack</span>
          <h2 className="heading-lg mt-4">
            My <span className="text-brand-pink">Skills</span> & Tools
          </h2>
          <p className="body-base max-w-xl mx-auto mt-4">
            A full arsenal across AI, frontend, backend, and mobile — no
            progress bars, just real expertise.
          </p>
        </motion.div>

        {/* Skill cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category, i) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  type: 'spring',
                  bounce: 0.4,
                }}
                whileHover={{ y: -10 }}
                className="group brutal-card shadow-brutal-lg overflow-hidden"
              >
                {/* Header */}
                <div
                  className={`${category.color} border-b-2 border-black p-5 flex items-center gap-3 transition-colors group-hover:bg-black group-hover:text-white`}
                >
                  <div className="border-2 border-black rounded-xl p-2 bg-white group-hover:bg-brand-yellow group-hover:rotate-12 transition-transform">
                    <Icon size={24} className="text-black" />
                  </div>
                  <h3 className="font-heading text-xl font-bold">
                    {category.title}
                  </h3>
                </div>

                {/* Skills */}
                <div className="p-5 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="border-2 border-black rounded-lg px-3 py-1.5 bg-white group-hover:bg-brand-yellow/20 transition-colors"
                    >
                      <span className="font-heading text-sm font-bold">
                        {skill.name}
                      </span>
                      <span className="font-body text-xs text-black/50 ml-1">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
