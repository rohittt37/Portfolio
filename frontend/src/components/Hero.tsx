import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { profile } from '../data/profile';

function indiaTime() {
  return new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata',
  }).format(new Date()).toLowerCase();
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [time, setTime] = useState(indiaTime);

  useEffect(() => {
    const timer = window.setInterval(() => setTime(indiaTime()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-hero]', { opacity: 0, y: 18, duration: 0.65, ease: 'power3.out', stagger: 0.12 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref}>
      <header data-hero className="profile-header flex items-center gap-4 border-b border-neutral-300 px-6 py-3 dark:border-neutral-700 sm:px-6">
        <img src={profile.avatar} alt={`${profile.name} profile`} className="h-16 w-16 shrink-0 rounded-full border border-neutral-200 object-cover object-[center_28%] dark:border-neutral-700" />
        <div className="min-w-0">
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{profile.name.toLowerCase()}</h1>
          <a href={profile.socials.find((social) => social.label === 'GitHub')?.href} target="_blank" rel="noreferrer" className="text-sm text-neutral-700 hover:underline dark:text-neutral-300">{profile.handle}</a>
        </div>
        <div className="ml-auto shrink-0 text-right text-xs leading-5 text-neutral-600 dark:text-neutral-400 sm:text-sm">
          <p>// {time}</p>
          <p>GMT +5:30</p>
        </div>
      </header>
      <div className="space-y-5 px-6 py-8 text-[15px] leading-7 sm:px-6 sm:text-base">
        <p data-hero>I’m Rohit, a full stack developer based in Mumbai, building practical web applications with a focus on clean, reliable engineering.</p>
        <p data-hero>I work across <strong>MERN stack development</strong>—from responsive React interfaces to Node.js APIs, secure authentication, and real time features.</p>
        <p data-hero>I also mentor students and run hands on workshops. I enjoy taking a project from the first idea through to a polished, production ready application.</p>
      </div>
    </section>
  );
}
