import { useTheme } from '../hooks/useTheme';

export default function Navbar() {
  const { theme, toggle } = useTheme();
  return (
    <nav aria-label="Appearance" className="site-topbar h-[78px] border-b border-neutral-300 dark:border-neutral-700">
      <div className="mx-auto flex h-full max-w-3xl items-center justify-end px-6">
        <button onClick={toggle} aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'} className="rounded-full p-2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900">
          {theme === 'dark' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z" /></svg>
          )}
        </button>
      </div>
    </nav>
  );
}
