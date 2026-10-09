import Section from './Section';
import { stack } from '../data/profile';

export default function StackSection() {
  return (
    <Section id="stack" title="Stack" subtitle="Technologies I work with">
      <div className="space-y-4">
        {stack.map((g) => (
          <div key={g.group} data-reveal>
            <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-neutral-500">{g.group}</h3>
            <div className="flex flex-wrap gap-2">
              {g.items.map((i) => (
                <span key={i} className="rounded-lg border border-neutral-200 px-2.5 py-1 text-sm dark:border-neutral-800">{i}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
