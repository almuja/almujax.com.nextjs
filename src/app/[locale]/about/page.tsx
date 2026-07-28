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
  const t = getDictionary(validLocale);

  return {
    title: t.about.title,
    description: t.about.description,
    keywords: [...t.seo.keywords],
    alternates: {
      canonical: `https://bymuja.com/${validLocale}/about`,
    },
    openGraph: {
      title: t.about.title,
      description: t.about.description,
      type: "profile",
      url: `https://bymuja.com/${validLocale}/about`,
      images: ["https://bymuja.com/img/profile.png"],
      firstName: "Mujahid",
      lastName: "Siyam",
      username: "bymuja",
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
  const t = getDictionary(validLocale);
  const dir = validLocale === "ar" ? "rtl" : "ltr";

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
            {t.about.heading}
          </h1>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            {t.about.roles}
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile & Contact */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="backdrop-blur-xl bg-[var(--color-card)] border border-[var(--color-border)]/50 rounded-2xl p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center border-4 border-[var(--color-primary)]/20 overflow-hidden mb-4">
                  <img
                    src="/img/profile.png"
                    alt="Mujahid Siyam (Muja / bymuja)"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-1">
                  Mujahid Siyam
                </h2>
                <p className="text-sm text-foreground/50 mb-1">{t.about.akaLabel}</p>
                <p className="text-foreground/60 mb-4">{t.about.profileTitle}</p>
                <div className="space-y-3 w-full">
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <span>📍</span>
                    <span>{t.about.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <span>📧</span>
                    <span>{t.about.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <span>🔗</span>
                    <span>{t.about.website}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Competencies */}
            <div className="backdrop-blur-xl bg-[var(--color-card)] border border-[var(--color-border)]/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-[var(--color-foreground)] mb-4">
                {t.about.coreCompetencies}
              </h3>
              <div className="space-y-3">
                {t.about.skills.map((skill: string) => (
                  <div key={skill} className="flex items-center gap-2 group">
                    <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                    <span className="text-sm text-[var(--color-foreground)]/80 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="backdrop-blur-xl bg-[var(--color-card)] border border-[var(--color-border)]/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-[var(--color-foreground)] mb-4">
                {t.about.languages}
              </h3>
              <div className="space-y-3">
                {[
                  { language: "Arabic", level: "Native" },
                  { language: "English", level: "Fluent" },
                  { language: "French", level: "Intermediate" },
                ].map((item) => (
                  <div
                    key={item.language}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm text-[var(--color-foreground)]/80">
                      {item.language}
                    </span>
                    <span className="text-xs bg-[var(--color-primary)]/20 text-[var(--color-primary)] px-2 py-1 rounded-full">
                      {item.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Professional Summary */}
            <div className="backdrop-blur-xl bg-[var(--color-card)] border border-[var(--color-border)]/50 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-4">
                {t.about.summaryHeading}
              </h3>
              <div className="space-y-4 text-[var(--color-foreground)]/80 leading-relaxed">
                <p>{t.about.summary1}</p>
                <p>{t.about.summary2}</p>
                <p>{t.about.summary3}</p>
                <p>{t.about.summary4}</p>
                <p>{t.about.summary5}</p>
              </div>
            </div>

            {/* Experience */}
            <div className="backdrop-blur-xl bg-[var(--color-card)] border border-[var(--color-border)]/50 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">
                {t.about.experience}
              </h3>
              <div className="space-y-6">
                {[
                  {
                    title: "AI & Software Engineer",
                    company: "Zaroxi Studio",
                    period: "2023 - Present",
                    description:
                      "Building AI-first systems, Rust-based developer tools, and creative technology. Leading development of open-source projects and full-stack applications with modern tooling.",
                  },
                  {
                    title: "AI/ML Engineer",
                    company: "Data Science Labs",
                    period: "2020 - 2022",
                    description:
                      "Developed machine learning models for predictive analytics. Deployed scalable ML infrastructure on AWS.",
                  },
                  {
                    title: "Software Developer",
                    company: "Startup Ventures",
                    period: "2018 - 2020",
                    description:
                      "Built responsive web applications and mobile apps. Collaborated in agile development teams.",
                  },
                ].map((exp, index) => (
                  <div
                    key={index}
                    className="border-l-2 border-[var(--color-primary)]/20 pl-4 relative"
                  >
                    <div className="absolute -left-1.5 top-2 w-3 h-3 bg-[var(--color-primary)] rounded-full"></div>
                    <h4 className="text-lg font-bold text-[var(--color-foreground)]">
                      {exp.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[var(--color-foreground)]/70">
                        {exp.company}
                      </span>
                      <span className="text-xs bg-[var(--color-primary)]/20 text-[var(--color-primary)] px-2 py-1 rounded-full">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-[var(--color-foreground)]/60 text-sm">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="backdrop-blur-xl bg-[var(--color-card)] border border-[var(--color-border)]/50 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">
                {t.about.education}
              </h3>
              <div className="space-y-4">
                {[
                  {
                    degree: "MSc in Computer Science",
                    school: "University of Technology",
                    period: "2016 - 2018",
                    description:
                      "Specialized in Artificial Intelligence and Machine Learning",
                  },
                  {
                    degree: "BSc in Software Engineering",
                    school: "Tech University",
                    period: "2012 - 2016",
                    description:
                      "Graduated with Honors. Focus on Distributed Systems",
                  },
                ].map((edu, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-[var(--color-foreground)]">
                        {edu.degree}
                      </h4>
                      <p className="text-[var(--color-foreground)]/70">
                        {edu.school}
                      </p>
                      <p className="text-[var(--color-foreground)]/60 text-sm mt-1">
                        {edu.description}
                      </p>
                    </div>
                    <span className="text-xs bg-[var(--color-primary)]/20 text-[var(--color-primary)] px-2 py-1 rounded-full whitespace-nowrap">
                      {edu.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="backdrop-blur-xl bg-[var(--color-card)] border border-[var(--color-border)]/50 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">
                {t.about.technologies}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Rust",
                  "TypeScript",
                  "React/Next.js",
                  "Python",
                  "C/C++",
                  "TensorFlow",
                  "PyTorch",
                  "AI/LLM Tools",
                  "Nix/NixOS",
                  "Linux",
                  "AWS",
                  "Docker",
                  "Kubernetes",
                  "Git",
                  "PostgreSQL",
                  "MongoDB",
                  "GraphQL",
                  "Node.js",
                  "FastAPI",
                  "Redis",
                ].map((tech) => (
                  <div
                    key={tech}
                    className="px-4 py-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-xl text-center text-sm font-medium hover:bg-[var(--color-primary)]/20 hover:scale-105 transition-all duration-300 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media Links */}
            <div className="backdrop-blur-xl bg-[var(--color-card)] border border-[var(--color-border)]/50 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">
                {t.about.connectHeading}
              </h3>
              <p className="text-[var(--color-foreground)]/60 mb-6">
                {t.about.connectDescription}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  {
                    name: "GitHub",
                    url: "https://github.com/bymuja",
                    color: "hover:bg-gray-800 hover:text-white",
                    icon: "💻",
                  },
                  {
                    name: "LinkedIn",
                    url: "https://linkedin.com/in/bymuja",
                    color: "hover:bg-blue-600 hover:text-white",
                    icon: "💼",
                  },
                  {
                    name: "Twitter",
                    url: "https://twitter.com/bymuja",
                    color: "hover:bg-blue-400 hover:text-white",
                    icon: "🐦",
                  },
                  {
                    name: "Spotify",
                    url: "https://open.spotify.com/user/bymuja",
                    color: "hover:bg-green-500 hover:text-white",
                    icon: "🎵",
                  },
                  {
                    name: "YouTube",
                    url: "https://youtube.com/@bymuja",
                    color: "hover:bg-red-600 hover:text-white",
                    icon: "🎥",
                  },
                  {
                    name: "Email",
                    url: "mailto:contact@bymuja.com",
                    color: "hover:bg-primary hover:text-white",
                    icon: "📧",
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center justify-center p-4 rounded-xl bg-[var(--color-foreground)]/5 text-[var(--color-foreground)]/70 transition-all duration-300 hover:scale-105 ${social.color} group`}
                  >
                    <span className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </span>
                    <span className="text-sm font-medium">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
