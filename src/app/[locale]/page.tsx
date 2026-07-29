import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Code2, Brain, Shield, Music } from "lucide-react";
import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { locales, type Locale } from "@/i18n/config";

const roles = [
  { icon: Code2, label: "Software Engineer", ar: "مهندس برمجيات", fr: "Ingénieur logiciel" },
  { icon: Brain, label: "AI Engineer", ar: "مهندس ذكاء اصطناعي", fr: "Ingénieur IA" },
  { icon: Shield, label: "DevSecOps", ar: "DevSecOps", fr: "DevSecOps" },
  { icon: Music, label: "Music Artist", ar: "فنان موسيقي", fr: "Artiste musical" },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
  const dict = getDictionary(validLocale);
  return { title: dict.home.title, description: dict.home.description, keywords: [...dict.seo.keywords], alternates: { canonical: `https://bymuja.com/${validLocale}`, languages: { en: "https://bymuja.com/en", ar: "https://bymuja.com/ar", fr: "https://bymuja.com/fr" } }, openGraph: { title: dict.home.title, description: dict.home.description, url: `https://bymuja.com/${validLocale}`, type: "website", images: ["https://bymuja.com/img/profile.png"] } };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
  const t = getDictionary(validLocale);
  const dir = validLocale === "ar" ? "rtl" : "ltr";
  const rtl = dir === "rtl";

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 -left-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-conic-gradient opacity-[0.02] rounded-full blur-[100px] animate-spin-slow"></div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* === HERO === */}
        <section dir={dir} className="min-h-screen flex items-center justify-center py-24">
          <div className="max-w-3xl text-center">
            {/* Profile with animated ring */}
            <div className="flex justify-center mb-10">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent animate-spin-slow opacity-75 blur-md scale-110"></div>
                <div className="relative w-28 h-28 sm:w-40 sm:h-40 rounded-full border-[3px] border-white/10 overflow-hidden shadow-2xl shadow-primary/20">
                  <Image src="/img/profile.png" alt="Mujahid Siyam" width={160} height={160} className="w-full h-full object-cover" priority sizes="(max-width: 640px) 112px, 160px" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-background"></div>
              </div>
            </div>

            {/* Name */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-none mb-6">
              <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
                {validLocale === "ar" ? "مجاهد صيام" : "Mujahid Siyam"}
              </span>
            </h1>

            {/* Role pills */}
            <div className="flex flex-wrap justify-center gap-2.5 mb-8">
              {roles.map((role) => (
                <div key={role.label} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border/30 bg-card/50 backdrop-blur-sm text-foreground/60 text-xs font-medium">
                  <role.icon className="w-3.5 h-3.5 text-primary/60" />
                  <span>{validLocale === "ar" ? role.ar : validLocale === "fr" ? role.fr : role.label}</span>
                </div>
              ))}
            </div>

            {/* Tagline */}
            <p className="text-sm sm:text-base text-foreground/40 max-w-lg mx-auto mb-10 leading-relaxed font-light">
              {t.home.heroBody}
            </p>

            {/* CTA */}
            <div className={`flex flex-wrap justify-center gap-4 ${rtl ? "flex-row-reverse" : ""}`}>
              <Link href={`/${validLocale}/projects`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/20">
                {t.home.exploreProjects}
                <ArrowRight className={`w-4 h-4 ${rtl ? "rotate-180" : ""}`} />
              </Link>
              <Link href={`/${validLocale}/blog`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border/30 bg-card/50 backdrop-blur-sm font-semibold text-sm text-foreground/70 hover:text-foreground hover:border-primary/30 transition-all duration-300 hover:scale-105">
                {t.home.readBlog}
                <ArrowRight className={`w-4 h-4 ${rtl ? "rotate-180" : ""}`} />
              </Link>
            </div>
          </div>
        </section>

        {/* === ABOUT === */}
        <section dir={dir} className="py-16 border-t border-border/10">
          <div className="max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary/60 mb-4 block">{locale === "ar" ? "عنّي" : locale === "fr" ? "À propos" : "About"}</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-10">{t.home.aboutHeading}</h2>
            <div className="space-y-5 text-foreground/60 leading-relaxed">
              <p>{t.home.about1}</p>
              <p>{t.home.about2}</p>
              <p>{t.home.about3}</p>
              <p>{t.home.about4}</p>
              <p>{t.home.about5}</p>
            </div>
          </div>
        </section>

        {/* === SKILLS === */}
        <section className="py-16 border-t border-border/10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary/60 mb-4 block text-center">{locale === "ar" ? "التقنيات" : locale === "fr" ? "Technologies" : "Technologies"}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 text-center">{t.home.skillsHeading}</h2>
          <p className="text-foreground/40 text-center mb-10 max-w-md mx-auto text-sm">{t.home.skillsDescription}</p>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {["Rust", "C/C++", "React", "TypeScript", "Python", "AI/ML", "AWS", "Docker", "Kubernetes", "PostgreSQL", "GraphQL", "Next.js", "FastAPI", "Redis", "Nix/NixOS", "Linux"].map((skill) => (
              <span key={skill} className="px-4 py-2 rounded-xl border border-border/20 bg-card/30 backdrop-blur-sm text-xs font-medium text-foreground/50 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-default">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* === CTA === */}
        <section className="py-16">
          <div className="relative rounded-3xl p-10 sm:p-14 overflow-hidden bg-gradient-to-br from-primary via-primary/80 to-secondary text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{t.home.ctaHeading}</h2>
              <p className="text-white/60 text-sm mb-8 max-w-md mx-auto">{t.home.ctaDescription}</p>
              <Link href="mailto:contact@bymuja.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
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
