import Section from './Section';
import { projects } from '../data/profile';

export default function ProjectsSection() {
  return (
    <Section id="projects" title="Projects" subtitle="Things I've built">
      <div className="divide-y divide-neutral-200 border-y border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
        {projects.map((p, index) => (
          <article key={p.title} data-reveal className="flex gap-4 py-5">
            <span className="pt-0.5 text-sm tabular-nums text-neutral-400">{String(index + 1).padStart(2, '0')}</span>
            <div className="min-w-0 flex-1">
            <h3 className="font-medium">{p.title}</h3>
            <p className="mt-0.5 text-sm text-neutral-500">{p.subtitle}</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{p.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
