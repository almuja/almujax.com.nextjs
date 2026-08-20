import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-4 text-8xl font-black tracking-tighter text-zinc-800 dark:text-zinc-200">
          404
        </h1>
        <p className="mb-8 text-lg text-zinc-500 dark:text-zinc-400">
          This page does not exist.
        </p>
        <Link
          href="/en"
          className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
