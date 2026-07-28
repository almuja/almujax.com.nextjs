import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
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
      canonical: `https://bymuja.com/${validLocale}`,
    },
    openGraph: {
      title: dict.home.title,
      description: dict.home.description,
      url: `https://bymuja.com/${validLocale}`,
      type: "website",
      images: ["https://bymuja.com/img/profile.png"],
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section dir={dir} className="min-h-screen flex items-center justify-center text-center py-20">
          <div className="max-w-4xl">
            <div className="flex justify-center mb-8">
              <div className="w-48 h-48 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center border-4 border-primary/20 overflow-hidden group hover:border-primary/40 transition-all duration-300">
                <Image
                  src="/img/profile.png"
                  alt="Mujahid Siyam (Muja / bymuja)"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {validLocale === "ar" ? "مجاهد صيام" : "Mujahid Siyam"}
            </h1>

            <div className="flex justify-center gap-4 mb-8 flex-wrap">
              {[
                { href: "https://github.com/bymuja", icon: "GitHub", label: "GitHub" },
                { href: "https://linkedin.com/in/bymuja", icon: "LinkedIn", label: "LinkedIn" },
                { href: "https://twitter.com/bymuja", icon: "Twitter", label: "Twitter" },
                { href: "https://instagram.com/bymuja", icon: "Instagram", label: "Instagram" },
                { href: "https://tiktok.com/@bymuja", icon: "TikTok", label: "TikTok" },
                { href: "https://snapchat.com/add/bymuja", icon: "Snapchat", label: "Snapchat" },
                { href: "mailto:contact@bymuja.com", icon: "Email", label: "Email" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="p-3 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 backdrop-blur-sm bg-glass border border-glass-border rounded-2xl"
                  aria-label={`Visit ${item.label} profile`}
                >
                  <span className="text-sm font-medium">{item.icon}</span>
                </a>
              ))}
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm bg-glass border border-glass-border text-primary text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              {t.home.sparkle}
            </div>

            <h2 className="text-2xl md:text-3xl text-foreground/80 mb-8 font-light">
              {t.home.roles}
            </h2>
            <p className="text-xl text-foreground/60 mb-12 max-w-2xl mx-auto leading-relaxed">
              {t.home.heroBody}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${validLocale}/projects`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 backdrop-blur-sm bg-glass border border-glass-border text-white rounded-2xl font-semibold hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105"
              >
                {t.home.exploreProjects}
                {dir === "rtl" ? (
                  <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </Link>
              <Link
                href={`/${validLocale}/blog`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 backdrop-blur-sm bg-glass border border-glass-border text-white rounded-2xl font-semibold hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105"
              >
                {t.home.readBlog}
                {dir === "rtl" ? (
                  <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section dir={dir} className="py-20">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h3 className="text-4xl font-bold mb-8 text-foreground">
              {t.home.aboutHeading}
            </h3>
            <div className="prose prose-lg text-foreground/80 max-w-none">
              <p className="text-xl leading-relaxed mb-6">{t.home.about1}</p>
              <p className="text-xl leading-relaxed mb-6">{t.home.about2}</p>
              <p className="text-xl leading-relaxed mb-6">{t.home.about3}</p>
              <p className="text-xl leading-relaxed mb-6">{t.home.about4}</p>
              <p className="text-xl leading-relaxed">{t.home.about5}</p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4 text-foreground">
              {t.home.skillsHeading}
            </h3>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              {t.home.skillsDescription}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 max-w-5xl mx-auto">
            {["Rust", "C/C++", "React", "TypeScript", "Python", "TensorFlow", "AWS", "Docker", "Kubernetes", "PostgreSQL", "GraphQL", "Next.js", "FastAPI", "Redis"].map((skill) => (
              <div key={skill} className="p-6 backdrop-blur-xl bg-glass border border-glass-border rounded-2xl text-center hover:scale-105 hover:bg-primary/20 transition-all duration-300">
                <div className="text-foreground font-medium">{skill}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="backdrop-blur-xl bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-center border border-glass-border">
            <h3 className="text-4xl font-bold mb-6 text-white">{t.home.ctaHeading}</h3>
            <p className="text-white/80 text-xl mb-8 max-w-2xl mx-auto">{t.home.ctaDescription}</p>
            <Link
              href="mailto:contact@bymuja.com"
              className="inline-flex items-center gap-2 px-8 py-4 backdrop-blur-sm bg-glass border border-glass-border text-white rounded-2xl font-semibold hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105"
            >
              {t.home.ctaButton}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
