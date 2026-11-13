'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Mail, Terminal, Sparkles, CheckCircle2, Cpu, Code2, Layers } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PROFILE } from '@/lib/portfolio-data';
import MagneticButton from './magnetic-button';
import FloatingShapes from './floating-shapes';

const CODE_TABS = [
  {
    id: 'vision',
    filename: 'vision_pipeline.py',
    icon: Cpu,
    tag: 'AI / Computer Vision',
    badge: '● YOLOv8 + PyTorch Active',
    badgeColor: 'bg-brand-green/20 text-brand-green border-brand-green',
    code: [
      { num: '01', text: 'import torch, cv2', color: 'text-brand-pink' },
      { num: '02', text: 'from ultralytics import YOLO', color: 'text-brand-pink' },
      { num: '03', text: '', color: '' },
      { num: '04', text: '# Load real-time edge detection model', color: 'text-black/40 italic' },
      { num: '05', text: 'model = YOLO("fitto_vision_ai.pt")', color: 'text-brand-blue font-semibold' },
      { num: '06', text: 'pipeline = model.track(source=0, conf=0.85)', color: 'text-black' },
      { num: '07', text: '', color: '' },
      { num: '08', text: '# [AI INFERENCE METRICS]', color: 'text-brand-yellow font-bold' },
      { num: '09', text: 'latency = "11ms"  # 60 FPS real-time', color: 'text-brand-green' },
      { num: '10', text: 'accuracy = "98.7% Precision"', color: 'text-brand-green font-bold' },
    ],
  },
  {
    id: 'fullstack',
    filename: 'server_engine.ts',
    icon: Code2,
    tag: 'Full Stack Architecture',
    badge: '● Edge Deployed 200 OK',
    badgeColor: 'bg-brand-blue/20 text-brand-blue border-brand-blue',
    code: [
      { num: '01', text: 'import { createAIService } from "@ai/core";', color: 'text-brand-pink' },
      { num: '02', text: 'import { NextRequest, NextResponse } from "next/server";', color: 'text-brand-pink' },
      { num: '03', text: '', color: '' },
      { num: '04', text: 'export async function POST(req: NextRequest) {', color: 'text-brand-blue font-semibold' },
      { num: '05', text: '  const stream = await createAIService.stream();', color: 'text-black' },
      { num: '06', text: '  return new NextResponse(stream, {', color: 'text-black' },
      { num: '07', text: '    headers: { "X-Latency": "14ms" }', color: 'text-brand-green' },
      { num: '08', text: '  });', color: 'text-black' },
      { num: '09', text: '}', color: 'text-brand-blue font-semibold' },
      { num: '10', text: '// Scalable edge runtime ready', color: 'text-black/40 italic' },
    ],
  },
  {
    id: 'mobile',
    filename: 'smart_app.dart',
    icon: Layers,
    tag: 'Mobile & Cloud',
    badge: '● Flutter 60 FPS Fluid',
    badgeColor: 'bg-brand-yellow/30 text-black border-black',
    code: [
      { num: '01', text: 'import "package:flutter/material.dart";', color: 'text-brand-pink' },
      { num: '02', text: 'import "package:ai_vision/detector.dart";', color: 'text-brand-pink' },
      { num: '03', text: '', color: '' },
      { num: '04', text: 'class VisionApp extends StatelessWidget {', color: 'text-brand-blue font-semibold' },
      { num: '05', text: '  Widget build(BuildContext ctx) => LiveCamera(', color: 'text-black' },
      { num: '06', text: '    onDetect: (results) => syncWithCloud(results),', color: 'text-brand-green font-semibold' },
      { num: '07', text: '    overlay: BoundingBoxHUD(smooth: true),', color: 'text-brand-blue' },
      { num: '08', text: '  );', color: 'text-black' },
      { num: '09', text: '}', color: 'text-brand-blue font-semibold' },
      { num: '10', text: '// Production cross-platform ready', color: 'text-black/40 italic' },
    ],
  },
];

export default function HeroSection() {
  const router = useRouter();
  const [activeTabId, setActiveTabId] = useState(CODE_TABS[0].id);
  const currentTab = CODE_TABS.find((t) => t.id === activeTabId) || CODE_TABS[0];

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
                  onClick={() => router.push('/projects')}
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
                  onClick={() => router.push('/contact')}
                  className="brutal-btn-accent"
                >
                  <Mail size={18} />
                  Contact Me
                </button>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right column - Interactive Code & Architecture Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative brutal-card shadow-brutal-xl overflow-hidden bg-white">
              {/* Terminal Window Top Bar */}
              <div className="border-b-2 border-black bg-brand-yellow/30 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full border border-black bg-[#FF5F56] inline-block" />
                  <span className="w-3.5 h-3.5 rounded-full border border-black bg-[#FFBD2E] inline-block" />
                  <span className="w-3.5 h-3.5 rounded-full border border-black bg-[#27C93F] inline-block" />
                  <span className="font-heading font-bold text-xs ml-2 text-black/80 flex items-center gap-1.5">
                    <Terminal size={14} />
                    fitto@workspace:~/{currentTab.filename}
                  </span>
                </div>

                <div className="hidden sm:inline-flex items-center gap-1.5 border border-black rounded-full px-2.5 py-0.5 bg-white text-[11px] font-heading font-bold">
                  <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                  LIVE SYSTEM
                </div>
              </div>

              {/* Code Tabs Switcher */}
              <div className="border-b-2 border-black bg-white p-2 flex flex-wrap gap-2">
                {CODE_TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = tab.id === activeTabId;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTabId(tab.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-black text-xs font-heading font-bold transition-all ${
                        isActive
                          ? 'bg-brand-yellow text-black shadow-brutal-sm -translate-y-0.5'
                          : 'bg-white text-black/70 hover:bg-black/5'
                      }`}
                    >
                      <Icon size={14} />
                      {tab.filename}
                    </button>
                  );
                })}
              </div>

              {/* Code Editor Body */}
              <div className="p-4 sm:p-6 bg-[#0B0F19] text-white font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto min-h-[300px]">
                {/* File Header Info */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs">
                  <span className="text-white/50">{currentTab.tag}</span>
                  <span className="text-brand-green flex items-center gap-1 font-sans font-semibold">
                    <CheckCircle2 size={13} />
                    {currentTab.badge}
                  </span>
                </div>

                {/* Code Lines */}
                <div className="space-y-1">
                  {currentTab.code.map((line, idx) => (
                    <div key={idx} className="flex gap-4">
                      <span className="text-white/30 select-none w-6 text-right font-mono text-xs">
                        {line.num}
                      </span>
                      <span className={`flex-1 font-mono ${line.color || 'text-white'}`}>
                        {line.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terminal Bottom Status Bar */}
              <div className="border-t-2 border-black bg-white px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="border border-black bg-brand-green/20 text-brand-green rounded-full px-2.5 py-0.5 font-heading font-bold text-[11px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-ping" />
                    GPU Clustered
                  </div>
                  <span className="font-heading font-semibold text-black/60 hidden sm:inline">
                    PyTorch &bull; CUDA &bull; Next.js Edge
                  </span>
                </div>

                <div className="font-heading font-bold text-black text-[11px] bg-brand-yellow/30 border border-black rounded-lg px-2 py-0.5">
                  ✦ Click tabs to switch stack
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
