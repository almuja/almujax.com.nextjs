import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Mujahid Siyam (Muja / bymuja)",
  description:
    "Get in touch with Mujahid Siyam (Muja / bymuja). Reach out for AI engineering, Rust development, DevSecOps, music collaborations, or project inquiries.",
  alternates: {
    canonical: "https://bymuja.com/contact",
  },
  openGraph: {
    title: "Contact | Mujahid Siyam (Muja / bymuja)",
    description:
      "Get in touch with Mujahid Siyam (Muja / bymuja) — AI Engineer, Rust Developer, DevSecOps, and Music Artist",
    url: "https://bymuja.com/contact",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
