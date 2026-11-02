import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-bg px-4 text-center">
      <div className="border-2 border-black bg-brand-yellow px-8 py-4 rounded-3xl shadow-brutal mb-6">
        <span className="font-heading text-6xl md:text-8xl font-bold text-black">
          404
        </span>
      </div>
      <h1 className="heading-md mb-4">Page Not Found</h1>
      <p className="body-base max-w-md mb-8 text-black/70">
        Oops! The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="brutal-btn-primary">
        Back to Home
      </Link>
    </div>
  );
}

