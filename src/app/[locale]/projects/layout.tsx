import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Projects | Mujahid Siyam",
    template: "%s | Projects | Mujahid Siyam",
  },
  description:
    "Open source projects and developer tools by Mujahid Siyam — NixOS configurations, AI utilities, and infrastructure automation.",
  openGraph: {
    title: "Projects | Mujahid Siyam",
    description:
      "Open source projects and developer tools by Mujahid Siyam — NixOS configurations, AI utilities, and infrastructure automation.",
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

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
