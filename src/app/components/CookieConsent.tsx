import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const COOKIE_NAME = 'cookie_consent';

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name: string): string | null {
  return document.cookie.split('; ').reduce<string | null>((acc, cur) => {
    const [k, v] = cur.split('=');
    return k === name ? decodeURIComponent(v) : acc;
  }, null);
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getCookie(COOKIE_NAME)) setVisible(true);
  }, []);

  const respond = (choice: 'accepted' | 'declined') => {
    setCookie(COOKIE_NAME, choice, 180);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed inset-x-0 bottom-0 z-[300] flex flex-col gap-4 border-t border-accent/20 bg-surface/95 backdrop-blur px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="font-body text-sm text-text">
            This site uses cookies to remember your preferences and understand
            how it's used.
          </p>
          <div className="flex shrink-0 gap-3">
            <button
              onClick={() => respond('declined')}
              className="rounded-lg border-[1.5px] border-accent/30 px-4 py-2 font-body text-sm text-text transition hover:border-accent/60"
            >
              Decline
            </button>
            <button
              onClick={() => respond('accepted')}
              className="rounded-lg bg-accent px-4 py-2 font-body text-sm font-medium text-white transition hover:bg-accent-light"
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
