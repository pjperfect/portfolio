import type { ReactNode } from 'react';

export function DetailSection({
  bg = 'bg',
  className = '',
  children,
}: {
  bg?: 'bg' | 'surface';
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={`${bg === 'bg' ? 'bg-bg' : 'bg-surface'} px-6 py-20 ${className}`}>
      <div className="max-w-[1280px] mx-auto">{children}</div>
    </section>
  );
}
