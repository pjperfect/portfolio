import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type TagVariant = 'outline' | 'subtle' | 'award';

const variantClasses: Record<TagVariant, string> = {
  outline: 'border border-accent/40 bg-accent/5 text-accent px-3 py-1 text-xs',
  subtle:
    'border border-transparent bg-text/8 text-text px-2.5 py-1 text-xs cursor-default transition-colors duration-200 hover:bg-accent hover:text-white',
  award:
    'bg-gradient-to-br from-gold to-gold-dark text-surface px-3.5 py-1.5 text-[13px] font-bold shadow-[0_2px_8px_rgba(255,184,0,0.3)]',
};

export function Tag({
  children,
  variant = 'outline',
  className = '',
}: {
  children: ReactNode;
  variant?: TagVariant;
  className?: string;
}) {
  return (
    <span
      className={twMerge(
        'inline-flex items-center rounded-full font-body',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
