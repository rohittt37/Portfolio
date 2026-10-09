import Section from './Section';
import { experience } from '../data/profile';

export default function ExperienceSection() {
  return (
    <Section id="work" title="Work" subtitle="Experience">
      <ol className="relative space-y-6 border-l border-neutral-200 pl-6 dark:border-neutral-800">
        {experience.map((e) => (
          <li key={e.company} data-reveal className="relative">
            <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-medium">{e.role} · <span className="text-neutral-500">{e.company}</span></h3>
              <span className="text-xs text-neutral-500">{e.period}</span>
            </div>
            {e.location && <p className="text-xs text-neutral-500">{e.location}</p>}
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-neutral-600 dark:text-neutral-400">
              {e.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
