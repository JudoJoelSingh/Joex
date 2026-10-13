'use client';

import React from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import {
  Sparkles,
  Download,
  Layers,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Zap,
} from 'lucide-react';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  }),
};

const FEATURES = [
  {
    icon: <Cpu className="w-6 h-6" />,
    title: 'Multi-Action AI Writer',
    desc: 'Trigger specific actions: Rewrite Bullets, Quantify Metrics, Executive Wording, or Polished Summary — powered by OpenAI GPT-4o.',
    color: 'from-violet-600/20 to-violet-900/10',
    border: 'border-violet-800/40',
    iconBg: 'bg-violet-950/80',
    iconColor: 'text-[#7C3AED]',
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'Live Split-Screen Studio',
    desc: 'Edit your resume while watching the preview update in real-time. No save button needed — every keystroke syncs instantly.',
    color: 'from-sky-600/20 to-sky-900/10',
    border: 'border-sky-800/40',
    iconBg: 'bg-sky-950/80',
    iconColor: 'text-[#38BDF8]',
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: 'Instant PDF Export',
    desc: 'One-click vector PDF download that matches your chosen template — pixel-perfect, print-ready, and ATS compliant.',
    color: 'from-emerald-600/20 to-emerald-900/10',
    border: 'border-emerald-800/40',
    iconBg: 'bg-emerald-950/80',
    iconColor: 'text-emerald-400',
  },
];

