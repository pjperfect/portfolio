import { Github, Linkedin, Mail } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { contact, emailHref } from '@/config/contact';

const socials = [
  { icon: <Github size={16} />, href: contact.githubUrl, label: 'GitHub' },
  { icon: <Linkedin size={16} />, href: contact.linkedinUrl, label: 'LinkedIn' },
  { icon: <Mail size={16} />, href: emailHref, label: 'Email' },
  { icon: <WhatsAppIcon size={16} />, href: contact.whatsappHref, label: 'WhatsApp' },
];

export function Footer() {
  return (
    <footer className="bg-surface border-t border-white/20 px-6 py-8">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display font-extrabold text-[22px] text-accent tracking-wide bg-transparent border-none cursor-pointer"
          >
            PJOle
          </button>
          <div className="flex gap-2.5">
            {socials.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                title={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[34px] h-[34px] rounded-full border-[1.5px] border-accent/40 flex items-center justify-center text-text no-underline transition-all duration-200 hover:border-accent hover:text-accent hover:bg-accent/10"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
        <p className="font-body text-text text-[13px] opacity-70 text-center m-0">
          {contact.name} © 2026
        </p>
      </div>
    </footer>
  );
}
