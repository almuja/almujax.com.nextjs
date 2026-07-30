import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { locales, type Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
  const dict = getDictionary(validLocale);

  return {
    title: dict.home.title,
    description: dict.home.description,
    keywords: [...dict.seo.keywords],
    alternates: {
      canonical: `https://itsmawja.com/${validLocale}`,
      languages: {
        en: "https://itsmawja.com/en",
        ar: "https://itsmawja.com/ar",
        fr: "https://itsmawja.com/fr",
      },
    },
    openGraph: {
      title: dict.home.title,
      description: dict.home.description,
      url: `https://itsmawja.com/${validLocale}`,
      type: "website",
      images: ["https://itsmawja.com/img/profile.png"],
    },
  };
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  );
}

const socials = [
  { href: "https://github.com/itsmawja", icon: GitHubIcon, label: "GitHub" },
  { href: "https://x.com/itsmawja", icon: XIcon, label: "X" },
  { href: "https://linkedin.com/in/itsmawja", icon: LinkedInIcon, label: "LinkedIn" },
  { href: "https://instagram.com/itsmawja", icon: InstagramIcon, label: "Instagram" },
  { href: "https://youtube.com/@itsmawja", icon: YouTubeIcon, label: "YouTube" },
  { href: "https://open.spotify.com/user/itsmawja", icon: SpotifyIcon, label: "Spotify" },
];

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
  const t = getDictionary(validLocale);
  const dir = validLocale === "ar" ? "rtl" : "ltr";

  return (
    <>
      {/* Fullscreen Hero */}
      <section dir={dir} className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-32">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#818cf8] opacity-[0.06] blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#22d3ee] opacity-[0.05] blur-[100px] animate-pulse-slow animation-delay-2000" />
          <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full bg-[#c084fc] opacity-[0.04] blur-[80px] animate-pulse-slow animation-delay-4000" />
        </div>

        <div className="relative max-w-2xl w-full text-center">
          {/* Subtle badge */}
          <div className="hero-enter inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-12">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            {validLocale === "ar" ? "متاح للعمل" : validLocale === "fr" ? "Disponible" : "Open to work"}
          </div>

          {/* Brand Name */}
          <h1 className="hero-enter select-none">
            <span className="block text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[1.1] wave-gradient-text mb-3">
              {validLocale === "ar" ? "موجا" : "Mawja"}
            </span>
            <span className="block text-lg sm:text-xl text-foreground/40 font-light tracking-wide">
              {validLocale === "ar" ? "مجاهد صيام" : "Mujahid Siyam"}
            </span>
          </h1>

          {/* Wave meaning subtitle */}
          <p className="hero-enter mt-6 text-sm text-foreground/30 font-light italic">
            {validLocale === "ar"
              ? "موجا (موجة) — التدفق، الإشارة، التغيّر"
              : validLocale === "fr"
              ? "Mawja (موجة) — la vague, le flux, le signal"
              : "Mawja (موجة) — the wave, the flow, the signal"}
          </p>

          {/* Description */}
          <p className="hero-enter mt-8 text-base sm:text-lg text-foreground/50 leading-relaxed max-w-lg mx-auto">
            {t.home.heroBody}
          </p>

          {/* CTA Buttons */}
          <div className="hero-enter mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/${validLocale}/projects`}
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-foreground text-background rounded-xl font-semibold text-sm hover:opacity-90 transition-all duration-300 hover:scale-[1.02]"
            >
              {t.home.exploreProjects}
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </Link>
            <Link
              href={`/${validLocale}/blog`}
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-border rounded-xl font-semibold text-sm text-foreground hover:bg-muted transition-all duration-300"
            >
              {t.home.readBlog}
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </Link>
          </div>

          {/* Big Social Icons */}
          <div className="hero-enter mt-14 flex justify-center gap-5">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-muted/50 border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <Icon className="w-5 h-5 group-hover:text-primary transition-colors duration-300" />
              </a>
            ))}
          </div>

          {/* Email link */}
          <div className="hero-enter mt-8">
            <a
              href="mailto:hello@itsmawja.com"
              className="inline-flex items-center gap-2 text-xs text-foreground/30 hover:text-primary transition-colors duration-300 font-mono"
            >
              hello@itsmawja.com
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section dir={dir} className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-foreground">
            {t.home.aboutHeading}
          </h2>
          <div className="space-y-5 text-foreground/60 leading-relaxed text-base md:text-lg">
            <p>{t.home.about1}</p>
            <p>{t.home.about2}</p>
            <p>{t.home.about3}</p>
            <p>{t.home.about4}</p>
            <p>{t.home.about5}</p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-foreground text-center">
            {t.home.skillsHeading}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {["Rust", "C/C++", "React", "TypeScript", "Python", "AI/LLM", "AWS", "Docker", "Kubernetes", "PostgreSQL", "NixOS", "Next.js", "DevSecOps", "TensorFlow"].map((skill) => (
              <div key={skill} className="rounded-xl border border-border/50 bg-muted/30 px-4 py-3 text-center text-sm font-medium text-foreground/60 hover:text-primary hover:border-primary/20 hover:bg-primary/5 transition-all duration-300">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto rounded-3xl bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#06b6d4] p-12 md:p-16 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">{t.home.ctaHeading}</h3>
          <p className="text-white/60 text-sm md:text-base mb-8 max-w-md mx-auto">{t.home.ctaDescription}</p>
          <Link
            href="mailto:hello@itsmawja.com"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-gray-900 rounded-xl font-semibold text-sm hover:bg-white/90 transition-all duration-300 hover:scale-[1.02]"
          >
            {t.home.ctaButton}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </Link>
        </div>
      </section>
    </>
  );
}
