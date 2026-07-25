'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, FileText, X, CheckCircle2 } from 'lucide-react';
import { PROJECTS, type Project } from '@/lib/portfolio-data';
import Image from "next/image";

export default function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 bg-brand-bg overflow-hidden"
    >
      <div className="dots-pattern absolute inset-0 opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
          className="mb-16"
        >
          <span className="section-label mb-4">Portfolio</span>
          <h2 className="heading-lg mt-4">
            Featured <span className="text-brand-blue">Projects</span>
          </h2>
          <p className="body-base max-w-xl mt-4">
            Like game cartridges — pick one, plug it in, and explore the full
            case study.
          </p>
        </motion.div>

        {/* Project grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                type: 'spring',
                bounce: 0.4,
              }}
              whileHover={{ y: -8, rotate: i % 2 === 0 ? -1 : 1 }}
              onClick={() => setSelected(project)}
              data-cursor="hover"
              className="group cursor-pointer"
            >
              <div className="brutal-card shadow-brutal-lg overflow-hidden">
                {/* Cartridge top */}
                <div
                  className={`h-3 bg-gradient-to-r ${project.gradient} border-b-2 border-black`}
                />

                {/* Preview */}
                <div className="relative h-52 border-b-2 border-black overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/35" />

              {/* Judul */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-heading text-4xl font-bold text-white text-center px-4 drop-shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                  {project.title}
                </span>
              </div>

              {/* Category */}
              <div className="absolute top-3 left-3 border-2 border-black bg-white rounded-full px-3 py-1">
                <span className="font-heading text-xs font-bold">
                  {project.category}
                </span>
              </div>

              {/* Hover */}
              <div className="absolute bottom-3 right-3 border-2 border-black bg-brand-yellow rounded-full px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="font-heading text-xs font-bold">
                  Click to View
                </span>
              </div>
            </div>

                {/* Body */}
                <div className="p-5">
                  <p className="font-body text-sm text-black/70 mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="border-2 border-black rounded-md px-2 py-0.5 bg-brand-yellow/20 font-heading text-xs font-bold"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="border-2 border-black rounded-md px-2 py-0.5 bg-white font-heading text-xs font-bold">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
             className="relative z-10 w-full max-w-3xl h-[85vh] bg-white border-2 border-black rounded-3xl shadow-brutal-2xl flex flex-col"
            >
              {/* Header gradient */}
            <div className={`relative h-56 bg-gradient-to-br ${selected.gradient} border-b-2 border-black shrink-0`}>
                <Image
                  src={selected.image}
                  alt={selected.title}
                  fill
                  priority
                  className="object-cover"
                />

                {/* Overlay Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${selected.gradient} opacity-50`}
                />

                {/* Overlay Hitam */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Judul */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-heading text-4xl md:text-6xl font-bold text-white text-center px-6 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                    {selected.title}
                  </span>
                </div>

                {/* Category */}
                <div className="absolute top-4 left-4 border-2 border-black bg-white rounded-full px-3 py-1">
                  <span className="font-heading text-xs font-bold">
                    {selected.category}
                  </span>
                </div>

                {/* Close */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 border-2 border-black bg-white rounded-full p-2 hover:bg-brand-pink hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>

              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <p className="body-lg mb-6">{selected.longDescription}</p>
                
                {/* Features */}
                <h4 className="font-heading text-lg font-bold mb-3">
                  Key Features
                </h4>
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {selected.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-2 border-2 border-black rounded-xl p-3 bg-brand-yellow/10"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-brand-green shrink-0 mt-0.5"
                      />
                      <span className="font-body text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Tech stack */}
                <h4 className="font-heading text-lg font-bold mb-3">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selected.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="border-2 border-black rounded-lg px-3 py-1.5 bg-brand-blue/10 font-heading text-sm font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href={selected.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutal-btn"
                  >
                    <Github size={18} />
                    GitHub
                  </a>
                  <a
                    href={selected.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutal-btn-primary"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                  <a
                    href={selected.caseStudy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutal-btn-accent"
                  >
                    <FileText size={18} />
                    Case Study
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
