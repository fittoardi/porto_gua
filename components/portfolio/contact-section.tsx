'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  MessageCircle,
  Send,
  Check,
  Copy,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { PROFILE } from '@/lib/portfolio-data';
import { toast } from 'sonner';

const SOCIALS = [
  { icon: Github, label: 'GitHub', href: PROFILE.socials.github },
  { icon: Linkedin, label: 'LinkedIn', href: PROFILE.socials.linkedin },
  { icon: Instagram, label: 'Instagram', href: PROFILE.socials.instagram },
  { icon: Mail, label: 'Email', href: `mailto:${PROFILE.email}` },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    href: `https://wa.me/${PROFILE.whatsapp.replace(/\D/g, '')}`,
  },
];

const TOPICS = [
  'AI & Computer Vision',
  'Full Stack Web',
  'Mobile App',
  'Collaboration / Other',
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [selectedTopic, setSelectedTopic] = useState(TOPICS[0]);
  const [sending, setSending] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(PROFILE.email);
    setCopiedEmail(true);
    toast.success('Email copied to clipboard!');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setSending(true);

    const subject = `[${selectedTopic}] Project Inquiry from ${form.name.trim()}`;
    const body = `Hi Fitto,\n\nName: ${form.name.trim()}\nEmail: ${form.email.trim()}\nTopic: ${selectedTopic}\n\nMessage:\n${form.message.trim()}`;
    const mailtoUrl = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    await new Promise((r) => setTimeout(r, 600));

    toast.success('Opening your email client...', {
      description: 'You can also reach me directly on WhatsApp.',
    });

    window.location.href = mailtoUrl;

    setForm({ name: '', email: '', message: '' });
    setSending(false);
  };

  const handleWhatsAppDirect = () => {
    const greeting = form.name.trim()
      ? `Halo Fitto, saya ${form.name.trim()}`
      : 'Halo Fitto';
    const emailInfo = form.email.trim() ? ` (${form.email.trim()})` : '';
    const topicInfo = `\nTopik: ${selectedTopic}`;
    const msg = form.message.trim()
      ? `\n\nPesan:\n${form.message.trim()}`
      : '\n\nSaya ingin berdiskusi mengenai proyek / kolaborasi.';

    const fullText = `${greeting}${emailInfo}${topicInfo}${msg}`;
    const url = `https://wa.me/${PROFILE.whatsapp.replace(
      /\D/g,
      ''
    )}?text=${encodeURIComponent(fullText)}`;

    window.open(url, '_blank');
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-brand-bg overflow-hidden"
    >
      {/* Parallax bg shapes */}
      <motion.div
        initial={{ y: 0 }}
        whileInView={{ y: -30 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute top-20 right-10 w-32 h-32 border-2 border-black bg-brand-yellow rounded-full opacity-25 pointer-events-none"
      />
      <motion.div
        initial={{ y: 0 }}
        whileInView={{ y: 40 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="absolute bottom-20 left-10 w-24 h-24 border-2 border-black bg-brand-pink rounded-lg rotate-12 opacity-25 pointer-events-none"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="section-label mb-4">Get in Touch</span>
          <h2 className="heading-xl mt-4">
            LET&apos;S BUILD
            <br />
            SOMETHING{' '}
            <span className="inline-block bg-brand-pink text-white border-2 border-black rounded-2xl px-4 -rotate-2 shadow-brutal-sm">
              AMAZING
            </span>
          </h2>
          <p className="body-base max-w-xl mx-auto mt-4 text-black/70">
            Have a project in mind, an exciting role to fill, or want to build an
            AI-powered product together? Let&apos;s connect!
          </p>
        </motion.div>

        {/* Contact card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="brutal-card shadow-brutal-2xl overflow-hidden"
        >
          <div className="grid lg:grid-cols-12">
            {/* Left: Info panel */}
            <div className="lg:col-span-5 bg-brand-blue border-b-2 lg:border-b-0 lg:border-r-2 border-black p-6 md:p-8 text-white flex flex-col justify-between">
              <div>
                {/* Availability badge */}
                <div className="inline-flex items-center gap-2 border-2 border-black bg-white rounded-full px-3.5 py-1.5 text-black shadow-brutal-sm mb-6">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-green" />
                  </span>
                  <span className="font-heading text-xs font-bold uppercase tracking-wider">
                    Available for Work
                  </span>
                </div>

                <h3 className="font-heading text-3xl font-bold mb-3">
                  Let&apos;s talk.
                </h3>
                <p className="font-body text-sm text-white/85 leading-relaxed mb-6">
                  Whether you have an idea for an AI application, full stack web
                  platform, or mobile solution — I&apos;m ready to collaborate.
                </p>

                {/* Direct Contact Items */}
                <div className="space-y-3 mb-8">
                  {/* Email Box */}
                  <div className="border-2 border-black rounded-xl p-3 bg-white/10 backdrop-blur-sm flex items-center justify-between gap-2 hover:bg-white/15 transition-colors">
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="flex items-center gap-3 text-sm font-body truncate hover:text-brand-yellow transition-colors"
                      title="Send email"
                    >
                      <div className="border-2 border-black rounded-lg p-1.5 bg-brand-yellow text-black shrink-0">
                        <Mail size={16} />
                      </div>
                      <span className="truncate">{PROFILE.email}</span>
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="border border-white/40 rounded-lg p-1.5 hover:bg-white hover:text-black transition-colors shrink-0"
                      title="Copy email"
                    >
                      {copiedEmail ? (
                        <Check size={14} className="text-brand-green" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>

                  {/* WhatsApp Box */}
                  <a
                    href={`https://wa.me/${PROFILE.whatsapp.replace(
                      /\D/g,
                      ''
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-black rounded-xl p-3 bg-white/10 backdrop-blur-sm flex items-center justify-between gap-2 hover:bg-white/15 transition-colors group"
                  >
                    <div className="flex items-center gap-3 text-sm font-body truncate">
                      <div className="border-2 border-black rounded-lg p-1.5 bg-brand-green text-black shrink-0">
                        <MessageCircle size={16} />
                      </div>
                      <span className="group-hover:text-brand-yellow transition-colors truncate">
                        {PROFILE.whatsapp}
                      </span>
                    </div>
                    <span className="font-heading text-xs font-bold bg-white text-black px-2 py-0.5 rounded-md border border-black shrink-0">
                      Chat ↗
                    </span>
                  </a>

                  {/* Location & Timezone */}
                  <div className="border-2 border-black rounded-xl p-3 bg-white/10 backdrop-blur-sm flex items-center gap-3 text-sm">
                    <div className="border-2 border-black rounded-lg p-1.5 bg-brand-pink text-white shrink-0">
                      <MapPin size={16} />
                    </div>
                    <span className="font-body text-sm text-white/90">
                      {PROFILE.location} &bull; UTC+7 (WIB)
                    </span>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div>
                <span className="font-heading text-xs font-bold text-white/70 tracking-wider uppercase mb-3 block">
                  Find Me On
                </span>
                <div className="flex flex-wrap gap-2">
                  {SOCIALS.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-2 border-black rounded-xl p-2.5 bg-white text-black hover:bg-brand-yellow hover:-translate-y-1 hover:shadow-brutal-sm transition-all"
                        aria-label={social.label}
                        title={social.label}
                      >
                        <Icon size={18} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Interactive Contact Form */}
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-7 p-6 md:p-8 bg-white flex flex-col justify-between gap-5"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-heading text-2xl font-bold text-black flex items-center gap-2">
                    Send a Message
                    <Sparkles size={20} className="text-brand-yellow" />
                  </h3>
                  <span className="text-xs font-body text-black/50 hidden sm:inline">
                    * Required fields
                  </span>
                </div>
                <p className="font-body text-xs md:text-sm text-black/60 mb-6">
                  Fill in your details below. You can send via your email client
                  or directly jump into WhatsApp.
                </p>

                {/* Topic selector pills */}
                <div className="mb-5">
                  <label className="font-heading text-xs font-bold uppercase tracking-wider text-black/70 mb-2 block">
                    I&apos;m interested in
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {TOPICS.map((topic) => {
                      const active = selectedTopic === topic;
                      return (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => setSelectedTopic(topic)}
                          className={`border-2 border-black rounded-lg px-3 py-1.5 font-heading text-xs font-bold transition-all ${
                            active
                              ? 'bg-brand-yellow text-black shadow-brutal-sm -translate-y-0.5'
                              : 'bg-brand-bg text-black/70 hover:bg-white hover:text-black'
                          }`}
                        >
                          {topic}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="font-heading text-xs font-bold uppercase tracking-wider text-black/70 mb-1.5 block">
                      Your Name <span className="text-brand-pink">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="e.g. John Doe"
                      className="w-full border-2 border-black rounded-xl px-4 py-2.5 font-body text-sm bg-brand-bg focus:bg-white focus:outline-none focus:shadow-brutal-sm transition-all placeholder:text-black/35"
                    />
                  </div>
                  <div>
                    <label className="font-heading text-xs font-bold uppercase tracking-wider text-black/70 mb-1.5 block">
                      Your Email <span className="text-brand-pink">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="e.g. john@example.com"
                      className="w-full border-2 border-black rounded-xl px-4 py-2.5 font-body text-sm bg-brand-bg focus:bg-white focus:outline-none focus:shadow-brutal-sm transition-all placeholder:text-black/35"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-heading text-xs font-bold uppercase tracking-wider text-black/70 mb-1.5 block">
                    Message <span className="text-brand-pink">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Tell me about your project, goals, or timeline..."
                    className="w-full border-2 border-black rounded-xl px-4 py-2.5 font-body text-sm bg-brand-bg focus:bg-white focus:outline-none focus:shadow-brutal-sm transition-all placeholder:text-black/35 resize-none"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 border-t border-black/10 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={sending}
                  className="brutal-btn-primary w-full sm:flex-1 justify-center disabled:opacity-60 text-sm py-3"
                >
                  {sending ? (
                    <>
                      <span className="animate-spin">⠋</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send via Email
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="brutal-btn w-full sm:w-auto justify-center bg-brand-green/20 hover:bg-brand-green text-black text-sm py-3"
                  title="Send formatted message to WhatsApp"
                >
                  <MessageCircle size={16} />
                  Chat on WhatsApp
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
