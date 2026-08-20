import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Blog | Mujahid Siyam",
    template: "%s | Blog | Mujahid Siyam",
  },
  description:
    "Articles by Mujahid Siyam on software engineering, AI, Rust, DevSecOps, cloud infrastructure, networking, and systems administration.",
  openGraph: {
    title: "Blog | Mujahid Siyam",
    description:
      "Articles by Mujahid Siyam on software engineering, AI, Rust, DevSecOps, cloud infrastructure, networking, and systems administration.",
    type: "website",
    images: [
      {
        url: "/img/profile-engineer-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Mujahid Siyam",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
