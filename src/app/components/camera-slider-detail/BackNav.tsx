import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function BackNav() {
  return (
    <section className="bg-surface px-6 py-10">
      <div className="max-w-[1280px] mx-auto text-center">
        <Link
          to="/"
          state={{ scrollToId: 'projects' }}
          className="inline-flex items-center gap-2 text-accent font-body text-[15px] no-underline transition-colors duration-200 hover:text-accent-light"
        >
          <ArrowLeft size={18} /> Back to Projects
        </Link>
      </div>
    </section>
  );
}
