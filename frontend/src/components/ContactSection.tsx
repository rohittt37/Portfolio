import Section from './Section';
import { profile } from '../data/profile';

export default function ContactSection() {
  return (
    <Section id="contact" title="Contact" subtitle="Let's build something together">
      <div data-reveal className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800">
        <p className="max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          Have a project in mind, or want to talk about full stack development? I’d be happy to hear from you.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a className="btn" href={`mailto:${profile.email}`}>Email Rohit</a>
          <a className="btn" href={`tel:${profile.phone.replace(/\s/g, '')}`}>Call</a>
          {profile.socials.map((social) => (
            <a key={social.label} className="btn" href={social.href} target="_blank" rel="noreferrer">{social.label}</a>
          ))}
        </div>
        <p className="mt-4 text-xs text-neutral-500">{profile.email} · {profile.location}</p>
      </div>
    </Section>
  );
}