const TEMPLATES = [
  {
    id: 'minimal-white',
    label: 'Minimal White',
    tag: 'ATS-First',
    bg: 'bg-white',
    accent: 'bg-slate-800',
    tagColor: 'text-slate-600 bg-slate-100',
    desc: 'Clean, high-contrast, single-column. Built for ATS parsers and human recruiters alike.',
    preview: (
      <div className="bg-white rounded-lg p-4 text-left w-full shadow-xl">
        <div className="h-2 bg-slate-900 rounded w-3/4 mb-1.5" />
        <div className="h-1.5 bg-slate-400 rounded w-1/2 mb-3" />
        <div className="space-y-1">
          {[80, 60, 90, 50].map((w, i) => (
            <div key={i} className="h-1 bg-slate-200 rounded" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="mt-3 h-1 bg-slate-800 rounded w-full mb-2" />
        <div className="space-y-1">
          {[75, 55, 65].map((w, i) => (
            <div key={i} className="h-1 bg-slate-200 rounded" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'elite-black',
    label: 'Elite Black',
    tag: 'Luxury',
    tagColor: 'text-purple-300 bg-purple-950/80',
    desc: 'Obsidian dark with electric violet accents. For candidates who demand a cinematic first impression.',
    preview: (
      <div className="bg-[#0B0C10] border border-zinc-700 rounded-lg p-4 text-left w-full shadow-2xl">
        <div className="h-2 bg-white rounded w-3/4 mb-1.5" />
        <div className="h-1.5 bg-[#38BDF8] rounded w-1/2 mb-3" />
        <div className="space-y-1">
          {[80, 60, 90, 50].map((w, i) => (
            <div key={i} className="h-1 bg-zinc-700 rounded" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="mt-3 h-px bg-[#7C3AED] rounded w-full mb-2" />
        <div className="space-y-1">
          {[75, 55, 65].map((w, i) => (
            <div key={i} className="h-1 bg-zinc-700 rounded" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'modern-glass',
    label: 'Modern Glass',
    tag: 'Executive',
    tagColor: 'text-sky-300 bg-sky-950/80',
    desc: 'Executive glassmorphic layout with ice-blue headers and subtle gradient accents.',
    preview: (
      <div className="bg-[#111625] border border-slate-700/60 rounded-lg p-4 text-left w-full shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7C3AED] via-[#38BDF8] to-indigo-500" />
        <div className="h-2 bg-white rounded w-3/4 mb-1.5 mt-2" />
        <div className="h-1.5 bg-[#38BDF8] rounded w-1/2 mb-3" />
        <div className="space-y-1">
          {[80, 60, 90, 50].map((w, i) => (
            <div key={i} className="h-1 bg-slate-700 rounded" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="mt-3 h-px bg-slate-700 rounded w-full mb-2" />
        <div className="space-y-1">
          {[75, 55, 65].map((w, i) => (
            <div key={i} className="h-1 bg-slate-700 rounded" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    ),
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#F5F5F5] flex flex-col font-sans selection:bg-[#7C3AED] selection:text-white overflow-x-hidden">
      {/* Sticky Nav */}
      <header className="w-full border-b border-zinc-900 bg-[#0A0A0B]/80 backdrop-blur-md fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.08, rotate: 5 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C3AED] via-purple-500 to-[#38BDF8] flex items-center justify-center shadow-lg shadow-purple-900/30"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <span className="font-extrabold text-xl tracking-tight font-heading">
              Shinex <span className="text-[#38BDF8]">AI</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#templates" className="hover:text-white transition-colors">Templates</a>
          </nav>

          <Link
            href="/editor"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7C3AED] to-purple-600 hover:from-purple-600 hover:to-[#7C3AED] text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-purple-900/30 transition-all duration-200 hover:-translate-y-0.5"
          >
            <span>Open Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      <main className="flex-1 pt-32">
        {/* Hero Section */}
        <section className="px-6 pb-28 max-w-7xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/30 text-[#7C3AED] text-xs font-bold mb-8"
          >
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            <span>AI-Powered Professional Identity Platform</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.05] mb-6 font-heading"
          >
            Resumes that{' '}
            <span className="bg-gradient-to-r from-[#7C3AED] via-purple-400 to-[#38BDF8] bg-clip-text text-transparent">
              get you hired.
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#9CA3AF] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Shinex AI combines real-time live editing, OpenAI-powered bullet rewrites, 3 ATS-ready
            templates, and one-click vector PDF export — built for ambitious professionals.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/editor"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#7C3AED] via-purple-600 to-[#38BDF8] hover:from-[#6d28d9] hover:to-sky-500 text-white font-bold text-base px-8 py-4 rounded-2xl shadow-2xl shadow-purple-900/40 transition-all duration-300 hover:scale-105 hover:shadow-purple-600/30"
            >
              <Sparkles className="w-5 h-5" />
              <span>Open Shinex AI Studio — Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Social Proof Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mt-8 text-xs text-[#9CA3AF]"
          >
            {['No signup required', 'ATS-friendly output', 'OpenAI powered', 'Free PDF export'].map(
              (item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {item}
                </span>
              )
            )}
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-6 pb-28 max-w-7xl mx-auto">
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading mb-3">
              Everything you need to land the role
            </h2>
            <p className="text-[#9CA3AF] max-w-xl mx-auto">
              Purpose-built tools that turn a rough draft into an executive-grade resume in minutes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -4, scale: 1.01 }}
                className={`p-7 rounded-2xl bg-gradient-to-br ${feature.color} border ${feature.border} backdrop-blur-sm group transition-all duration-300`}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${feature.iconBg} border ${feature.border} flex items-center justify-center ${feature.iconColor} mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-heading">{feature.title}</h3>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Templates Section */}
        <section id="templates" className="px-6 pb-32 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading mb-3">
              3 Distinct ATS-Ready Templates
            </h2>
            <p className="text-[#9CA3AF] max-w-xl mx-auto">
              Switch instantly between templates — your data stays intact. Every template passes ATS scans.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEMPLATES.map((tpl, i) => (
              <motion.div
                key={tpl.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="bg-[#111214] border border-zinc-800 hover:border-zinc-600 rounded-2xl overflow-hidden group transition-all duration-300 shadow-xl"
              >
                {/* Preview */}
                <div className="p-5 bg-zinc-950/60">{tpl.preview}</div>

                {/* Info */}
                <div className="p-5 border-t border-zinc-800">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-white font-heading">{tpl.label}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tpl.tagColor}`}>
                      {tpl.tag}
                    </span>
                  </div>
                  <p className="text-[#9CA3AF] text-xs leading-relaxed mb-4">{tpl.desc}</p>
                  <Link
                    href="/editor"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#38BDF8] hover:text-white transition-colors group-hover:gap-2.5 duration-200"
                  >
                    Use this template <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-900 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#7C3AED] to-[#38BDF8] flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-zinc-300">Shinex AI</span>
            <span>© 2026 — All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/editor" className="hover:text-zinc-200 transition-colors">
              Studio
            </Link>
            <span className="text-zinc-700">•</span>
            <span>3 ATS Templates • OpenAI Powered</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
