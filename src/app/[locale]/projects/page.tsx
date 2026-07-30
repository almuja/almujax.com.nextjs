import Link from "next/link";
import { ExternalLink, Code2, GitFork, Calendar, ArrowRight, Pin } from "lucide-react";
import { join } from "path";
import { promises as fs } from "fs";
import type { Metadata } from "next";
import { getDictionary, type Dictionary } from "@/i18n/get-dictionary";
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
    title: t.projects.title,
    description: t.projects.description,
    keywords: [...t.seo.keywords],
    alternates: { canonical: `https://itsmawja.com/${validLocale}/projects` },
    openGraph: {
      title: t.projects.title,
      description: t.projects.description,
      url: `https://itsmawja.com/${validLocale}/projects`,
      type: "website",
    },
  };
}

interface Project {
  slug: string;
  title: string;
  description: string;
  date: string;
  category?: string;
  tags?: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  language?: string;
  languageColor?: string;
  forks?: number;
  image?: string;
}

export const revalidate = 60;

async function getProjects(): Promise<Project[]> {
  const projectsDirectory = join(process.cwd(), "src", "content", "projects");
  try {
    const files = await fs.readdir(projectsDirectory, { recursive: true });
    const projects = await Promise.all(
      files
        .filter((f) => typeof f === "string" && f.endsWith(".mdx"))
        .map(async (file) => {
          try {
            const slug = file.split("/").pop()!.replace(/\.mdx$/, "");
            const fileContent = await fs.readFile(join(projectsDirectory, file), "utf8");
            const fmMatch = fileContent.match(/^---\n([\s\S]*?)\n---/);
            if (!fmMatch) return null;

            const project: Project = { slug, title: "", description: "", date: "" };
            fmMatch[1].split("\n").forEach((line) => {
              const [key, ...vp] = line.split(":");
              const value = vp.join(":").trim().replace(/^['"](.*)['"]$/, "$1");
              if (!key || !vp.length) return;
              switch (key.trim()) {
                case "title": project.title = value; break;
                case "description": project.description = value; break;
                case "date": project.date = value; break;
                case "category": project.category = value; break;
                case "tags": try { project.tags = value.startsWith("[") ? JSON.parse(value) : value.split(",").map((t) => t.trim()); } catch { project.tags = [value]; } break;
                case "githubUrl": project.githubUrl = value; break;
                case "liveUrl": project.liveUrl = value; break;
                case "featured": project.featured = value === "true"; break;
                case "language": project.language = value; break;
                case "languageColor": project.languageColor = value; break;
                case "forks": project.forks = parseInt(value) || 0; break;
                case "image": project.image = value; break;
              }
            });
            return project;
          } catch { return null; }
        }),
    );
    return projects
      .filter((p): p is Project => p !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch { return []; }
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
  const t = getDictionary(validLocale);
  const projects = await getProjects();

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const regularProjects = projects.filter((p) => !p.featured);

  return (
    <div className="min-h-screen" dir={validLocale === "ar" ? "rtl" : "ltr"}>
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[var(--color-wave-1)] opacity-[0.04] blur-[140px] animate-pulse-slow" />
          <div className="absolute top-[30%] right-[5%] w-[350px] h-[300px] rounded-full bg-[var(--color-wave-3)] opacity-[0.03] blur-[100px] animate-pulse-slow animation-delay-2000" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="hero-enter inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/60 mb-8">
            {t.projects.work}
          </div>
          <h1 className="hero-enter text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-none mb-6">
            <span className="wave-gradient-text">
              {t.projects.heroTitle}
            </span>
          </h1>
          <p className="hero-enter text-sm sm:text-base text-foreground/35 font-light leading-relaxed max-w-lg mx-auto">
            {t.projects.heroDescription}
          </p>
          <div className="hero-enter mt-10 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
        </div>
      </section>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        {/* Pinned Projects */}
        {featuredProjects.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center gap-2 mb-8">
              <Pin className="w-3.5 h-3.5 text-primary/40" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/20">
                {t.projects.pinned}
              </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} locale={validLocale} t={t} featured />
              ))}
            </div>
          </section>
        )}

        {/* All Projects */}
        {regularProjects.length > 0 && (
          <section>
            {featuredProjects.length > 0 && (
              <div className="flex items-center gap-2 mb-8">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/20">
                  {t.projects.allProjects}
                </span>
              </div>
            )}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {regularProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} locale={validLocale} t={t} />
              ))}
            </div>
          </section>
        )}

        {projects.length === 0 && (
          <div className="text-center py-24">
            <p className="text-sm text-foreground/20 font-light">{t.projects.noProjects}</p>
          </div>
        )}
      </main>
    </div>
  );
}

function ProjectCard({ project, locale, t, featured }: { project: Project; locale: string; t: Dictionary; featured?: boolean }) {
  return (
    <Link href={`/${locale}/projects/${project.slug}`} className="group block">
      <article className={`relative h-full overflow-hidden border transition-all duration-500 flex flex-col ${
        featured
          ? "rounded-2xl border-border/50 bg-background hover:border-primary/15 hover:shadow-2xl hover:shadow-primary/[0.04]"
          : "rounded-xl border-border/40 bg-background hover:border-primary/10 hover:shadow-lg hover:shadow-primary/[0.03]"
      }`}>
        {/* Image or gradient placeholder */}
        <div className="relative aspect-[16/10] overflow-hidden bg-muted/20">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 flex items-center justify-center">
              <span className="text-3xl font-black text-primary/20 tracking-tighter">
                {project.title.split(" ").map((w) => w[0]).join("").slice(0, 3)}
              </span>
            </div>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className={`flex flex-col flex-1 ${featured ? "p-6" : "p-5"}`}>
          {/* Meta row */}
          <div className="flex items-center gap-2 mb-3">
            {project.language && (
              <span className="flex items-center gap-1.5 text-[10px] text-foreground/30">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.languageColor || "var(--color-primary)" }} />
                {project.language}
              </span>
            )}
            {project.category && (
              <>
                <span className="text-foreground/10">·</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-primary/40">{project.category}</span>
              </>
            )}
            {project.forks !== undefined && project.forks > 0 && (
              <span className="ml-auto flex items-center gap-1 text-[10px] text-foreground/25">
                <GitFork className="w-3 h-3" /> {project.forks}
              </span>
            )}
          </div>

          {/* Title */}
          <h2 className={`font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1 mb-2 leading-snug ${featured ? "text-base" : "text-sm"}`}>
            {project.title}
          </h2>

          {/* Description */}
          <p className="text-xs text-foreground/30 leading-relaxed line-clamp-2 flex-1">
            {project.description}
          </p>

          {/* Tags + Footer */}
          <div className="mt-4 pt-4 border-t border-border/20">
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-0.5 text-[10px] bg-muted text-foreground/40 rounded-md">
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-2 py-0.5 text-[10px] text-foreground/20">+{project.tags.length - 3}</span>
                )}
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-foreground/20 tabular-nums">
                {project.date ? new Date(project.date).toLocaleDateString(locale === "ar" ? "ar-SA" : locale === "fr" ? "fr-FR" : "en-US", { month: "short", year: "numeric" }) : ""}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-foreground/15 font-medium group-hover:text-primary transition-all duration-300">
                {t.projects.view}
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" />
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
