import { useState } from 'react';
import { motion } from 'motion/react';
import emailjs from '@emailjs/browser';
import { Github, Linkedin, Mail, Send, MapPin } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { contact, emailHref } from '@/config/contact';
import { fadeUp, staggerContainer, viewportOnce } from './ui/motion';

const cards = [
  {
    icon: <Mail size={22} />,
    label: 'Email',
    value: contact.email,
    href: emailHref,
  },
  {
    icon: <Linkedin size={22} />,
    label: 'LinkedIn',
    value: `linkedin.com/in/${contact.linkedinHandle}`,
    href: contact.linkedinUrl,
  },
  {
    icon: <Github size={22} />,
    label: 'GitHub',
    value: `github.com/${contact.githubHandle}`,
    href: contact.githubUrl,
  },
  {
    icon: <WhatsAppIcon size={22} />,
    label: 'WhatsApp',
    value: contact.whatsappDisplay,
    href: contact.whatsappHref,
  },
];

const inputBase =
  'w-full px-3.5 py-[11px] bg-surface border-[1.5px] border-accent/20 rounded-lg text-text font-body text-sm outline-none transition-all duration-200 box-border focus:border-accent focus:shadow-[0_0_0_3px_rgba(13,115,119,0.12)]';
const labelStyle = 'block font-body text-xs text-text-dim mb-1.5 tracking-wide';

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  // Honeypot: real visitors never see or fill this field. Bots that auto-fill every
  // input on a page will populate it, so a non-empty value marks the submission as spam.
  const [honeypot, setHoneypot] = useState('');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      // Silently pretend it worked — don't tip off the bot that it was caught.
      setSent(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 4000);
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      // This fires when the VITE_EMAILJS_* vars weren't present in .env at build time —
      // Vite bakes them in at build, so a missing .env before `npm run deploy` means
      // these come through as undefined in the deployed bundle even though the code is fine.
      console.error('EmailJS is not configured — missing env var(s):', {
        serviceId,
        templateId,
        publicKey: publicKey ? '(set)' : undefined,
      });
      setSending(false);
      setError(
        'Failed to send your message. Please try again, or reach out directly using the details above.'
      );
      return;
    }

    setSending(true);
    setError(null);
    emailjs
      .send(
        serviceId,
        templateId,
        { from_name: form.name, from_email: form.email, message: form.message },
        publicKey
      )
      .then(() => {
        setSent(true);
        setSending(false);
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setSent(false), 4000);
      })
      .catch((err) => {
        // err from EmailJS is typically { status, text } — status 403 usually means
        // the request's origin isn't in the service's allowed-origins list, 422 usually
        // means a template/service ID mismatch, 429 means the free-tier quota is used up.
        console.error(
          'EmailJS error — status:',
          err?.status,
          'text:',
          err?.text,
          'raw:',
          err
        );
        setSending(false);
        setError(
          'Failed to send your message. Please try again, or reach out directly using the details above.'
        );
      });
  };

  return (
    <section id="contact" className="bg-bg px-6 py-24">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="max-w-[920px] mx-auto"
      >
        <motion.p
          variants={fadeUp}
          className="font-body text-[11px] tracking-[3px] uppercase text-accent mb-3 font-semibold text-center"
        >
          Get in Touch
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-display font-extrabold text-white text-4xl text-center mb-3"
        >
          Let's Work Together
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="font-body text-text text-center mb-2 opacity-70 text-[15px]"
        >
          Open to junior software engineering roles, freelance projects and
          collaborations — local and remote.
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center gap-1.5 mb-14"
        >
          <MapPin size={13} className="text-accent" />
          <span className="font-body text-[13px] text-accent">
            {contact.location}
          </span>
        </motion.div>

        {/* Contact cards */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {cards.map((c) => (
            <motion.div key={c.label} variants={fadeUp}>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2.5 bg-surface rounded-[10px] px-5 py-6 no-underline border border-accent/15 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(13,115,119,0.2)] hover:border-accent/40"
              >
                <span className="w-[46px] h-[46px] rounded-[10px] bg-accent/[0.12] border border-accent/25 flex items-center justify-center text-accent">
                  {c.icon}
                </span>
                <p className="font-display font-bold text-white text-sm">
                  {c.label}
                </p>
                <p className="font-body text-accent text-xs text-center">
                  {c.value}
                </p>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-accent/15" />
          <span className="font-body text-xs text-text-dim whitespace-nowrap">
            or send a message directly
          </span>
          <div className="flex-1 h-px bg-accent/15" />
        </motion.div>

        {/* Form */}
        <motion.form
          variants={fadeUp}
          onSubmit={handleSubmit}
          className="flex flex-col gap-[18px]"
        >
          {/* Honeypot — hidden from real users via off-screen positioning + aria-hidden,
              but still present in the DOM for form-filling bots to find and fill in. */}
          <input
            type="text"
            name="company"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] w-px h-px opacity-0 overflow-hidden"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
            <div>
              <label className={labelStyle}>Your Name</label>
              <input
                type="text"
                placeholder="Philip Olembo"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className={inputBase}
              />
            </div>
            <div>
              <label className={labelStyle}>Email Address</label>
              <input
                type="email"
                placeholder="pjole.kenya@gmail.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className={inputBase}
              />
            </div>
          </div>
          <div>
            <label className={labelStyle}>Message</label>
            <textarea
              placeholder="Tell me about your project or opportunity..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              rows={5}
              className={`${inputBase} resize-y`}
            />
          </div>

          {error && (
            <p role="alert" className="font-body text-sm text-red-400 -mt-1">
              {error}
            </p>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={sending}
              className={`flex items-center gap-2 px-8 py-[13px] text-white border-none rounded-lg font-body text-[15px] font-semibold transition-all duration-200 shadow-[0_4px_16px_rgba(13,115,119,0.3)] ${
                sent ? 'bg-[#1a7a4a]' : 'bg-accent hover:bg-accent-dark'
              } ${sending ? 'cursor-wait opacity-70' : 'cursor-pointer'}`}
            >
              <Send size={15} />
              {sent ? 'Message Sent!' : sending ? 'Sending…' : 'Send Message'}
            </button>
          </div>
        </motion.form>
      </motion.div>
    </section>
  );
}
