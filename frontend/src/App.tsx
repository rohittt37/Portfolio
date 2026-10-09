import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <>
      <div aria-hidden="true" className="guide-frame" />
      <Navbar />
      <main className="site-content relative z-10 mx-auto min-h-[calc(100vh-78px)] w-full max-w-3xl border-x border-neutral-300 dark:border-neutral-700">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </main>
    </>
  );
}
