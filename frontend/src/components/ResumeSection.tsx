import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Section from './Section';
import { profile } from '../data/profile';

const cards = [0, 1, 2];

function cardPosition(index: number) {
  return {
    x: index * 18,
    y: -index * 13,
    z: -index * 22,
    zIndex: cards.length - index,
    rotation: index * 1.4,
    scale: 1 - index * 0.025,
  };
}

export default function ResumeSection() {
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [order, setOrder] = useState(cards);

  useLayoutEffect(() => {
    order.forEach((cardId, index) => {
      const node = cardRefs.current[cardId];
      if (node) gsap.set(node, { ...cardPosition(index), xPercent: -50, yPercent: -50, transformOrigin: 'center center' });
    });
  }, [order]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => {
      const [frontId, ...rest] = order;
      const front = cardRefs.current[frontId];
      if (!front) return;

      const timeline = gsap.timeline({ onComplete: () => setOrder((current) => [...current.slice(1), current[0]]) });
      timeline.to(front, { y: 430, rotation: 5, duration: 0.78, ease: 'power2.in' });
      rest.forEach((cardId, index) => {
        const node = cardRefs.current[cardId];
        if (node) timeline.to(node, { ...cardPosition(index), duration: 0.62, ease: 'power1.inOut' }, `-=${index === 0 ? 0.42 : 0.48}`);
      });
      timeline.set(front, cardPosition(cards.length - 1));
    }, 4200);
    return () => window.clearTimeout(timer);
  }, [order]);

  return (
    <Section id="resume" title="Curriculum Vitae" centerHeader>
      <div className="cv-deck mx-auto" aria-label="Animated résumé card stack">
        {order.map((cardId) => (
          <article
            key={cardId}
            ref={(node) => { cardRefs.current[cardId] = node; }}
            className="cv-card absolute left-1/2 top-1/2 h-[350px] w-[min(286px,calc(100vw-5.5rem))] overflow-hidden rounded-2xl border border-neutral-300 bg-neutral-50 p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
          >
            {cardId === 0 && (
              <div className="flex h-full flex-col justify-between">
                <div>
                  <p className="text-sm font-medium">Resume / CV</p>
                  <h3 className="mt-3 text-xl font-medium">Career Snapshot</h3>
                  <p className="mt-4 text-sm leading-6 text-neutral-600 dark:text-neutral-300">A quick walkthrough of my experience, projects, technical stack, and the work I care about.</p>
                </div>
                <a href={profile.resumeUrl} download="Rohit-Gupta-Resume.pdf" className="btn w-fit text-xs">Download CV</a>
              </div>
            )}
            {cardId === 1 && (
              <iframe title="Rohit Gupta résumé preview" src={`${profile.resumeUrl}#toolbar=0&navpanes=0&scrollbar=0&page=1`} className="h-full w-full rounded-lg bg-white" />
            )}
            {cardId === 2 && (
              <div className="flex h-full flex-col justify-between">
                <div>
                  <p className="text-sm font-medium">Rohit Gupta</p>
                  <h3 className="mt-3 text-xl font-medium">Full Stack Developer</h3>
                  <p className="mt-4 text-sm leading-6 text-neutral-600 dark:text-neutral-300">MERN stack · Real time applications · Software training</p>
                </div>
                <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="btn w-fit text-xs">Open CV</a>
              </div>
            )}
          </article>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap justify-center gap-2">
        <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="btn">Open résumé</a>
        <a href={profile.resumeUrl} download="Rohit-Gupta-Resume.pdf" className="btn">Download CV</a>
      </div>

      <div className="mt-14 text-center">
        <p className="text-sm font-medium">Find me around the web</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <a className="social-link" href={`mailto:${profile.email}`} aria-label="Email Rohit" title="Email">Email</a>
          {profile.socials.map((social) => (
            <a className="social-link" key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} title={social.label}>{social.label}</a>
          ))}
        </div>
      </div>
    </Section>
  );
}
