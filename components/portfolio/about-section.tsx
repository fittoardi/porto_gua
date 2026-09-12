'use client';

import { motion } from 'framer-motion';
import { User, Briefcase, GraduationCap, FlaskConical, Sparkles, MapPin } from 'lucide-react';
import Image from 'next/image';

const NOTES = [
  {
    icon: User,
    title: 'Tentang Saya',
    content:
      'I\'m Fitto Ardiansyah, an AI Engineer and Full Stack Developer passionate about building intelligent systems. I blend machine learning with production-grade web and mobile development.',
    color: 'bg-brand-yellow',
    rotate: '-rotate-2',
    shadow: 'shadow-brutal',
  },
  {
    icon: Briefcase,
    title: 'Pengalaman',
    content:
      '3+ years building production apps — from AI attendance systems to mobile service platforms. Experienced across the full stack: from model training to deployment.',
    color: 'bg-brand-pink',
    rotate: 'rotate-1',
    shadow: 'shadow-brutal-blue',
  },
  {
    icon: GraduationCap,
    title: 'Pendidikan',
    content:
      'Computer Science background with focus on AI, computer vision, and software engineering. Continuously learning through research and hands-on projects.',
    color: 'bg-brand-blue',
    rotate: '-rotate-1',
    shadow: 'shadow-brutal-pink',
  },
  {
    icon: FlaskConical,
    title: 'Research',
    content:
      'Active research in computer vision — face recognition, expression detection, and gesture-based interaction. Published work on real-time AI systems.',
    color: 'bg-brand-green',
    rotate: 'rotate-2',
    shadow: 'shadow-brutal-yellow',
  },
  {
    icon: Sparkles,
    title: 'Fun Facts',
    content:
      'Coffee-fueled coder. I turn complex problems into clean code. When I\'m not training models, I\'m exploring new frameworks and building side projects.',
    color: 'bg-brand-yellow',
    rotate: '-rotate-1',
    shadow: 'shadow-brutal-green',
  },
  {
    icon: MapPin,
    title: 'Location',
    content:
      'Based in Indonesia, working remotely with clients worldwide. Available for freelance, full-time, and collaboration opportunities.',
    color: 'bg-white',
    rotate: 'rotate-2',
    shadow: 'shadow-brutal',
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 bg-brand-bg overflow-hidden"
    >
      <div className="dots-pattern absolute inset-0 opacity-50" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="section-label mb-4">About Me</span>
          <h2 className="heading-lg mt-4">
            Get to know <span className="text-brand-blue">me</span>.
          </h2>
        </motion.div>

        {/* Profile + Notes grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:row-span-2"
          >
            <div className="brutal-card shadow-brutal-lg p-6 h-full flex flex-col">
              {/* Avatar */}
              <div className="relative mb-6">
                <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-black bg-gradient-to-br from-brand-blue to-brand-pink">
                  <Image
                    src="/profile/Fitto.jpeg"
                    alt="Fitto Ardiansyah"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>

                <div className="absolute -bottom-3 -right-3 rounded-full border-2 border-black bg-brand-yellow px-4 py-2 shadow-brutal-sm">
                  <span className="font-heading text-sm font-bold">AI Engineer</span>
                </div>
              </div>

              <h3 className="font-heading text-2xl font-bold mb-2">
                Fitto Ardiansyah
              </h3>
              <p className="body-base mb-4">
                Turning complex AI problems into elegant, production-ready
                solutions.
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-3 mt-auto">
                <div className="border-2 border-black rounded-xl p-3 bg-brand-yellow/20">
                  <div className="font-heading text-2xl font-bold">3+</div>
                  <div className="font-body text-xs text-black/60">
                    Years Exp
                  </div>
                </div>
                <div className="border-2 border-black rounded-xl p-3 bg-brand-pink/20">
                  <div className="font-heading text-2xl font-bold">10+</div>
                  <div className="font-body text-xs text-black/60">
                    Projects
                  </div>
                </div>
                <div className="border-2 border-black rounded-xl p-3 bg-brand-blue/20">
                  <div className="font-heading text-2xl font-bold">3+</div>
                  <div className="font-body text-xs text-black/60">
                    Research
                  </div>
                </div>
                <div className="border-2 border-black rounded-xl p-3 bg-brand-green/20">
                  <div className="font-heading text-2xl font-bold">98%</div>
                  <div className="font-body text-xs text-black/60">
                    AI Accuracy
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sticky notes */}
          {NOTES.map((note, i) => {
            const Icon = note.icon;
            return (
              <motion.div
                key={note.title}
                initial={{ opacity: 0, y: 30, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  type: 'spring',
                  stiffness: 100,
                }}
                whileHover={{ y: -8, rotate: 0, scale: 1.03 }}
                className={`brutal-card ${note.color} ${note.rotate} ${note.shadow} p-5 cursor-default`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="border-2 border-black rounded-lg p-1.5 bg-white">
                    <Icon size={18} />
                  </div>
                  <h4 className="font-heading text-lg font-bold">{note.title}</h4>
                </div>
                <p className="font-body text-sm leading-relaxed text-black/80">
                  {note.content}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
