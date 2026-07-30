import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, MapPin, Briefcase } from "lucide-react";
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

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
  const t = getDictionary(validLocale);
  const dir = validLocale === "ar" ? "rtl" : "ltr";
  const isRTL = dir === "rtl";

  return (
    <div className="relative min-h-screen overflow-hidden">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section dir={dir} className="relative min-h-screen flex items-center justify-center py-20">
          {/* Animated orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="wave-orb wave-orb-1" />
            <div className="wave-orb wave-orb-2" />
            <div className="wave-orb wave-orb-3" />
          </div>

          <div className="relative max-w-4xl text-center">
            {/* Avatar with glow ring */}
            <div className="hero-enter flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--color-wave-1)] to-[var(--color-wave-2)] blur-xl opacity-30 animate-pulse-slow" />
                <div className="relative w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-[var(--color-wave-1)] to-[var(--color-wave-2)] p-[3px]">
                  <div className="w-full h-full rounded-full overflow-hidden bg-background">
                    <Image
                      src="/img/profile.png"
                      alt="Mawja (Mujahid Siyam)"
                      width={192}
                      height={192}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      priority
                      sizes="(max-width: 640px) 144px, 192px"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Brand name with wave gradient */}
            <h1 className="hero-enter text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-none mb-6">
              <span className="wave-gradient-text">
                {validLocale === "ar" ? "ماوجا" : "Mawja"}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-enter text-lg sm:text-xl text-foreground/50 mb-2 font-light">
              {validLocale === "ar" ? "مجاهد صيام" : "Mujahid Siyam"}
            </p>

            {/* Roles */}
            <h2 className="hero-enter text-xl md:text-2xl text-foreground/70 mb-6 font-light">
              {t.home.roles}
            </h2>

            {/* Hero body */}
            <p className="hero-enter text-sm md:text-lg text-foreground/50 mb-10 max-w-xl mx-auto leading-relaxed">
              {t.home.heroBody}
            </p>

            {/* CTA Buttons */}
            <div className="hero-enter flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href={`/${validLocale}/projects`}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background rounded-2xl font-semibold text-sm hover:opacity-90 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                {t.home.exploreProjects}
                {isRTL ? (
                  <svg className="w-4 h-4 rotate-180 group-hover:translate-x-[-2px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                ) : (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </Link>
              <Link
                href={`/${validLocale}/blog`}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-border rounded-2xl font-semibold text-sm text-foreground hover:bg-muted transition-all duration-300 hover:scale-[1.02]"
              >
                {t.home.readBlog}
                {isRTL ? (
                  <svg className="w-4 h-4 rotate-180 group-hover:translate-x-[-2px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                ) : (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </Link>
            </div>

            {/* Social links */}
            <div className="hero-enter flex justify-center gap-3 flex-wrap">
              {[
                { href: "https://github.com/itsmawja", label: "GH" },
                { href: "https://linkedin.com/in/itsmawja", label: "LI" },
                { href: "https://x.com/itsmawja", label: "𝕏" },
                { href: "https://instagram.com/itsmawja", label: "IG" },
                { href: "https://youtube.com/@itsmawja", label: "YT" },
                { href: "https://open.spotify.com/user/itsmawja", label: "SP" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground border border-border/50 rounded-full hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section dir={dir} className="py-24">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <span className="badge-glow mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                {validLocale === "ar" ? "عن ماوجا" : validLocale === "fr" ? "À propos de Mawja" : "About Mawja"}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold mb-10 text-foreground">
                {t.home.aboutHeading}
              </h3>
              <div className="space-y-5 text-foreground/70 leading-relaxed text-base md:text-lg">
                <p>{t.home.about1}</p>
                <p>{t.home.about2}</p>
                <p>{t.home.about3}</p>
                <p>{t.home.about4}</p>
                <p>{t.home.about5}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-24">
          <div className="text-center mb-14">
            <span className="badge-glow mb-6">
              <Briefcase className="w-3.5 h-3.5" />
              {t.home.skillsHeading}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-5xl mx-auto">
            {["Rust", "C/C++", "React", "TypeScript", "Python", "AI/LLM", "AWS", "Docker", "Kubernetes", "PostgreSQL", "NixOS", "Next.js", "DevSecOps", "TensorFlow"].map((skill) => (
              <div key={skill} className="card-premium text-center group cursor-default">
                <div className="text-foreground/80 font-medium text-sm group-hover:text-primary transition-colors duration-300">{skill}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-wave-1)] via-[var(--color-wave-2)] to-[var(--color-wave-3)] p-12 md:p-16 text-center">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-4xl font-bold mb-4 text-white">{t.home.ctaHeading}</h3>
              <p className="text-white/70 text-base md:text-lg mb-8 max-w-xl mx-auto">{t.home.ctaDescription}</p>
              <Link
                href="mailto:hello@itsmawja.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-foreground rounded-2xl font-semibold text-sm hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
              >
                {t.home.ctaButton}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
