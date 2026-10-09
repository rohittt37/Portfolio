import type { ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

interface Props {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  revealKey?: unknown;
  centerHeader?: boolean;
}

export default function Section({ id, title, subtitle, children, revealKey, centerHeader = false }: Props) {
  const ref = useReveal<HTMLElement>([revealKey]);
  return (
    <section id={id} ref={ref} className="scroll-mt-20 border-t border-neutral-200 py-10 dark:border-neutral-800">
      <header data-reveal className={`mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-6 ${centerHeader ? 'justify-center text-center' : ''}`}>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-neutral-500">{subtitle}</p>}
      </header>
      <div className="px-6 pb-8">{children}</div>
    </section>
  );
}

export function Status({ loading, error }: { loading: boolean; error: string | null }) {
  if (loading) return <p className="text-sm text-neutral-500">Loading…</p>;
  if (error) return <p className="text-sm text-red-500">Couldn’t load: {error}</p>;
  return null;
}
