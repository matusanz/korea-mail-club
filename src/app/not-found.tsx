import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-5 py-28 text-center sm:px-8">
      <p className="eyebrow">Return to sender</p>
      <h1 className="mt-5 text-5xl">This page got lost in the mail.</h1>
      <p className="mt-6 text-muted">The page you were looking for doesn’t exist.</p>
      <Link href="/" className="btn btn-primary mt-10">
        Back to Korea Mail Club
      </Link>
    </section>
  );
}
