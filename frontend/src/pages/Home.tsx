import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import StackSection from '../components/StackSection';
import ResumeSection from '../components/ResumeSection';
import ContactSection from '../components/ContactSection';
import Section from '../components/Section';
import { achievements } from '../data/profile';

export default function Home() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 100);
  }, [hash]);

  return (
    <>
      <Hero />
      <ResumeSection />
      <StackSection />
      <ExperienceSection />
      <ProjectsSection />
      <Section id="highlights" title="Highlights" subtitle="A few milestones">
        <ul className="divide-y divide-neutral-200 border-y border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
          {achievements.map((item) => <li key={item} data-reveal className="py-3 text-sm">{item}</li>)}
        </ul>
      </Section>
      <ContactSection />
    </>
  );
}
