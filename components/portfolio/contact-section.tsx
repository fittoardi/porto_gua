'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, MessageCircle, Send } from 'lucide-react';
import { PROFILE } from '@/lib/portfolio-data';
import { toast } from 'sonner';

const SOCIALS = [
  { icon: Github, label: 'GitHub', href: PROFILE.socials.github, color: 'bg-white' },
  { icon: Linkedin, label: 'LinkedIn', href: PROFILE.socials.linkedin, color: 'bg-brand-blue' },
  { icon: Instagram, label: 'Instagram', href: PROFILE.socials.instagram, color: 'bg-brand-pink' },
  { icon: Mail, label: 'Email', href: `mailto:${PROFILE.email}`, color: 'bg-brand-yellow' },
  { icon: MessageCircle, label: 'WhatsApp', href: `https://wa.me/${PROFILE.whatsapp.replace(/\D/g, '')}`, color: 'bg-brand-green' },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all fields.');
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    toast.success('Message sent! I\'ll get back to you soon.');
    setForm({ name: '', email: '', message: '' });
    setSending(false);
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
        className="absolute top-20 right-10 w-32 h-32 border-2 border-black bg-brand-yellow rounded-full opacity-20"
      />
      <motion.div
        initial={{ y: 0 }}
        whileInView={{ y: 40 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="absolute bottom-20 left-10 w-24 h-24 border-2 border-black bg-brand-pink rounded-lg rotate-12 opacity-20"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-label mb-4">Get in Touch</span>
          <h2 className="heading-xl mt-6">
            LET&apos;S BUILD
            <br />
            SOMETHING{' '}
            <span className="inline-block bg-brand-pink text-white border-2 border-black rounded-2xl px-4 -rotate-2">
              AMAZING
            </span>
          </h2>
        </motion.div>

        {/* Contact card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="brutal-card shadow-brutal-2xl overflow-hidden"
        >
          <div className="grid md:grid-cols-5">
            {/* Left: info */}
            <div className="md:col-span-2 bg-brand-blue border-r-0 md:border-r-2 border-b-2 md:border-b-0 border-black p-6 md:p-8 text-white">
              <h3 className="font-heading text-2xl font-bold mb-4">
                Let&apos;s talk.
              </h3>
              <p className="font-body text-sm text-white/80 mb-6">
                Whether you have a project in mind, a role to fill, or just want
                to say hi — my inbox is always open.
              </p>

              <div className="space-y-3">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="flex items-center gap-2 text-sm hover:text-brand-yellow transition-colors"
                >
                  <Mail size={16} />
                  {PROFILE.email}
                </a>
                <a
                  href={`https://wa.me/${PROFILE.whatsapp.replace(/\D/g, '')}`}
                  className="flex items-center gap-2 text-sm hover:text-brand-yellow transition-colors"
                >
                  <MessageCircle size={16} />
                  {PROFILE.whatsapp}
                </a>
              </div>

              {/* Socials */}
              <div className="mt-8">
                <span className="font-heading text-xs font-bold text-white/60 mb-3 block">
                  FIND ME ON
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
                        className="border-2 border-black rounded-xl p-2.5 bg-white text-black hover:scale-110 hover:-rotate-6 transition-transform"
                        aria-label={social.label}
                      >
                        <Icon size={18} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: form */}
            <form
              onSubmit={handleSubmit}
              className="md:col-span-3 p-6 md:p-8 flex flex-col gap-4"
            >
              <div>
                <label className="font-heading text-sm font-bold mb-1.5 block">
                  Your Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Namamu"
                  className="w-full border-2 border-black rounded-xl px-4 py-3 font-body text-sm bg-white focus:outline-none focus:shadow-brutal-sm transition-shadow"
                />
              </div>
              <div>
                <label className="font-heading text-sm font-bold mb-1.5 block">
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="@example.com"
                  className="w-full border-2 border-black rounded-xl px-4 py-3 font-body text-sm bg-white focus:outline-none focus:shadow-brutal-sm transition-shadow"
                />
              </div>
              <div>
                <label className="font-heading text-sm font-bold mb-1.5 block">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Can i Help U....."
                  rows={4}
                  className="w-full border-2 border-black rounded-xl px-4 py-3 font-body text-sm bg-white focus:outline-none focus:shadow-brutal-sm transition-shadow resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="brutal-btn-primary w-full disabled:opacity-60"
              >
                {sending ? (
                  <>
                    <span className="animate-spin">⠋</span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
