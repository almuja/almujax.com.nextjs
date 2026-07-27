import { MusicContent } from "./MusicContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Music | Mujahid Siyam (Muja / bymuja)",
  description:
    "Explore the musical journey of Mujahid Siyam (Muja / bymuja), a Music Artist and Software Engineer. Curated playlists and creative work across platforms.",
  alternates: {
    canonical: "https://bymuja.com/music",
  },
  openGraph: {
    title: "Music | Mujahid Siyam (Muja / bymuja)",
    description:
      "Mujahid Siyam (Muja / bymuja) — Music Artist and Software Engineer. Explore curated playlists and musical journey.",
    url: "https://bymuja.com/music",
    type: "website",
  },
};

export default function MusicPage() {
  return <MusicContent />;
}
