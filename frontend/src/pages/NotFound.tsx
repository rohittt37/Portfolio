import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="py-24 text-center">
      <h1 className="text-4xl font-semibold">404</h1>
      <p className="mt-2 text-neutral-500">This page doesn’t exist.</p>
      <Link to="/" className="btn mt-6">Go home</Link>
    </div>
  );
}
